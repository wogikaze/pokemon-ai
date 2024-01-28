import numpy as np
from gymnasium.spaces import Space, Box
from poke_env.player import RandomPlayer
from poke_env.environment import AbstractBattle as Battle
from poke_env.player.openai_api import ObsType, OpenAIGymEnv
import wandb
from Players.MaxDamagePlayer import MaxDamagePlayer, MaxDamagePlayerfix
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.monitor import Monitor
from sb3_contrib import QRDQN
from poke_env.player import Gen9EnvSinglePlayer

from wandb.integration.sb3 import WandbCallback


class RLenv(Gen9EnvSinglePlayer):
    def action_space_size(self):
        return 26

    def describe_embedding(self) -> Space:
        low = [-1, -1, -1, -1, 0, 0, 0, 0, 0, 0]
        high = [3, 3, 3, 3, 4, 4, 4, 4, 1, 1]
        return Box(
            np.array(low, dtype=np.float32),
            np.array(high, dtype=np.float32),
            dtype=np.float32,
        )

    def calc_reward(self, last_battle, current_battle) -> float:
        reward = 0
        if current_battle.active_pokemon:
            if current_battle.active_pokemon.status:
                reward -= 0.75
        if current_battle.opponent_active_pokemon:
            if current_battle.opponent_active_pokemon.status:
                reward += 0.75

        reward += self.reward_computing_helper(
            current_battle, fainted_value=1.0, hp_value=1.0, victory_value=30.0
        )
        return reward

    def embed_battle(self, battle: Battle) -> ObsType:
        moves_base_power = -np.ones(4)
        moves_dmg_multiplier = np.ones(4)
        for i, move in enumerate(battle.available_moves):
            moves_base_power[i] = (
                move.base_power / 100
            )
            if move.type:
                moves_dmg_multiplier[
                    i
                ] = battle.opponent_active_pokemon.damage_multiplier(move)
        fainted_mon_team = len([mon for mon in battle.team.values() if mon.fainted]) / 6
        fainted_mon_opponent = (
            len([mon for mon in battle.opponent_team.values() if mon.fainted]) / 6
        )
        final_vector = np.concatenate(
            [
                moves_base_power,
                moves_dmg_multiplier,
                [fainted_mon_team, fainted_mon_opponent],
            ]
        )
        return np.float32(final_vector)

