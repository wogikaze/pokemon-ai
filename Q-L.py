import asyncio
import random
import time
from typing import Optional, Union
import matplotlib.pyplot as plt
from poke_env import AccountConfiguration
from poke_env.player import RandomPlayer
from poke_env.environment.abstract_battle import AbstractBattle
from poke_env.ps_client.server_configuration import ServerConfiguration
from poke_env.teambuilder.teambuilder import Teambuilder
import tensorflow as tf
import tensorflow.python.keras.backend as K
from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.layers import Input, Dense, Lambda
from tensorflow.python.keras.models import Model
from tensorflow.python.keras.optimizers import adam_v2
import numpy as np
import random
from collections import deque
from poke_env.player.player import Player


class DuelingDQNPlayer(Player):
    def __init__(
        self, state_size, action_size, account_configuration, batch_size=32, gamma=0.99
    ):
        super().__init__(account_configuration)
        self.state_size = state_size
        self.action_size = action_size
        self.batch_size = batch_size
        self.gamma = gamma
        self.memory = Memory(10000)
        self.actor = Actor(action_size)
        self.main_qn = QNetwork(
            learning_rate=0.001, state_size=state_size, action_size=action_size
        )
        self.target_qn = QNetwork(
            learning_rate=0.001, state_size=state_size, action_size=action_size
        )
        self.win_counts = []
        self.battle_num = 0

    def choose_move(self, battle):
        state = self.embed_battle(battle)
        action = self.actor.get_action(state, self.main_qn.model)

        available_moves = battle.available_moves + battle.available_switches
        if not battle.available_moves:
            action = self.choose_random_move(battle)
            return action

        if action < len(available_moves):
            move = available_moves[action]
        else:
            # If the chosen action is not a valid move (e.g., due to a reduced number of available moves), choose a random move
            move = random.choice(available_moves)

        # Training the model with a replay buffer
        if self.memory.len() > self.batch_size:
            self.replay(self.batch_size, self.gamma)

        return self.create_order(move)

    def embed_battle(self, battle: AbstractBattle):
        # Extracting features from the battle object
        # Example features: HP, status of Pokémon, etc.
        # This is a placeholder and should be adapted based on the specifics of your environment and what information is relevant to your model.

        own_active_pokemon_hp = battle.active_pokemon.current_hp_fraction
        opponent_active_pokemon_hp = battle.opponent_active_pokemon.current_hp_fraction
        # ... additional features

        # Combining the features into a single array
        state = np.array([own_active_pokemon_hp, opponent_active_pokemon_hp, ...])

        return state

    def replay(self, batch_size, gamma):
        if self.memory.len() < batch_size:
            return

        minibatch = self.memory.sample(batch_size)
        for state, action, reward, next_state, done in minibatch:
            target = reward
            if not done:
                target = reward + gamma * np.amax(
                    self.target_qn.model.predict(next_state)[0]
                )

            target_f = self.main_qn.model.predict(state)
            target_f[0][action] = target
            self.main_qn.model.fit(state, target_f, epochs=1, verbose=0)

    def _battle_finished_callback(self, battle: AbstractBattle):
        self.battle_num += 1


def huberloss(y_true, y_pred):
    err = y_true - y_pred
    cond = K.abs(err) < 1.0
    L2 = 0.5 * K.square(err)
    L1 = K.abs(err) - 0.5
    loss = tf.where(cond, L2, L1)
    return K.mean(loss)


class QNetwork:
    def __init__(
        self, learning_rate=0.001, state_size=4, action_size=2, hidden_size=10
    ):
        # Define the model layers
        input_layer = Input(shape=(state_size,))
        middle_layer = Dense(hidden_size, activation="relu")(input_layer)
        middle_layer = Dense(hidden_size, activation="relu")(middle_layer)

        # Dueling DQN streams
        value_stream = Dense(1, activation="linear")(middle_layer)
        advantage_stream = Dense(action_size, activation="linear")(middle_layer)

        # Combine streams
        output_layer = Lambda(
            lambda i: i[0] + i[1] - K.mean(i[1], axis=1, keepdims=True),
            output_shape=(action_size,),
        )([value_stream, advantage_stream])

        # Create the model
        self.model = Model(inputs=input_layer, outputs=output_layer)
        self.model.compile(loss=huberloss, optimizer=adam_v2.Adam(learning_rate=learning_rate))


class Memory:
    def __init__(self, max_size=1000):
        self.buffer = deque(maxlen=max_size)

    def add(self, experience):
        self.buffer.append(experience)

    def sample(self, batch_size):
        idx = np.random.choice(
            np.arange(len(self.buffer)), size=batch_size, replace=False
        )
        return [self.buffer[ii] for ii in idx]

    def len(self):
        return len(self.buffer)


