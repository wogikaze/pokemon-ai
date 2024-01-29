from datetime import datetime
import time
import gymnasium as gym
import gymnasium.envs.registration
import numpy as np
from stable_baselines3 import PPO
from stable_baselines3.common.logger import configure
from stable_baselines3.common.monitor import Monitor
from stable_baselines3.common.vec_env import DummyVecEnv
import wandb
from wandb.integration.sb3 import WandbCallback
import os
from Players.MaxDamagePlayer import MaxDamagePlayer
from Players.RLenv.RLenv import RLenv


def make_env():
    gymnasium.envs.registration.register(
        id="RLenv-v0",
        entry_point="Players.RLenv.RLenv:RLenv",
        max_episode_steps=500,
    )
    env = gym.make("RLenv-v0", opponent=MaxDamagePlayer(), start_challenging=True)
    env = Monitor(env, filename=None)
    return env


def train(run_id):
    cfg = {"policy_class": "MlpPolicy", "timesteps": 50000}
    run = wandb.init(
        project="sb3-RLenv",
        config=cfg,
        sync_tensorboard=True,
        monitor_gym=True,
        name=run_id,
    )

    logging_dir = "log"
    os.makedirs(logging_dir + "/" + run_id)
    os.environ["WANDB_DIR"] = logging_dir
    env = DummyVecEnv([lambda: make_env() for _ in range(4)])

    new_logger = configure("/log", ["stdout", "csv", "tensorboard"])

    model = PPO(
        cfg["policy_class"],
        env,
        learning_rate=0.00025,
        gamma=0.5,
        # target_update_interval=1,
        # train_freq=(1, "step"),
        # batch_size=64,
    )
    model.set_logger(new_logger)

    def gettime():
        return datetime.now().strftime("%d-%H-%M")

    model.learn(
        total_timesteps=cfg["timesteps"],
        callback=WandbCallback(
            verbose=2,
            gradient_save_freq=10,
            model_save_freq=5000,
            model_save_path=f"./models/{run_id}/{gettime()}",
        ),
        progress_bar=True,
        log_interval=12,
    )

    model.save(f"./models/{run_id}/")
