from datetime import datetime
import random
import time
import gymnasium as gym
import gymnasium.envs.registration
import numpy as np
from stable_baselines3 import PPO, DQN
from stable_baselines3.common.logger import configure
from sb3_contrib import QRDQN
from stable_baselines3.common.monitor import Monitor
from stable_baselines3.common.vec_env import DummyVecEnv
import wandb
from wandb.integration.sb3 import WandbCallback
import os
from Players.MaxDamagePlayer import MaxDamagePlayer
from Players.RLenv.RLenv import RLenv
from poke_env.teambuilder import Teambuilder


class RandomTeamFromPool(Teambuilder):
    def __init__(self, teams):
        self.teams = [self.join_team(self.parse_showdown_team(team)) for team in teams]

    def yield_team(self):
        return np.random.choice(self.teams)


pokemon_data = """
dragonite @ lumberry
Ability: multiscale
Tera Type: normal
EVs: 228 HP / 252 Atk / 28 Spe
adamant Nature
- extremespeed
- earthquake
- dragondance
- encore

fluttermane @ choicespecs
Ability: protosynthesis
Tera Type: fairy
EVs: 4 HP / 252 SpA / 252 Spe
modest Nature
- moonblast
- shadowball
- powergem
- mysticalfire

ogerponhearthflame @ hearthflamemask
Ability: moldbreaker
Tera Type: fire
EVs: 252 HP / 4 Atk / 188 Def / 4 SpD / 60 Spe
jolly Nature
- ivycudgel
- hornleech
- encore
- synthesis

ursalunabloodmoon @ silkscarf
Ability: mindseye
Tera Type: normal
EVs: 212 HP / 4 Def / 196 SpA / 4 SpD / 92 Spe
modest Nature
- bloodmoon
- earthpower
- hypervoice
- yawn

chienpao @ focussash
Ability: swordofruin
Tera Type: ghost
EVs: 252 Atk / 4 SpD / 252 Spe
jolly Nature
- iciclecrash
- crunch
- iceshard
- sacredsword

gholdengo @ covertcloak
Ability: goodasgold
Tera Type: dragon
EVs: 228 HP / 196 SpD / 84 Spe
bold Nature
- makeitrain
- thunderwave
- hex
- recover

urshifurapidstrike @ punchingglove
Ability: unseenfist
Tera Type: water
EVs: 252 Atk / 4 SpD / 252 Spe
jolly Nature
- surgingstrikes
- closecombat
- aquajet
- icepunch

scizor @ assaultvest
Ability: technician
Tera Type: fire
EVs: 252 HP / 252 Atk / 4 SpD
adamant Nature
- bulletpunch
- uturn
- knockoff
- closecombat

chiyu @ choicescarf
Ability: beadsofruin
Tera Type: fairy
EVs: 4 HP / 252 SpA / 252 Spe
modest Nature
- flamethrower
- darkpulse
- terablast
- overheat

garganacl @ iapapaberry
Ability: purifyingsalt
Tera Type: fairy
EVs: 252 HP / 252 SpD / 4 Spe
impish Nature
- saltcure
- bodypress
- recover
- irondefense

ironbundle @ boosterenergy
Ability: quarkdrive
Tera Type: water
EVs: 252 SpA / 4 SpD / 252 Spe
timid Nature
- hydropump
- freezedry
- flipturn
- encore

tinglu @ leftovers
Ability: vesselofruin
Tera Type: poison
EVs: 244 HP / 148 Def / 116 SpD
impish Nature
- earthquake
- ruination
- whirlwind
- stealthrock

landorustherian @ sitrusberry
Ability: intimidate
Tera Type: steel
EVs: 4 HP / 252 Atk / 252 Spe
jolly Nature
- earthquake
- uturn
- rocktomb
- stealthrock

roaringmoon @ choiceband
Ability: protosynthesis
Tera Type: steel
EVs: 4 HP / 252 Atk / 252 Spe
jolly Nature
- outrage
- knockoff
- ironhead
- uturn

dondozo @ chestoberry
Ability: unaware
Tera Type: fairy
EVs: 252 HP / 252 SpD / 4 Spe
impish Nature
- liquidation
- yawn
- rest
- fissure

glimmora @ redcard
Ability: toxicdebris
Tera Type: grass
EVs: 252 HP / 252 SpD / 4 Spe
bold Nature
- endure
- energyball
- mortalspin
- stealthrock

garchomp @ loadeddice
Ability: roughskin
Tera Type: steel
EVs: 252 Atk / 4 SpD / 252 Spe
jolly Nature
- earthquake
- scaleshot
- swordsdance
- ironhead

vulpixalola @ lightclay
Ability: snowwarning
Tera Type: fire
EVs: 212 HP / 92 SpD / 204 Spe
timid Nature
- moonblast
- blizzard
- auroraveil
- freezedry

annihilape @ lightball
Ability: innerfocus
Tera Type: steel
EVs: 252 HP / 4 Def / 252 Spe
jolly Nature
- fling
- stealthrock
- ragefist
- finalgambit

corviknight @ aguavberry
Ability: mirrorarmor
Tera Type: fire
EVs: 252 HP / 180 Def / 76 SpD
sassy Nature
- roost
- ironhead
- uturn
- drillpeck

ironmoth @ airballoon
Ability: quarkdrive
Tera Type: grass
EVs: 252 SpA / 252 Spe
timid Nature
- fierydance
- sludgewave
- energyball
- uturn

toxapex @ blacksludge
Ability: regenerator
Tera Type: poison
EVs: 252 HP / 4 Def / 252 SpD
bold Nature
- recover
- toxic
- banefulbunker
- haze

mimikyu @ brightpowder
Ability: disguise
Tera Type: fairy
EVs: 4 HP / 252 Atk / 252 Spe
jolly Nature
- playrough
- thunderwave
- substitute
- curse
"""


# ポケモンのデータを個別のエントリーに分割
pokemon_entries = pokemon_data.strip().split("\n\n")
teams = []
for _ in range(100):
    team = random.sample(pokemon_entries, 6)
    teams.append("\n\n".join(team))
# print(teams[:5])


custom_builder = RandomTeamFromPool(teams)


def make_env():
    gymnasium.envs.registration.register(
        id="RLenv-v0",
        entry_point="Players.RLenv.RLenv:RLenv",
        max_episode_steps=500,
    )
    env = gym.make(
        "RLenv-v0",
        battle_format="gen9battlestadiumsinglesregulatione",
        opponent=MaxDamagePlayer(
            battle_format="gen9battlestadiumsinglesregulatione", team=custom_builder
        ),
        start_challenging=True,
        team=custom_builder,
    )
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

    model = QRDQN(
        cfg["policy_class"],
        env,
        learning_rate=0.00025,
        gamma=0.5,
        target_update_interval=1,
        train_freq=(1, "step"),
        batch_size=64,
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

    model.save(f"./models/{run_id}")


if __name__ == "__main__":
    # run_id は"lerning方法"+Date+Timeをコードにする
    run_id = "QRDQN-T" + datetime.now().strftime("%d-%H-%M")

    train(run_id)
