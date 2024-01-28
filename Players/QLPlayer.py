from datetime import datetime
from poke_env.player import RandomPlayer
from poke_env.environment import AbstractBattle as Battle
from poke_env.player.openai_api import ObsType, OpenAIGymEnv
import wandb
from MaxDamagePlayer import MaxDamagePlayer, MaxDamagePlayerfix
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
import random


class DQNRLPlayer(RLPlayer):
    def get_opponent(self):
        return [
            RandomPlayer(battle_format="gen9randombattle"),
            MaxDamagePlayer(battle_format="gen9randombattle"),
            MaxDamagePlayer(battle_format="gen9randombattle"),
            MaxDamagePlayer(battle_format="gen9randombattle"),
            SimpleHeuristicsPlayer(battle_format="gen9randombattle"),
        ]


def evalute(run_id):
    opponent = RandomPlayer(battle_format="gen9randombattle")
    eval_env = RLPlayer(
        battle_format="gen9randombattle", opponent=opponent, start_challenging=True
    )
    model = QRDQN.load(
        f"C:/Users/Wogikaze/Desktop/school/未来/models/{run_id}.zip", eval_env
    )
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


def train(run_id):
    opponent = MaxDamagePlayer(account_configuration=None)
    train_env = DQNRLPlayer(
        battle_format="gen9randombattle", opponent=opponent, start_challenging=True
    )
    train_env = Monitor(train_env, f"{run_id}")
    env = DummyVecEnv([lambda: train_env])

    run = wandb.init(
        project="sb3",
        config=None,
        sync_tensorboard=True,  # sb3のtensorboardメトリクスを自動アップロード
        monitor_gym=True,  # ゲームをプレイするエージェントの動画を自動アップロード
        save_code=True,  # 任意
    )
    model = DQN(
        "MlpPolicy",
        env,
        learning_rate=0.00025,
        gamma=0.5,
        target_update_interval=1,
        train_freq=(1, "step"),
        verbose=1,
        # tensorboard_log=f"runs/{run.id}",
    )

    model.learn(
        total_timesteps=100_000,
        callback=WandbCallback(
            model_save_path=f"models/{run_id}",
            model_save_freq=10000,
            verbose=2,
            gradient_save_freq=1000,
        ),
        progress_bar=True,
        log_interval=1000,
    )
    run.finish()
    env.close()

    model.save(f"models/{run_id}")


if __name__ == "__main__":
    # run_id は"lerning方法"+Date+Timeをコードにする
    # run_id = "QL" + datetime.now().strftime("%d-%H-%M")
    run_id = "20240126172705"
    # evalute(run_id)

    # train(run_id)
    evalute(run_id)
