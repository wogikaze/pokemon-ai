import os

import numpy as np

import srl
from srl.algorithms import agent57
from srl.utils import common

common.logger_print()
from poke_env.player import RandomPlayer
from Players.MaxDamagePlayer import MaxDamagePlayer
from Players.RLenv.RLenv import RLenv
import gymnasium as gym
import gymnasium.envs.registration


def main():
    gymnasium.envs.registration.register(
        id="RLenv-v0",
        entry_point="Players.RLenv.RLenv:RLenv",
        max_episode_steps=500,
    )

    # env_config = gym.make(
    #     "RLenv-v0", opponent=MaxDamagePlayer(), start_challenging=True
    # )
    env_config = srl.EnvConfig(
        "RLenv-v0",
        kwargs={"opponent": MaxDamagePlayer(log_level=40), "start_challenging": True},
        gymnasium_make_func=gym.make,
    )

    rl_config = agent57.Config()

    # frameworkを指定したい場合 tensorflow or torch
    rl_config.framework.set_torch()

    runner = srl.Runner(env_config, rl_config)
    # runner.model_summary(expand_nested=True)

    runner.load_parameter("parameter.dat")

    # --- evaluate
    rewards = runner.evaluate(max_episodes=20)
    print(f"Average reward for 20 episodes: {np.mean(rewards)}")


if __name__ == "__main__":
    main()
