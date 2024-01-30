import asyncio
from datetime import datetime

from sb3_contrib import QRDQN
from stable_baselines3 import DQN, A2C, PPO

# from Players.DQNPlayer import train
# from Players.PPO import train
from Players.testeval import main

# from Players.QRDQN import train
from Players.QRDQN_T import train
from eval import eval, evalhuman

# run_id は"lerning方法"+Date+Timeをコードにする

run_id = "DQN" + datetime.now().strftime("%d-%H-%M")
run_id = "A2C" + datetime.now().strftime("%d-%H-%M")
run_id = "PPO" + datetime.now().strftime("%d-%H-%M")
run_id = "QRDQN-T" + datetime.now().strftime("%d-%H-%M")
run_id = "DQN" + "29-21-54"
# run_id = "QRDQN" + "29-21-12"

# train(run_id)
# main()


model = DQN.load(f"./models/{run_id}.zip")
# model = QRDQN.load(f"./models/{run_id}.zip")

import sys

if len(sys.argv) == 2:
    battle_format = "gen9battlestadiumsinglesregulatione"
else:
    battle_format = "gen9randombattle"
# eval(battle_format, model=model)

asyncio.get_event_loop().run_until_complete(evalhuman(battle_format,model))
# evalhuman(battle_format,model)
