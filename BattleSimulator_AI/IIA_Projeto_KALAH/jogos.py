"""Games, or Adversarial Search (Chapter 5)"""

from collections import namedtuple
import random

from utils import argmax

infinity = float('inf')
GameState = namedtuple('GameState', 'to_move, utility, board, moves')

# ______________________________________________________________________________
# Minimax Search


def minimax_decision(state, game):
    """Given a state in a game, calculate the best move by searching
    forward all the way to the terminal states. [Figure 5.3]"""

    player = game.to_move(state)

    def max_value(state):
        if game.terminal_test(state):
            return game.utility(state, player)
        v = -infinity
        for a in game.actions(state):
            v = max(v, min_value(game.result(state, a)))
        return v

    def min_value(state):
        if game.terminal_test(state):
            return game.utility(state, player)
        v = infinity
        for a in game.actions(state):
            v = min(v, max_value(game.result(state, a)))
        return v

    # Body of minimax_decision:
    return argmax(game.actions(state),
                  key=lambda a: min_value(game.result(state, a)))

# ______________________________________________________________________________

def alphabeta_search(state, game,alpha=-infinity,beta=infinity):
    """Search game to determine best action; use alpha-beta pruning.
    As in [Figure 5.7], this version searches all the way to the leaves."""

    player = game.to_move(state)

    # Functions used by alphabeta
    def max_value(state, alpha, beta):
        if game.terminal_test(state):
            return game.utility(state, player)
        for a in game.actions(state):
            alpha = max(alpha, min_value(game.result(state, a), alpha, beta))
            if alpha >= beta:
                return alpha
        return alpha

    def min_value(state, alpha, beta):
        if game.terminal_test(state):
            return game.utility(state, player)
        for a in game.actions(state):
            beta = min(beta, max_value(game.result(state, a), alpha, beta))
            if beta <= alpha:
                return beta
        return beta

    # Body of alphabeta_cutoff_search:
    best_score = -infinity
    beta = infinity
    best_action = None
    for a in game.actions(state):
        v = min_value(game.result(state, a), best_score, beta)
        if v > best_score:
            best_score = v
            best_action = a
    return best_action


def alphabeta_search_old(state, game):
    """Search game to determine best action; use alpha-beta pruning.
    As in [Figure 5.7], this version searches all the way to the leaves."""

    player = game.to_move(state)

    # Functions used by alphabeta
    def max_value(state, alpha, beta):
        if game.terminal_test(state):
            return game.utility(state, player)
        v = -infinity
        for a in game.actions(state):
            v = max(v, min_value(game.result(state, a), alpha, beta))
            if v >= beta:
                return v
            alpha = max(alpha, v)
        return v

    def min_value(state, alpha, beta):
        if game.terminal_test(state):
            return game.utility(state, player)
        v = infinity
        for a in game.actions(state):
            v = min(v, max_value(game.result(state, a), alpha, beta))
            if v <= alpha:
                return v
            beta = min(beta, v)
        return v

    # Body of alphabeta_cutoff_search:
    best_score = -infinity
    beta = infinity
    best_action = None
    for a in game.actions(state):
        v = min_value(game.result(state, a), best_score, beta)
        if v > best_score:
            best_score = v
            best_action = a
    return best_action


def alphabeta_cutoff_search(state, game, d=4, cutoff_test=None, eval_fn=None):
    """Search game to determine best action; use alpha-beta pruning.
    This version cuts off search and uses an evaluation function."""

    player = game.to_move(state)

    # Functions used by alphabeta
    def max_value(state, alpha, beta, depth):
        if cutoff_test(state, depth):
            return eval_fn(state,player)
        v = -infinity
        movimentos = game.actions(state)  ## jb
        random.shuffle(movimentos)        ## para dar variabilidade aos jogos
        for a in movimentos:              ##
            v = max(v, min_value(game.result(state, a),
                                 alpha, beta, depth + 1))
            if v >= beta:
                return v
            alpha = max(alpha, v)
        return v

    def min_value(state, alpha, beta, depth):
        if cutoff_test(state, depth):
            return eval_fn(state,player)
        v = infinity
        movimentos = game.actions(state)  ## jb
        random.shuffle(movimentos)        ## para dar variabilidade aos jogos
        for a in movimentos:              ##
            v = min(v, max_value(game.result(state, a),
                                 alpha, beta, depth + 1))
            if v <= alpha:
                return v
            beta = min(beta, v)
        return v

    # Body of alphabeta_cutoff_search starts here:
    # The default test cuts off at depth d or at a terminal state
    cutoff_test = (cutoff_test or
                   (lambda state, depth: depth > d or
                    game.terminal_test(state)))
    eval_fn = eval_fn or (lambda state: game.utility(state, player))
    best_score = alpha
    #beta = infinity
    best_action = None
    movimentos = game.actions(state)  ## jb
    random.shuffle(movimentos)        ## para dar variabilidade aos jogos
    for a in movimentos:              ##
        v = min_value(game.result(state, a), best_score, beta, 1)
        if v > best_score:
            best_score = v
            best_action = a
    return best_action