class Actor:
    def __init__(
        self, action_size, epsilon_start=1.0, epsilon_end=0.01, epsilon_decay=0.995
    ):
        self.epsilon = epsilon_start
        self.epsilon_end = epsilon_end
        self.epsilon_decay = epsilon_decay
        self.action_size = action_size

    def get_action(self, state, model):
        if np.random.rand() <= self.epsilon:
            return random.randrange(self.action_size)
        else:
            q_values = model.predict(state)
            return np.argmax(q_values[0])

    def update_epsilon(self):
        if self.epsilon > self.epsilon_end:
            self.epsilon *= self.epsilon_decay


def create_dueling_dqn_model(state_size, action_size):
    input_layer = Input(shape=(state_size,))
    dense1 = Dense(64, activation="relu")(input_layer)
    dense2 = Dense(64, activation="relu")(dense1)

    # Value stream
    value_stream = Dense(32, activation="relu")(dense2)
    value = Dense(1, activation="linear")(value_stream)

    # Advantage stream
    advantage_stream = Dense(32, activation="relu")(dense2)
    advantage = Dense(action_size, activation="linear")(advantage_stream)

    # Combine streams
    output_layer = Lambda(
        lambda i: i[0] + (i[1] - tf.reduce_mean(i[1], axis=1, keepdims=True))
    )([value, advantage])

    model = Model(inputs=input_layer, outputs=output_layer)
    model.compile(loss="mse", optimizer=tf.keras.optimizers.Adam())

    return model


class DQNAgent(Player):
    def __init__(self, state_size, action_size, account_configuration, batch_size=32):
        super().__init__(account_configuration)
        self.state_size = state_size
        self.action_size = action_size
        self.memory = deque(maxlen=20)
        self.gamma = 0.95  # 割引率
        self.epsilon = 1.0  # 探索率
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995
        self.learning_rate = 0.001
        self.batch_size = batch_size
        self.model = self._build_model()
        # count用
        self.win_counts = []
        self.battle_num = 0
        # 前回の状態と行動を記録するための変数
        self.previous_state = None
        self.previous_action = None
        self.previous_hp = 0
        self.previous_opponent_hp = 0

    def _build_model(self):
        model = Sequential()
        model.add(Dense(24, input_dim=self.state_size, activation="relu"))
        model.add(Dense(24, activation="relu"))
        model.add(Dense(self.action_size, activation="linear"))
        model.compile(
            loss="mse", optimizer=adam_v2.Adam(learning_rate=self.learning_rate)
        )
        return model

    def remember(self, state, action, reward, next_state, done):
        self.memory.append((state, action, reward, next_state, done))

    def act(self, state):
        state = np.array([state], dtype=np.float32)
        if np.random.rand() <= self.epsilon:
            return random.randrange(self.action_size)
        act_values = self.model.predict(state)
        return np.argmax(act_values[0])

    def replay(self):
        if len(self.memory) < self.batch_size:
            return
        minibatch = random.sample(self.memory, self.batch_size)
        for state, action, reward, next_state, done in minibatch:
            # 各状態を2D配列に変換
            state = np.array([state], dtype=np.float32)
            next_state = np.array([next_state], dtype=np.float32)

            target = reward
            if not done:
                # 予測されたQ値の最大値を取得
                target = reward + self.gamma * np.amax(
                    self.model.predict(next_state)[0]
                )

            # ターゲットQ値を計算
            target_f = self.model.predict(state)
            target_f[0][action] = target

            # モデルを訓練
            self.model.fit(state, target_f, epochs=1, verbose=0)

        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay

    def choose_move(self, battle):
        # 現在の状態を取得
        current_state = self.get_state(battle)

        # 前回の行動の結果を記憶
        if self.previous_state is not None and self.previous_action is not None:
            reward = self.calculate_reward(battle)
            self.remember(
                self.previous_state,
                self.previous_action,
                reward,
                current_state,
                battle.finished,
            )
            # 定期的に学習（replay）を実行
            if len(self.memory) > self.batch_size:
                self.replay()

        # 現在の状態を取得
        current_state = self.get_state(battle)

        # DQNモデルを使用して行動を選択
        action = self.act(current_state)

        # 利用可能な行動を取得
        available_actions = battle.available_moves + battle.available_switches

        # DQNモデルが選択した行動が利用可能な行動リストに含まれているか確認
        if action < len(available_actions):
            selected_action = available_actions[action]
        else:
            # DQNモデルが選択した行動が利用不可能な場合、利用可能な行動からランダムに選択
            selected_action = random.choice(available_actions)

        # 現在の状態と選択した行動を記録
        self.previous_state = current_state
        self.previous_action = action
        self.previous_hp = battle.active_pokemon.current_hp_fraction
        self.previous_opponent_hp = battle.opponent_active_pokemon.current_hp_fraction

        # 選択した行動を実行
        return self.create_order(selected_action)

    def get_state(self, battle: AbstractBattle):
        def type_to_float(pokemon_type):
            if pokemon_type is None:
                return -1.0  # タイプがNoneの場合
            else:
                return float(pokemon_type.value)  # Enumのvalueをfloatに変換

        state = [
            battle.active_pokemon.current_hp / battle.active_pokemon.max_hp,
            battle.opponent_active_pokemon.current_hp
            / battle.opponent_active_pokemon.max_hp,
            type_to_float(battle.active_pokemon.types[0]),
            type_to_float(battle.active_pokemon.types[1])
            if len(battle.active_pokemon.types) > 1
            else -1.0,
            type_to_float(battle.opponent_active_pokemon.types[0]),
            type_to_float(battle.opponent_active_pokemon.types[1])
            if len(battle.opponent_active_pokemon.types) > 1
            else -1.0,
        ]

        return np.array(state, dtype=np.float32)

    def calculate_reward(self, battle: AbstractBattle):
        # 報酬を計算するロジック
        reward = 0
        my_hp_change = battle.active_pokemon.current_hp_fraction - self.previous_hp
        opponent_hp_change = (
            battle.opponent_active_pokemon.current_hp_fraction
            - self.previous_opponent_hp
        )
        reward += opponent_hp_change - my_hp_change

        if battle.opponent_active_pokemon.fainted:
            reward += 10

        return reward

    def calculate_final_reward(self, battle: AbstractBattle):
        # バトル終わりの報酬を計算するロジック
        reward = 0
        my_hp_change = battle.active_pokemon.current_hp_fraction - self.previous_hp
        opponent_hp_change = (
            battle.opponent_active_pokemon.current_hp_fraction
            - self.previous_opponent_hp
        )
        reward += opponent_hp_change - my_hp_change

        if battle.opponent_active_pokemon.fainted:
            reward += 10
        reward += 100

        return reward

    def _battle_finished_callback(self, battle):
        # 最後の行動の報酬を計算
        reward = self.calculate_final_reward(battle)

        # 最後の経験を記憶
        self.remember(self.previous_state, self.previous_action, reward, None, True)

        # 学習を実行
        if len(self.memory) > self.batch_size:
            self.replay()

        # 探索率の更新
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay
        self.battle_num += 1
        print(battle.turn)


