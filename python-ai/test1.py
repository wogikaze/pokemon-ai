import asyncio
import time

from poke_env.player import Player, RandomPlayer


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


async def main():
    # We create two players.
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

    # random_player = RandomPlayer(
    #     max_concurrent_battles=10,
    # )

    # max_damage_player = MaxDamagePlayer(
    #     max_concurrent_battles=10,
    # )
    # # Now, let's evaluate our player
    # await max_damage_player.battle_against(random_player, n_battles=100)
    # print("Max damage player won %d / 100 battles" % max_damage_player.n_won_battles)

    random_player = MaxDamagePlayer(
        # battle_format="[Gen 9] Battle Stadium Singles Regulation E",
        max_concurrent_battles=10,
        # team=team1,
    )
    await random_player.send_challenges("wogikaze", n_challenges=1)


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