def alphabeta_cutoff_search_new(state, game, d=4, cutoff_test=None, eval_fn=None):
    """Search game to determine best action; use alpha-beta pruning.
    This version cuts off search and uses an evaluation function."""

    player = game.to_move(state)

    # Functions used by alphabeta
    def max_value(state, alpha, beta, depth):
        if cutoff_test(state, depth):
            return eval_fn(state,player)
        v = -infinity
        movimentos = game.actions(state)  ## jb
        for a in movimentos:              ##
            alpha = max(v, min_value(game.result(state, a),
                                 alpha, beta, depth + 1))
            if alpha >= beta:
                return alpha
            #alpha = max(alpha, v)
        return alpha

    def min_value(state, alpha, beta, depth):
        if cutoff_test(state, depth):
            return eval_fn(state,player)
        v = infinity
        movimentos = game.actions(state)  ## jb
        for a in movimentos:              ##
            beta = min(v, max_value(game.result(state, a),
                                 alpha, beta, depth + 1))
            if beta <= alpha:
                return beta
            #beta = min(beta, v)
        return beta

    # Body of alphabeta_cutoff_search starts here:
    # The default test cuts off at depth d or at a terminal state
    cutoff_test = (cutoff_test or
                   (lambda state, depth: depth >= d or
                    game.terminal_test(state)))
    eval_fn = eval_fn or (lambda state: game.utility(state, player))
    best_score = -infinity
    beta = infinity
    best_action = None
    movimentos = game.actions(state)  ## jb
    random.shuffle(movimentos)        ## para dar variabilidade aos jogos
    for a in movimentos:              ##
        v = min_value(game.result(state, a), best_score, beta, 1)
        if v > best_score:
            best_score = v
            best_action = a
    return best_action
# ______________________________________________________________________________
# A classe Game


class Game:
    """A game is similar to a problem, but it has a utility for each
    state and a terminal test instead of a path cost and a goal
    test. To create a game, subclass this class and implement actions,
    result, utility, and terminal_test. You may override display and
    successors or you can inherit their default methods. You will also
    need to set the .initial attribute to the initial state; this can
    be done in the constructor."""

    def actions(self, state):
        """Return a list of the allowable moves at this point."""
        raise NotImplementedError

    def result(self, state, move):
        """Return the state that results from making a move from a state."""
        raise NotImplementedError

    def utility(self, state, player):
        """Return the value of this final state to player."""
        raise NotImplementedError

    def terminal_test(self, state):
        """Return True if this is a final state for the game."""
        return not self.actions(state)

    def to_move(self, state):
        """Return the player whose move it is in this state."""
        return state.to_move

    def display(self, state):
        """Print or otherwise display the state."""
        print(state)

    def __repr__(self):
        return '<{}>'.format(self.__class__.__name__)

    def jogar(self,jogador1,jogador2,verbose = True) :
        """Um jogar() sem 'while True ...
        e com opção verbose
        """
#        print('*******Jogar novo')
        estado = self.initial
        if verbose :
            self.display(estado)

        fim = False
        jogadores = (jogador1,jogador2)
        ind_proximo = 0
    
        while not fim :
            jogada = jogadores[ind_proximo](self,estado)
            estado = self.result(estado,jogada)
            if verbose :
                self.display(estado)
            fim = self.terminal_test(estado)
            ind_proximo = 1 - ind_proximo
               
        utilidade = self.utility(estado, self.to_move(self.initial))
    
        return utilidade


# ______________________________________________________________________________
# Players for Games


def query_player(game, state):
    """Make a move by querying standard input."""
#    print("current state:")
#    game.display(state)
    print("available moves: {}".format(game.actions(state)))
    print("")
    move_string = input('Your move? ')
    try:
        move = eval(move_string)
    except NameError:
        move = move_string
    return move


def random_player(game, state):
    """A player that chooses a legal move at random."""
    return random.choice(game.actions(state))

def minimax_player(game, state):
    """A player that chooses the best move using minimax."""
    return minimax_decision(state,game)

def alphabeta_player(game, state):
    return alphabeta_search(state, game)