class MaxDamagePlayer(Player):
    def __init__(self, account_configuration):
        super().__init__(account_configuration)
        self.win_counts = []
        self.battle_num = 0

    def choose_move(self, battle):
        if battle.available_moves:
            best_move = max(battle.available_moves, key=lambda move: move.base_power)
            return self.create_order(best_move)
        else:
            return self.choose_random_move(battle)

    def _battle_finished_callback(self, battle: AbstractBattle):
        self.battle_num += 1


class MaxDamagePlayer_fix(Player):
    def __init__(self, account_configuration):
        super().__init__(account_configuration)
        self.win_counts = []
        self.battle_num = 0

    def choose_move(self, battle: AbstractBattle):
        if battle.available_moves:
            best_move = max(
                battle.available_moves,
                key=lambda move: move.base_power
                * battle.opponent_active_pokemon.damage_multiplier(move),
            )
            return self.create_order(best_move)
        else:
            try:
                # TODO: 交代先のポケモンを選ぶ
                return self.create_order(battle.available_switches[0])
            except IndexError:
                return self.choose_random_move(battle)

    def _battle_finished_callback(self, battle: AbstractBattle):
        self.battle_num += 1


class QLearningPlayer(Player):
    def __init__(self):
        super().__init__()
        self.q_table = {}  # Qテーブルの初期化
        self.alpha = 0.1  # 学習率
        self.gamma = 0.9  # 割引率
        # 前回の状態と行動を記録するための変数
        self.previous_state = None
        self.previous_action = None
        # 勝利数を記録するための変数
        self.win_counts = []
        self.battle_num = 0

    def get_state(self, battle):
        # 現在の状態を定義するコード
        # 例: 自分のポケモンのHP、敵のポケモンのタイプなど
        state = (
            # battle.active_pokemon.current_hp,
            # tuple(battle.active_pokemon.types),
            # tuple((move.base_power, move.type) for move in battle.available_moves),
            # tuple(battle.opponent_active_pokemon.types),
            tuple(
                move.base_power * battle.opponent_active_pokemon.damage_multiplier(move)
                for move in battle.available_moves
            )
        )

        return state

    def choose_move(self, battle):
        # 新しい状態を取得
        current_state = self.get_state(battle)
        # print(current_state)
        # 前回の行動の結果を用いてQテーブルを更新
        if self.previous_state is not None and self.previous_action is not None:
            reward = self.calculate_reward(battle)
            self.update_q_table(
                battle,
                self.previous_state,
                self.previous_action,
                reward,
                current_state,
                battle.finished,
            )
            # print(reward)
        # ε-greedyアルゴリズムに基づいて行動を選択
        if random.uniform(0, 1) < 0.5 * (1 / (self.battle_num + 1)):
            action = self.choose_random_move(battle)
            return action
        else:
            if not battle.available_moves:
                action = self.choose_random_move(battle)
                return action
            else:
                action = self.choose_best_move(
                    current_state, battle, battle.available_moves
                )
                # print(action)

        # 現在の状態と行動を記録
        self.previous_state = current_state
        self.previous_action = action

        return self.create_order(action)

    def choose_best_move(self, battle, state, available_moves):
        best_move = None
        best_q_value = float("-inf")
        if not available_moves:
            return self.choose_random_move(battle)
        for move in available_moves:
            # 状態と行動の組み合わせに対するQ値を取得
            q_value = self.q_table.get((state, move), 0)  # Qテーブルになければデフォルト値0を使用

            # 最大のQ値を持つ行動を選択
            if q_value > best_q_value:
                best_q_value = q_value
                best_move = move

        # どの行動もQテーブルにない場合はランダムに行動を選択
        if best_move is None:
            best_move = random.choice(available_moves)

        return best_move

    def update_q_table(self, battle, old_state, action, reward, new_state, done):
        # print(self.q_table)
        # print(old_state)
        # print(action)
        old_q_value = self.q_table.get((old_state, action), 0)

        if not done:
            if not battle.available_moves:
                next_max_q_value = 0
            else:
                # 次の状態での最大Q値を見つける
                next_max_q_value = max(
                    [
                        self.q_table.get((new_state, a), 0)
                        for a in battle.available_moves
                    ]
                )
        else:
            # エピソードが終了した場合は、次の状態のQ値は0とする
            next_max_q_value = 0

        # Q値を更新する
        new_q_value = old_q_value + self.alpha * (
            reward + self.gamma * next_max_q_value - old_q_value
        )
        self.q_table[(old_state, action)] = new_q_value

    def calculate_reward(self, battle):
        # Calculate the HP percentage of your Pokémon and the opponent's Pokémon
        my_hp_pct = battle.active_pokemon.current_hp / battle.active_pokemon.max_hp
        opponent_hp_pct = (
            battle.opponent_active_pokemon.current_hp
            / battle.opponent_active_pokemon.max_hp
        )

        # Reward is the difference between your HP percentage and the opponent's
        reward = my_hp_pct - opponent_hp_pct
        return reward

    # バトル終了時
    def _battle_finished_callback(self, battle):
        reward = self.calculate_reward(battle)
        current_state = self.get_state(battle)
        self.update_q_table(
            battle,
            self.previous_state,
            self.previous_action,
            reward,
            current_state,
            battle.finished,
        )
        self.battle_num += 1


