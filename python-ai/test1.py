import asyncio
import time
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
dragonite @ lumberry
Ability: multiscale
EVs: 228 HP / 252 Atk / 28 Spe
adamant Nature
- extremespeed
- earthquake
- dragondance
- encore

fluttermane @ choicespecs
Ability: protosynthesis
EVs: 4 HP / 252 SpA / 252 Spe
modest Nature
- moonblast
- shadowball
- powergem
- mysticalfire

ogerponhearthflame @ hearthflamemask
Ability: moldbreaker
EVs: 252 HP / 4 Atk / 188 Def / 4 SpD / 60 Spe
jolly Nature
- ivycudgel
- hornleech
- encore
- synthesis

ursalunabloodmoon @ silkscarf
Ability: mindseye
EVs: 212 HP / 4 Def / 196 SpA / 4 SpD / 92 Spe
modest Nature
- bloodmoon
- earthpower
- hypervoice
- yawn

chienpao @ focussash
Ability: swordofruin
EVs: 252 Atk / 4 SpD / 252 Spe
jolly Nature
- iciclecrash
- crunch
- iceshard
- sacredsword

gholdengo @ covertcloak
Ability: goodasgold
EVs: 228 HP / 196 SpD / 84 Spe
bold Nature
- makeitrain
- thunderwave
- hex
- recover
"""
    # random bot
    random_player = RandomPlayer(
        max_concurrent_battles=10,
    )
    # max_basepower
    max_damage_player = MaxDamagePlayer(max_concurrent_battles=10, log_level=30)
    max_damage_player1 = MaxDamagePlayer(
        max_concurrent_battles=10,
    )

    Battle_num = 100  # const
    # evaluate our player
    # await print_crosseval(
    #     [random_player, max_damage_player, max_damage_player1], n_battles=Battle_num
    # )

    await max_damage_player.battle_against(max_damage_player1, n_battles=Battle_num)
    print(
        f"Max damage player won %d / {Battle_num} battles"
        % max_damage_player1.n_won_battles
    )
    # 人間と戦う
    # random_player = MaxDamagePlayer(
    #     battle_format="gen9battlestadiumsinglesregulatione",
    #     max_concurrent_battles=10,
    #     team=team1,
    # )
    # await random_player.send_challenges("wogikaze", n_challenges=1)
    print(f"time spend{time.time() - start} seconds")


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
