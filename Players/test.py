import gymnasium as gym
import numpy as np
from RLPlayer import RLPlayer
from poke_env.player import RandomPlayer

import gymnasium.envs.registration

gymnasium.envs.registration.register(
    id="RLPlayer-v0",
    entry_point="RLPlayer" + ":RLPlayer",
    max_episode_steps=500,
)
env = gym.make("RLPlayer-v0", opponent=RandomPlayer())

observation = env.reset()

# for _ in range(10):
#     observation, reward, terminated, truncated, info = env.step(
#         env.action_space.sample()
#     )
#     env.render()

#     if terminated or truncated:
#         observation = env.reset()
#     print(observation)

# env.close()

import numpy as np

import srl
from srl.algorithms import ql

env_config = srl.EnvConfig(
    "RLPlayer-v0",
    dict(opponent=RandomPlayer()),
    gymnasium_make_func=gym.make,
)
# Q学習
runner = srl.Runner(env_config, rl_config=ql.Config())

# 学習
runner.train(timeout=10)

# 評価
rewards = runner.evaluate(max_episodes=100)
print("100エピソードの平均結果", np.mean(rewards))

# 可視化
# runner.render_terminal()

# animation
# render = runner.animation_save_gif("_SampleEnv.gif", render_scale=3)
