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
from MaxDamagePlayer import MaxDamagePlayer
from env_test import Gen9EnvSinglePlayer
from tabulate import tabulate

from stable_baselines3 import DQN
from poke_env.player import (
    Gen8EnvSinglePlayer,
    MaxBasePowerPlayer,
    RandomPlayer,
    SimpleHeuristicsPlayer,
    background_cross_evaluate,
    background_evaluate_player,
)


class DemoEnv(Gen9EnvSinglePlayer):
    def action_space_size(self):
        return 26

    def action_to_move(self, action: int, battle: Battle):
        return self.agent.choose_random_move(battle)

    def get_opponent(self):
        return RandomPlayer(
            battle_format="gen8randombattle",
            server_configuration=LocalhostServerConfiguration,
        )

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
                # moves_dmg_multiplier[i] = move.type.damage_multiplier(
                #     battle.opponent_active_pokemon.type_1,
                #     battle.opponent_active_pokemon.type_2,
                # )

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
        return np.float32(final_vector)


if __name__ == "__main__":
    env = DemoEnv(
        battle_format="gen8randombattle",
        server_configuration=LocalhostServerConfiguration,
        start_challenging=True,
    )
    check_env(env)
    env.close()
    
    
    model = DQN("MlpPolicy", env, verbose=1)
    model.learn(total_timesteps=1000, log_interval=4)
    model.save("dqn_cartpole")

    del model  # remove to demonstrate saving and loading

    model = DQN.load("dqn_cartpole")

    obs, info = env.reset()
    while True:
        action, _states = model.predict(obs, deterministic=True)
        obs, reward, terminated, truncated, info = env.step(action)
        env.render()
        if terminated or truncated:
            obs, info = env.reset()
            
    # for ep in range(10):
    #     state, info = test_env.reset()
    #     done = False
    #     return_ = 0.0
    #     timesteps = 0
    #     while not done:
    #         state, reward, terminated, truncated, info = test_env.step(
    #             test_env.action_space.sample()
    #         )
    #         test_env.render()
    #         return_ += reward
    #         done = terminated or truncated
    #         timesteps += 1
    #     print(f"Episode {ep}:: Timesteps: {timesteps}, Total Return: {return_ : .2f}")
