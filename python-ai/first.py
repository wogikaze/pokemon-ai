import asyncio
import time
import numpy as np

from poke_env.player import Player, RandomPlayer


async def main():
    start = time.time()

    # We create two players.
    random_player1 = RandomPlayer()
    random_player2 = RandomPlayer()

    # Now, let's evaluate our player
    await random_player2.battle_against(random_player1, n_battles=1000)

    print(
        "Max damage player won %d / 1000 battles [this took %f seconds]"
        % (random_player2.n_won_battles, time.time() - start)
    )


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
