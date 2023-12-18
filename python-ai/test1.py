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

"""
    
    random_player = RandomPlayer(
        battle_format="[Gen 9] Battle Stadium Singles Regulation E",
        max_concurrent_battles=10,
    )

    max_damage_player = MaxDamagePlayer(
        battle_format="[Gen 9] Battle Stadium Singles Regulation E",
        max_concurrent_battles=10,
    )

    # Now, let's evaluate our player
    await max_damage_player.battle_against(random_player, n_battles=100)

    print("Max damage player won %d / 100 battles" % max_damage_player.n_won_battles)


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
