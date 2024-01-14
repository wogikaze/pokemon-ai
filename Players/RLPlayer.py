import asyncio
from threading import Thread
from typing import Dict
import numpy as np
import gymnasium as gym
from gymnasium.spaces import Space, Box
from gymnasium.utils.env_checker import check_env
from poke_env import AccountConfiguration, LocalhostServerConfiguration, to_id_str
from poke_env.player import RandomPlayer
from poke_env.environment import AbstractBattle as Battle
from poke_env.player.openai_api import ObsType, OpenAIGymEnv
import wandb
from MaxDamagePlayer import MaxDamagePlayer, MaxDamagePlayer_fix
from tabulate import tabulate
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.monitor import Monitor
from stable_baselines3 import PPO
from stable_baselines3 import DQN
from sb3_contrib import QRDQN
from poke_env.player import (
    Gen9EnvSinglePlayer,
    MaxBasePowerPlayer,
    RandomPlayer,
    SimpleHeuristicsPlayer,
    background_cross_evaluate,
    background_evaluate_player,
)
from tabulate import tabulate
from wandb.integration.sb3 import WandbCallback


class RLPlayer(Gen9EnvSinglePlayer):
    def action_space_size(self):
        return 26

    # def get_opponent(self):
    #     return MaxDamagePlayer(
    #         battle_format="gen9randombattle",
    #         server_configuration=LocalhostServerConfiguration,
    #     )

    def describe_embedding(self) -> Space:
        low = [-1, -1, -1, -1, 0, 0, 0, 0, 0, 0]
        high = [3, 3, 3, 3, 4, 4, 4, 4, 1, 1]
        return Box(
            np.array(low, dtype=np.float32),
            np.array(high, dtype=np.float32),
            dtype=np.float32,
        )

    def calc_reward(self, last_battle, current_battle) -> float:
        return self.reward_computing_helper(
            current_battle, fainted_value=2.0, hp_value=1.0, victory_value=30.0
        )

    def embed_battle(self, battle: Battle) -> ObsType:
        # -1 indicates that the move does not have a base power
        # or is not available
        moves_base_power = -np.ones(4)
        moves_dmg_multiplier = np.ones(4)
        for i, move in enumerate(battle.available_moves):
            moves_base_power[i] = (
                move.base_power / 100
            )  # Simple rescaling to facilitate learning
            if move.type:
                moves_dmg_multiplier[
                    i
                ] = battle.opponent_active_pokemon.damage_multiplier(move)

        # We count how many pokemons have fainted in each team
        fainted_mon_team = len([mon for mon in battle.team.values() if mon.fainted]) / 6
        fainted_mon_opponent = (
            len([mon for mon in battle.opponent_team.values() if mon.fainted]) / 6
        )

        # Final vector with 10 components
        final_vector = np.concatenate(
            [
                moves_base_power,
                moves_dmg_multiplier,
                [fainted_mon_team, fainted_mon_opponent],
            ]
        )
        # print(final_vector)
        return np.float32(final_vector)


if __name__ == "__main__":
    "check env"
    # opponent = RandomPlayer(battle_format="gen9randombattle")
    # test_env = RLPlayer(
    #     battle_format="gen9randombattle", start_challenging=True, opponent=opponent
    # )
    # check_env(test_env)
    # test_env.close()

    # Create one environment for training and one for evaluation
    opponent = MaxDamagePlayer(battle_format="gen9randombattle")
    train_env = RLPlayer(
        battle_format="gen9randombattle", opponent=opponent, start_challenging=True
    )
    opponent = MaxDamagePlayer(battle_format="gen9randombattle")
    eval_env = RLPlayer(
        battle_format="gen9randombattle", opponent=opponent, start_challenging=True
    )
    train_env = Monitor(train_env)
    env = DummyVecEnv([lambda: train_env])

    model = QRDQN(
        "MlpPolicy",
        env,
        learning_rate=0.00025,
        gamma=0.5,
        # target_update_interval=1,
        # verbose=1,
    )
    wandb.init(
        project="sb3",
        config=None,
        sync_tensorboard=True,  # sb3のtensorboardメトリクスを自動アップロード
        monitor_gym=True,  # ゲームをプレイするエージェントの動画を自動アップロード
        save_code=True,  # 任意
    )

    model.learn(
        total_timesteps=10000,
        callback=WandbCallback(gradient_save_freq=100, verbose=1),
        progress_bar=True,
    )

    env.close()

    model.save("QRDQNr-m")

    # Evaluating the model
    print("Results against random player:")

    for step in range(100):
        state, info = eval_env.reset()
        while True:
            action, _ = model.predict(state, deterministic=True)
            obs, reward, terminated, truncated, info = eval_env.step(action)
            # env.render()
            if terminated or truncated:
                print(
                    f"steps:{eval_env.n_finished_battles} is {eval_env.n_won_battles}"
                )
                break
    print(
        f"DQN Evaluation: {eval_env.n_won_battles} victories out of {eval_env.n_finished_battles} episodes"
    )
    env.close()


def evaluate():
    from poke_env.player import background_cross_evaluate

    opponent = RandomPlayer(battle_format="gen8randombattle")
    eval_env = RLPlayer(
        battle_format="gen8randombattle", opponent=opponent, start_challenging=True
    )

    n_challenges = 50
    players = [
        eval_env.agent,
        RandomPlayer(battle_format="gen8randombattle"),
        MaxBasePowerPlayer(battle_format="gen8randombattle"),
        SimpleHeuristicsPlayer(battle_format="gen8randombattle"),
    ]
    cross_eval_task = background_cross_evaluate(players, n_challenges)

    cross_evaluation = cross_eval_task.result()
    table = [["-"] + [p.username for p in players]]
    for p_1, results in cross_evaluation.items():
        table.append([p_1] + [cross_evaluation[p_1][p_2] for p_2 in results])
    print("Cross evaluation of DQN with baselines:")
    print(tabulate(table))
