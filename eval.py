import asyncio
import time
from matplotlib import pyplot as plt
from poke_env import AccountConfiguration
from poke_env.player import RandomPlayer, cross_evaluate
from tabulate import tabulate

from Players.MaxDamagePlayer import MaxDamagePlayer, MaxDamagePlayer_fix


async def main():
    start = time.time()

    player1 = RandomPlayer(account_configuration=AccountConfiguration("player1", None))
    player2 = MaxDamagePlayer(
        account_configuration=AccountConfiguration("player2", None),
    )
    player3 = MaxDamagePlayer_fix(
        account_configuration=AccountConfiguration("player3", None)
    )

    players = [player1, player2, player3]
    BATTLE_NUM = 15  # const
    checkpoint = 3  # 何回ごとに記録するか
    print("start")

    cross_evaluation = await cross_evaluate(players, n_challenges=20)

    # Prepare results for display
    table = [["-"] + [p.username for p in players]]
    for p_1, results in cross_evaluation.items():
        table.append([p_1] + [cross_evaluation[p_1][p_2] for p_2 in results])

    # Display results
    print(tabulate(table))
    print("took time %f" % (time.time() - start))


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
