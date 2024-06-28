from random import choice
import copy
from jogos import *
from fairKalahs import * 


class KalahState():
    """Representation of a Mancala state.
    How to interpret the Mancala state variable:

    Let the mancala pits be notated thus:

      _ _ _ _ _ _
   _  1 2 3 4 5 6
   s               s
      6 5 4 3 2 1

    where
    6-1 are the first player's (SOUTHS's) play pits,
    s is the first player's (SOUTH's) score pit,
    _ _
    6-1 are the second player's (NORTH's) play pits, and
    _
    s is the second player's (NORTH's) score pit.

    The numbers of pieces in each pit are stored in an array as follows:
    state[0] ... state[6] store the number of pieces in 6, 5, 4, 3, 2, 1, and s.
                                                     _  _  _  _  _  _      _
    state[7] ... state[13] store the number of pieces in 6, 5, 4, 3, 2, 1, and s.

    Each player's goal is to end the game with more pieces in one's own
                                                             _
    scoring pit."""
    
    PASS = -1
    
    SOUTH, NORTH = 0, 1

    # Total play pits on a player's side
    PLAY_PITS = 6

    # Index of first (south) player score pit, that is, "kalah"
    SOUTH_SCORE_PIT = PLAY_PITS

    # Index of second (north) player score pit, that is, "kalah"
    NORTH_SCORE_PIT = 2 * PLAY_PITS + 1

    # Total pits including both players' play and score pits
    TOTAL_PITS = 2 * (PLAY_PITS + 1)

    # Initial number of pieces (i.e. seeds, stones, etc.) per play pit
    INIT_PIECES_PER_PIT = 4

    # Total number of pieces in play
    NUM_PIECES = 2 * PLAY_PITS * INIT_PIECES_PER_PIT

    def __init__(self, fairkalah_state_index=-1, other=None):
        """Construct a copy of other, if other exists.  Otherwise, construct a default initial Mancala state
        with SOUTH to play if fairkalah_state_index = -1 (default).  However, if fairkalah_state_index is 0-254,
        construct a FairKalah initial state with SOUTH to play and given FairKalah board number (1-254)
        or 0 fairkalah_board parameter for random FairKalah board selection."""
        self.pass_turn=False
        if other:
            (player,state)=other
            self.to_move=other[0]
            self.state = other[1]
        else:
            if fairkalah_state_index < 0:
                # Place four pieces initially in each pit...
                self.state = [self.INIT_PIECES_PER_PIT] * self.TOTAL_PITS
                # ...except scoring pits.
                self.state[self.SOUTH_SCORE_PIT] = self.state[self.NORTH_SCORE_PIT] = 0
            elif fairkalah_state_index > len(fairkalah_states):
                raise ValueError(f'MancalaNode(int): Invalid fairkalah_state_index {fairkalah_state_index}')
            elif fairkalah_state_index == 0:
                self.state = choice(fairkalah_states).copy()
            else:
                self.state = fairkalah_states[fairkalah_state_index - 1].copy()
            self.to_move=self.SOUTH
        
        
    def is_game_over(self):
        """Return whether or not all pieces are in the score pits."""
        return self.state[self.SOUTH_SCORE_PIT] + self.state[self.NORTH_SCORE_PIT] == self.NUM_PIECES
    
    def result(self):
        """1 means SOUTH wins, -1 means NORTH wins, 0 is a draw.
        It is expecting that we are in the presence of game_over"""
        if self.state[self.SOUTH_SCORE_PIT] > self.state[self.NORTH_SCORE_PIT]:
            return 1
        if self.state[self.SOUTH_SCORE_PIT] == self.state[self.NORTH_SCORE_PIT]:
            return 0
        return -1

    
    
    def get_legal_moves(self):
        """Return a list of legal play pit (indices and states),
        sorted by decreasing distance from the player's score pit.
        If the flag pass is True or no seeds in the pits than only pass movement is valid."""
        if self.pass_turn:
            return [self.PASS]
        legal_moves = []
        score_pit = self.SOUTH_SCORE_PIT if self.to_move == self.SOUTH else self.NORTH_SCORE_PIT
        for i in range(score_pit - self.PLAY_PITS, score_pit):
            if self.state[i] > 0:
                legal_moves.append(i)
        if legal_moves == []:
            legal_moves = [self.PASS]
        return legal_moves 
 
    
    def real_move(self,move):
        """Make a move or a non-stop list of moves. While the the seed ends in the player's counter, go on"""
        clone=copy.deepcopy(self)
        clone.make_move(move)
        return clone
        
    def make_move(self, move):
        """Make the designated move, redistributing pieces from the indicated position
        and updating the player accordingly."""
        if move == self.PASS:
            self.to_move = self.NORTH if self.to_move == self.SOUTH else self.SOUTH
            self.pass_turn=False    # "O passa deixa de ser True"
            return self
        position = move
        self.prev_move = move
        score_pit = self.SOUTH_SCORE_PIT if self.to_move == self.SOUTH else self.NORTH_SCORE_PIT
        opponent_score_pit = self.NORTH_SCORE_PIT if self.to_move == self.SOUTH else self.SOUTH_SCORE_PIT

        # Check for illegal move
        if position < score_pit - self.PLAY_PITS or position >= score_pit or self.state[position] == 0:
            raise ValueError(f'make_move: Illegal move {move}')

        # Take the pieces from the indicated pit.
        pieces = self.state[position]
        self.state[position] = 0

        # Redistribute them around the pits, skipping the opponent's scoring pit.
        while pieces > 0:
            position = (position + 1) % self.TOTAL_PITS

            # Skip over opponent's scoring pit
            if position == opponent_score_pit:
                continue

            # Distribute piece
            self.state[position] += 1
            pieces -= 1

            # If the last piece distributed landed in an empty pit on one's side,
            # capture both the last piece and any pieces opposite.

        # if last piece distributed in empty pit on own side
        if self.state[position] == 1 and (score_pit - position) > 0 \
                and (score_pit - position <= self.PLAY_PITS):  # last piece into empty play pit
            opposite_pit = self.NORTH_SCORE_PIT - position - 1
            # capture own pit
            self.state[score_pit] += 1
            self.state[position] = 0
            # capture opposite pit
            self.state[score_pit] += self.state[opposite_pit]
            self.state[opposite_pit] = 0

        # If the last piece did not land in one's scoring pit, then the player changes.
        
        if position == score_pit:
            self.pass_turn=True
        self.to_move = self.NORTH if self.to_move == self.SOUTH else self.SOUTH

        # Check for starvation according to U.S. Patent 2,720,362, lines 54-57:
        # "One single game or play is ended when all of the pits on one side of
        # the game board are empty.  All game pieces remaining in the pits on
        # the opposite side go into the kalah on that side." ("Kalah" refers to
        # the scoring pit.)

        # Side note: This is different from starvation rules of some Mancala games
        # where the first player unable to play a legal move allows their opponent
        # to immediately score their remaining pieces.

        south_play_pit_pieces, north_play_pit_pieces = 0, 0
        for position in range(self.SOUTH_SCORE_PIT):
            south_play_pit_pieces += self.state[position]
            north_play_pit_pieces += self.state[position + self.SOUTH_SCORE_PIT + 1]
        if south_play_pit_pieces == 0 or north_play_pit_pieces == 0:
            self.state[self.SOUTH_SCORE_PIT] += south_play_pit_pieces
            self.state[self.NORTH_SCORE_PIT] += north_play_pit_pieces
            for position in range(self.SOUTH_SCORE_PIT):
                self.state[position] = 0
                self.state[position + self.SOUTH_SCORE_PIT + 1] = 0
        
    def __repr__(self):
        """String representation of current game state.
        Example (initial state):

             1  2  3  4  5  6
        -------------------------
        |  | 4| 4| 4| 4| 4| 4|  |
        | 0|-----------------| 0|
        |  | 4| 4| 4| 4| 4| 4|  | <--
        -------------------------
             6  5  4  3  2  1"""
        
        s = ['     _  _  _  _  _  _\n     1  2  3  4  5  6\n-------------------------\n|  ']
        for i in range(self.NORTH_SCORE_PIT - 1, self.SOUTH_SCORE_PIT, -1):
            s.append('|' if self.state[i] > 9 else '| ')
            s.append(str(self.state[i]))
        s.append('|  |')
        if self.to_move == self.NORTH:
            s.append(' <--')
            if self.pass_turn:
                s.append(' (Pass)')
        s.append('\n|' if self.state[self.NORTH_SCORE_PIT] > 9 else '\n| ')
        s.append(str(self.state[self.NORTH_SCORE_PIT]))
        s.append('|-----------------|')
        if self.state[self.SOUTH_SCORE_PIT] <= 9:
            s.append(' ')
        s.append(str(self.state[self.SOUTH_SCORE_PIT]))
        s.append('|\n|  ')
        for i in range(self.SOUTH_SCORE_PIT):
            s.append('|' if self.state[i] > 9 else '| ')
            s.append(str(self.state[i]))
        s.append('|  |')
        if self.to_move == self.SOUTH:
            s.append(' <--')
            if self.pass_turn:
                s.append(' (Pass)')
        s.append('\n-------------------------\n     6  5  4  3  2  1\n')
        return ''.join(s)

    
    
class Kalah(Game):
    """The Game of Kalah"""

    def __init__(self,fairkalah_state_index=-1, other=None):
        "One of the fair games, or the standard one, or some specific we want to begin with"
        
        self.initial = KalahState(fairkalah_state_index, other)


    def actions(self, state):
        """Legal moves are integers from 0 to 6 and from 7 to 13; also pass which is -1."""
        
        return state.get_legal_moves()


    def result(self, state, move):
        "Execute move from state, returning next state"
        
        return state.real_move(move)
    
    
    def utility(self, state, player):
        """Return the value to player; 1 for win, -1 for loss, 0 otherwise.
        In fact result is called to know who won or a draw (0:1, 1:-1)
        In that case, if it was the player: 1, otherwise -1.
        utility 0 in case no one won"""
        aux = state.result()
        return aux if player == 0 else -aux

    def terminal_test(self, state):
        """A state is terminal if no seeds in the pits."""
        return state.is_game_over()

    def display(self, state):
        print("----------------------")
        print(state)
        fim = self.terminal_test(state)
        if  fim:
            print("FIM do Jogo")
            out = self.utility(state,0)
            if out == 1:
                print('Ganhou SUL')
            elif out == -1:
                print('Ganhou NORTE')
            else:
                print('Empate')
    
