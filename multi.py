# multi-processing で対戦する
import asyncio
import multiprocessing
import time
from poke_env import AccountConfiguration
from poke_env.player.random_player import RandomPlayer
from QL import MaxDamagePlayer_fix

random_players = [
    RandomPlayer(account_configuration=AccountConfiguration(f"RandomPlayer {i}", None))
    for i in range(1, 6)
]
max_damage_players = [
    MaxDamagePlayer_fix(
        account_configuration=AccountConfiguration(f"QLPlayer {i}", None)
    )
    for i in range(1, 6)
]

players = [
    player for pair in zip(max_damage_players, random_players) for player in pair
]


async def main():
    battles = [
        players[i].battle_against(players[i + 1], n_battles=20)
        for i in range(0, len(players), 2)
    ]

    start = time.time()

    await asyncio.gather(*battles)
    print([players[i].n_won_battles for i in range(0, len(players))])

    print(
        "Max damage player won %d / 100 battles [this took %f seconds]"
        % (
            sum([players[i].n_won_battles for i in range(0, len(players), 2)]),
            time.time() - start,
        )
    )


if __name__ == "__main__":
    asyncio.run(main())
