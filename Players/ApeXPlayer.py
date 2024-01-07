from poke_env import AccountConfiguration
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


class ApeXPlayer(Player):
    def __init__(
        self, state_size, action_size, account_configuration, batch_size=32, gamma=0.99
    ):
        super().__init__(account_configuration)
        # Initialize variables, network, queues, etc.
        self.state_size = state_size
        self.action_size = action_size
        self.batch_size = batch_size
        self.gamma = gamma
        self.actor = Actor(action_size)
        # Initialize the DQN model
        self.dqn_model = self.create_dueling_dqn_model()
        self.memory = Memory(1000)
        # Initialize the main Q-Network
        self.main_qn = self.create_dueling_dqn_model()
        # Initialize the target Q-Network
        self.target_qn = self.create_dueling_dqn_model()
        # Update target network's weights to match main network
        self.update_target_network()
        self.last_action = None
        self.last_state = None
        self.last_env = None
        # count
        self.win_counts = []
        self.battle_num = 0

    def create_dueling_dqn_model(self):
        # Input layer for the state size
        input_layer = Input(shape=(self.state_size,))

        # Common network layers
        dense1 = Dense(64, activation="relu")(input_layer)
        dense2 = Dense(64, activation="relu")(dense1)

        # Value stream
        value_stream = Dense(32, activation="relu")(dense2)
        value = Dense(1, activation="linear")(value_stream)

        # Advantage stream
        advantage_stream = Dense(32, activation="relu")(dense2)
        advantage = Dense(self.action_size, activation="linear")(advantage_stream)

        # Combine streams
        output_layer = Lambda(
            lambda a: a[0] + (a[1] - tf.reduce_mean(a[1], axis=1, keepdims=True)),
            output_shape=(self.action_size,),
        )([value, advantage])

        # Create the model
        model = Model(inputs=input_layer, outputs=output_layer)
        model.compile(loss=huberloss, optimizer=adam_v2.Adam(learning_rate=0.001))

        return model

    def update_target_network(self):
        # Copy weights from main Q-Network to target Q-Network
        self.target_qn.set_weights(self.main_qn.get_weights())

    def choose_move(self, battle: AbstractBattle):
        # Convert battle state to neural network input format
        current_state = self.update_state(battle)
        if self.last_state:
            reward = self.calculate_reward(battle, self.last_action, battle.finished)
            experience = (
                self.last_state,
                self.last_action,
                reward,
                current_state,
                battle.finished,
            )
            self.memory.add(experience)
            self.learn_from_experience()
        # Check if any moves are available
        available_moves = battle.available_moves + battle.available_switches

        state_array = np.array(current_state).reshape(1, -1)
        q_values = self.dqn_model.predict(state_array)

        # 選択不能なのをマスク
        mask = np.ones(self.action_size) * -float("inf")
        for i, move in enumerate(available_moves):
            mask[i] = 0
        q_values += mask

        action = np.argmax(q_values[0])

        # save current action and state
        self.last_state = current_state
        self.update_env(battle)

        if not available_moves:
            selected_move = self.choose_random_move(battle)
            self.last_action = available_moves.index(selected_move.order)
            print("No moves available", current_state, selected_move)
            return selected_move

        # Select the move based on the action predicted by the model
        if action < len(available_moves):
            selected_move = available_moves[action]
        else:
            selected_move = self.choose_random_move(battle)
            self.last_action = available_moves.index(selected_move.order)
            print("action is Out of List", current_state, selected_move)
            return selected_move

        # print(selected_move)
        self.last_action = available_moves.index(selected_move)
        return self.create_order(selected_move)

    def update_state(self, battle: AbstractBattle):
        # Initialize an empty state array
        state = [0] * self.state_size

        # Example feature 1: Own active Pokémon's current HP as a fraction
        state[0] = battle.active_pokemon.current_hp_fraction

        # Example feature 2: Opponent's active Pokémon's current HP as a fraction
        state[1] = battle.opponent_active_pokemon.current_hp_fraction

        # More features can be added here based on your specific requirements
        for i, move in enumerate(battle.available_moves):
            state[2 + i] = move.base_power
        N = 20

        def one_hot_encode_type(type_id, N):
            representation = [0] * N
            representation[type_id] = 1
            return representation

        # Active Pokémon's types
        # for type in battle.active_pokemon.types:
        #     if type:
        #         state.extend(one_hot_encode_type(type.value, N))
        #     else:
        #         state.extend([0] * N)
        # # Opponent's active Pokémon's types
        # for type in battle.opponent_active_pokemon.types:
        #     if type:
        #         state.extend(one_hot_encode_type(type.value, N))
        #     else:
        #         state.extend([0] * N)

        # # Types of available moves
        # for move in battle.available_moves[:4]:  # Considering up to 4 moves
        #     state.extend(one_hot_encode_type(move.type.value, N))

        for i, move in enumerate(battle.available_moves):  # Considering up to 4 moves
            state[6 + i] = battle.opponent_active_pokemon.damage_multiplier(move)
        return state

    def learn_from_experience(self):
        if not self.memory or self.memory.len() < self.batch_size:
            return  # Not enough memories to learn from

        # Sample a minibatch from the memory
        minibatch = self.memory.sample(self.batch_size)

        for state, action, reward, next_state, done in minibatch:
            # next_state の形状を確認または修正
            state_array = np.array(state).reshape(1, -1)
            next_state_array = np.array(next_state).reshape(1, -1)

            target = reward
            if not done:
                # Predict the future discounted reward
                target = reward + self.gamma * np.amax(
                    self.target_qn.predict(next_state_array)[0]
                )

            # Get the current Q-values and update them with the new target
            try:
                target_f = self.main_qn.predict(state_array)
            except ValueError:
                print("error")
            target_f[0][action] = target

            # Train the main model
            self.main_qn.fit(state_array, target_f, epochs=1, verbose=0)

    def calculate_reward(self, battle: AbstractBattle, action, done):
        reward = 0

        # ダメージに基づく報酬
        damage_dealt = self.calculate_damage_dealt(battle, action)
        damage_taken = self.calculate_damage_taken(battle, action)
        reward += damage_dealt
        reward -= damage_taken

        # 特別な行動に対する報酬
        # if self.is_special_action(battle, action):
        #     reward += 10

        # 交代はペナルティ
        if battle.active_pokemon.species != self.last_env["active_pokemon_species"]:
            reward -= 5

        # バトルが終了した場合の追加報酬/ペナルティ
        if done:
            reward += self.calculate_end_of_battle_reward(battle)

        return reward

    def update_env(self, battle: AbstractBattle):
        """現在のバトル状態を保存する"""
        self.last_env = {
            "active_pokemon_species": battle.active_pokemon.species,
            "active_pokemon_hp": battle.active_pokemon.current_hp_fraction,
            "opponent_pokemon_species": battle.opponent_active_pokemon.species,
            "opponent_pokemon_hp": battle.opponent_active_pokemon.current_hp_fraction,
        }
        return self.last_env

    def calculate_damage_taken(self, battle: AbstractBattle, action):
        """受けたダメージ量を計算する"""
        if (
            not self.last_env
            or self.last_env["active_pokemon_species"] != battle.active_pokemon.species
        ):
            return 0

        last_hp = self.last_env["active_pokemon_hp"]
        current_hp = battle.active_pokemon.current_hp_fraction
        damage_taken = max(last_hp - current_hp, 0)
        return damage_taken

    def calculate_damage_dealt(self, battle: AbstractBattle, action):
        """与えたダメージ量を計算する"""
        if (
            not self.last_env
            or self.last_env["opponent_pokemon_species"]
            != battle.opponent_active_pokemon.species
        ):
            return 0

        last_hp = self.last_env["opponent_pokemon_hp"]
        current_hp = battle.active_pokemon.current_hp_fraction
        damage_taken = max(last_hp - current_hp, 0)
        return damage_taken

    def is_special_action(self, battle: AbstractBattle, action):
        return battle.active_pokemon.terastallize

    def calculate_end_of_battle_reward(self, battle: AbstractBattle):
        reward = 0
        # 勝利に対する報酬
        if battle.won:
            reward += 100
            reward += len(battle.available_switches) * 10

        # 敗北に対する報酬
        elif battle.lost:
            reward -= 100

        return reward

    # Additional methods for interacting with the learner and actor processes, handling communication, etc.
    def _battle_finished_callback(self, battle: AbstractBattle):
        current_state = self.update_state(battle)
        reward = self.calculate_reward(battle, self.last_action, battle.finished)
        experience = (
            self.last_state,
            self.last_action,
            reward,
            current_state,
            battle.finished,
        )
        self.memory.add(experience)
        self.learn_from_experience()
        self.battle_num += 1


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


def huberloss(y_true, y_pred):
    err = y_true - y_pred
    cond = K.abs(err) < 1.0
    L2 = 0.5 * K.square(err)
    L1 = K.abs(err) - 0.5
    loss = tf.where(cond, L2, L1)
    return K.mean(loss)
