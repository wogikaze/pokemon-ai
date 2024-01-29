import random
import numpy as np
import poke_env
from poke_env.teambuilder import Teambuilder
from poke_env.player import (
    background_cross_evaluate,
    RandomPlayer,
    MaxBasePowerPlayer,
    SimpleHeuristicsPlayer,
)
from Players.MaxDamagePlayer import MaxDamagePlayer
from Players.RLenv.RLenv import RLenv
from tabulate import tabulate
from stable_baselines3 import DQN
from stable_baselines3.common.evaluation import evaluate_policy
from stable_baselines3.common.monitor import Monitor
import statistics


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


def eval(battle_format, model):
    n_challenges = 50
    print(f"each battle: {n_challenges}")
    if battle_format == "gen9randombattle":
        players = [
            RandomPlayer(battle_format=battle_format),
            MaxBasePowerPlayer(battle_format=battle_format),
            SimpleHeuristicsPlayer(battle_format=battle_format),
        ]
    else:
        players = [
            RandomPlayer(battle_format=battle_format, team=custom_builder),
            MaxBasePowerPlayer(battle_format=battle_format, team=custom_builder),
            SimpleHeuristicsPlayer(battle_format=battle_format, team=custom_builder),
        ]

    rewards = []
    n_wons = []
    # print("")
    # print("start")
    for player in players:
        if battle_format == "gen9randombattle":
            eval_env = RLenv(battle_format=battle_format, opponent=player)
        else:
            eval_env = RLenv(battle_format=battle_format, opponent=player, team=custom_builder)
        eval_env = Monitor(eval_env)
        reward = evaluate_policy(
            model,
            eval_env,
            n_eval_episodes=n_challenges,
            return_episode_rewards=True,
        )
        rewards.append(statistics.mean(reward[0]))
        n_wons.append(eval_env.get_wrapper_attr("n_won_battles"))
    print(tabulate([rewards, n_wons], headers=(p.username for p in players)))
    # print(tabulate(rewards))


if __name__ == "__main__":
    # 起動時引数をとりgen9battlestadiumsinglesregulationeにする
    import sys

    if len(sys.argv) == 2:
        battle_format = "gen9battlestadiumsinglesregulatione"
    else:
        battle_format = "gen9randombattle"

    model = DQN.load("./models/DQN29-01-40/model.zip")
    eval(battle_format, model=model)
