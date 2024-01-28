from poke_env.environment.abstract_battle import AbstractBattle
from poke_env.player import Player


class MaxDamagePlayer(Player):
    def choose_move(self, battle):
        if battle.available_moves:
            best_move = max(battle.available_moves, key=lambda move: move.base_power)
            return self.create_order(best_move)
        else:
            return self.choose_random_move(battle)


class MaxDamagePlayerfix(Player):
    def choose_move(self, battle: AbstractBattle):
        if battle.available_moves:
            best_move = max(
                battle.available_moves,
                key=lambda move: move.base_power
                * battle.opponent_active_pokemon.damage_multiplier(move),
            )
            return self.create_order(best_move)
        else:
            try:
                return self.create_order(battle.available_switches[0])
            except IndexError:
                return self.choose_random_move(battle)
