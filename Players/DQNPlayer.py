import asyncio
from datetime import datetime
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
from RLPlayer import RLPlayer

if __name__ == "__main__":
    """毎回idを変えておく()"""
    # run_id は"lerning方法"+Date+Timeをコードにする
    run_id = "DQN" + datetime.now().strftime("%d-%H-%M")
    opponent = MaxDamagePlayer(battle_format="gen9randombattle")
    train_env = RLPlayer(
        battle_format="gen9randombattle", opponent=opponent, start_challenging=True
    )
    opponent = RandomPlayer(battle_format="gen9randombattle")
    eval_env = RLPlayer(
        battle_format="gen9randombattle", opponent=opponent, start_challenging=True
    )
    train_env = Monitor(train_env)
    env = DummyVecEnv([lambda: train_env])

    model = DQN(
        "MlpPolicy",
        env,
        learning_rate=0.00025,
        gamma=0.5,
        target_update_interval=1,
        verbose=1,
    )
    wandb.init(
        project="sb3",
        config=None,
        sync_tensorboard=True,  # sb3のtensorboardメトリクスを自動アップロード
        # monitor_gym=True,  # ゲームをプレイするエージェントの動画を自動アップロード
        # save_code=True,  # 任意
    )

    model.learn(
        total_timesteps=100000,
        callback=WandbCallback(
            model_save_path=f"models/{run_id}",
            verbose=2,
        ),
        progress_bar=True,
    )

    env.close()

    model.save(run_id)

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
        f"{run_id} Evaluation: {eval_env.n_won_battles} victories out of {eval_env.n_finished_battles} episodes"
    )
    env.close()


def evaluate():
    print("Evaluating...")