async def main():
    start = time.time()

    # player
    # qlearningplayer = QLearningPlayer()
    config = AccountConfiguration("QLPlayer1", None)
    random_player = MaxDamagePlayer_fix(
        account_configuration=AccountConfiguration("random", None)
    )
    # qlplayer = DuelingDQNPlayer(6, 7, account_configuration=config)
    qlplayer = DuelingDQNPlayer(
        state_size=10,
        action_size=4,
        batch_size=32,
        gamma=0.95,
        account_configuration=config,
    )

    # dqnplayer = DQNAgent(account_configuration=config)

    BATTLE_NUM = 500  # const
    checkpoint = 5  # 何回ごとに記録するか
    print("- - -\nstart")
    for _ in range(BATTLE_NUM // checkpoint):
        batch_start = time.time()
        await random_player.battle_against(qlplayer, n_battles=checkpoint)
        qlplayer.win_counts.append(qlplayer.n_won_battles)
        print(
            qlplayer.battle_num,
            qlplayer.n_won_battles,
            f"time {time.time() - batch_start}s",
        )

    print(f"RL player won {qlplayer.n_won_battles} / {BATTLE_NUM} battles")
    print(f"time spend {time.time() - start} seconds")
    print("end\n- - -")
    win_rates = [
        count / ((i + 1) * checkpoint) for i, count in enumerate(qlplayer.win_counts)
    ]
    plt.plot(range(checkpoint, BATTLE_NUM + 1, checkpoint), win_rates, marker="o")
    plt.xlabel("Battles")
    plt.ylabel("Win Rate")
    plt.title("Win Rate Every 5 Battles")
    plt.grid(True)
    plt.show()


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
