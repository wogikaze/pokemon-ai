import poke_env
from poke_env.player import (
    background_cross_evaluate,
    RandomPlayer,
    MaxBasePowerPlayer,
    SimpleHeuristicsPlayer,
)
from Players.MaxDamagePlayer import MaxDamagePlayer
from env.RLenv import RLenv
from tabulate import tabulate


def eval(battle_format):
    eval_env = RLenv(battle_format="gen8randombattle")
    n_challenges = 100
    players = [
        # eval_env.agent,
        RandomPlayer(battle_format="gen8randombattle"),
        MaxBasePowerPlayer(battle_format="gen8randombattle"),
        SimpleHeuristicsPlayer(battle_format="gen8randombattle"),
    ]
    cross_eval_task = background_cross_evaluate(players, n_challenges)
    # dqn.test(
    #     eval_env,
    #     nb_episodes=n_challenges * (len(players) - 1),
    #     verbose=False,
    #     visualize=False,
    # )
    cross_evaluation = cross_eval_task.result()
    table = [["-"] + [p.username for p in players]]
    for p_1, results in cross_evaluation.items():
        table.append([p_1] + [cross_evaluation[p_1][p_2] for p_2 in results])
    print("Cross evaluation of DQN with baselines:")
    print(tabulate(table))


if __name__ == "__main__":
    # 起動時引数をとりgen9battlestadiumsinglesregulationeにする
    import sys

    if len(sys.argv) == 2:
        battle_format = "gen9battlestadiumsinglesregulatione"
    else:
        battle_format = "gen8randombattle"
    
    eval(battle_format)
