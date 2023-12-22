import asyncio
import time
from typing import Awaitable, Union
from poke_env import AccountConfiguration
from poke_env.environment.abstract_battle import AbstractBattle
from poke_env.player.battle_order import BattleOrder
from tabulate import tabulate
from poke_env.player import Player, RandomPlayer, cross_evaluate
from threading import Thread
import numpy as np


class MaxDamagePlayer(Player):
    def choose_move(self, battle):
        # If the player can attack, it will
        if battle.available_moves:
            # Finds the best move among available ones
            best_move = max(battle.available_moves, key=lambda move: move.base_power)
            return self.create_order(best_move)

        # If no attack is available, a random switch will be made
        else:
            return self.choose_random_move(battle)


class MaxDamagePlayer_fix(Player):
    def choose_move(self, battle: AbstractBattle):
        if battle.available_moves:
            # わざ威力 = basepower * タイプ相性
            # 攻撃側のタイプと技のタイプが同じ場合1.5倍
            # テラスタイプと技のタイプが同じ場合、ダメージが1.5倍
            # テラスタイプと攻撃側のタイプと技のタイプが同じ場合、ダメージが2.0倍
            def output_array(array):
                for move in array:
                    print(
                        f"move:{move}: ",
                        f"movetype:{move.type}",
                        f"move_power:{move.base_power}"
                        f"相手のtype: {battle.all_active_pokemons[1].types}, ",
                        battle.all_active_pokemons[1].damage_multiplier(move),
                    )

            print("-------------")
            print()
            print(battle.available_moves)
            output_array(battle.available_moves)
            best_move = max(
                battle.available_moves,
                key=lambda move: move.base_power
                * battle.all_active_pokemons[1].damage_multiplier(move),
            )
            return self.create_order(best_move)
        else:
            # return self.choose_random_move(battle)
            print(battle.available_switches)
            return self.create_order(battle.available_switches[0])


async def print_crosseval(players, n_battles):
    # Cross evaluate players: each player plays 20 games against every other player
    cross_evaluation = await cross_evaluate(players, n_challenges=n_battles)

    # Prepare results for display
    table = [["-"] + [p.username for p in players]]
    for p_1, results in cross_evaluation.items():
        table.append([p_1] + [cross_evaluation[p_1][p_2] for p_2 in results])

    # Display results
    print(tabulate(table))


async def main():
    start = time.time()
    # create players.
    team1 = f"""
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
"""
    # random bot
    random_player = RandomPlayer(max_concurrent_battles=10)
    # max_basepower
    max_damage_player = MaxDamagePlayer(max_concurrent_battles=10)
    max_damage_player1 = MaxDamagePlayer_fix(
        max_concurrent_battles=10,
        # battle_format="gen9battlestadiumsinglesregulatione",
        account_configuration=AccountConfiguration("testing_max", None),
        # team=team1,
        log_level=10,
    )

    Battle_num = 1000  # const
    HumanBattle = True
    # evaluate our player
    # await print_crosseval(
    #     [random_player, max_damage_player, max_damage_player1], n_battles=Battle_num
    # )
    if HumanBattle:
        await max_damage_player1.send_challenges("wogikaze", n_challenges=2)
    else:
        await max_damage_player.battle_against(max_damage_player1, n_battles=Battle_num)
        print(
            f"Max damage player won %d / {Battle_num} battles"
            % max_damage_player1.n_won_battles
        )
        print(f"time spend {time.time() - start} seconds")


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
