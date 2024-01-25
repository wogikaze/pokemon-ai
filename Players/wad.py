import gymnasium as gym
import wandb
import numpy as np
from stable_baselines3 import DQN, PPO
from stable_baselines3.common.vec_env import DummyVecEnv
import gymnasium
from poke_env.player import RandomPlayer
import gymnasium.envs.registration

from RLPlayer import RLPlayer


def make_env():
    gymnasium.envs.registration.register(
        id="RLPlayer-v0",
        entry_point="RLPlayer" + ":RLPlayer",
        max_episode_steps=500,
    )
    env = gym.make("RLPlayer-v0", opponent=RandomPlayer())
    # env = gym.wrappers.RecordVideo(env, f"videos")  # record videos
    env = gym.wrappers.RecordEpisodeStatistics(env)  # record stats such as returns
    return env


config = {"policy": "MlpPolicy", "total_timesteps": 2500}

wandb.init(
    config=config,
    sync_tensorboard=True,  # automatically upload SB3's tensorboard metrics to W&B
    project="RLPlayer-v1",
    monitor_gym=True,  # automatically upload gym environements' videos
    save_code=True,
)

env = DummyVecEnv([make_env])
import os

log_dir = "./logs/"
os.makedirs(log_dir, exist_ok=True)
model = DQN(config["policy"], env, verbose=1, )
model.learn(total_timesteps=config["total_timesteps"])
wandb.finish()
