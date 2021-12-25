import { FC, useCallback } from 'react';
import Board from './Board';
import { useImmer } from 'use-immer';
import GameInfo from './GameInfo';

type Squares = ('X' | 'O' | null)[];
export type SquaresState = {
  id: number;
  squares: Squares;
};

export interface State {
  history: SquaresState[];
  xIsNext: boolean;
  winner?: string | null;
  stepNumber: number;
  current: SquaresState;
}

const initialStates = {
  history: [
    {
      id: 0,
      squares: Array(9).fill(null),
    },
  ],
  xIsNext: true,
  winner: null,
  stepNumber: 0,
  current: {
    id: 0,
    squares: Array(9).fill(null),
  },
};

const Game: FC = () => {
  const [gameState, setGameState] = useImmer<State>(initialStates);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // let winner: string | null = null;
    // lines.map(
    //   (line) =>
    //     squares[line[0]] &&
    //     squares[line[0]] === squares[line[1]] &&
    //     squares[line[0]] === squares[line[2]] &&
    //     (winner = squares[line[0]])
    // );

    // return winner;

    const line = lines.find(
      (line) =>
        squares[line[0]] &&
        squares[line[0]] === squares[line[1]] &&
        squares[line[0]] === squares[line[2]]
    );
    return line && squares[line[0]];
  };

  const updateGame = useCallback(
    (i: number) => {
      if (gameState.winner) return;

      setGameState((draft) => {
        draft.current.squares[i] = draft.xIsNext ? 'X' : 'O';
        draft.current.id = draft.current.id + 1;
        draft.stepNumber = draft.current.id;
        draft.xIsNext = draft.stepNumber % 2 === 0;
        draft.history = draft.history.slice(0, draft.stepNumber);
        draft.history.push(draft.current);

        if (draft.current.squares.every((item) => item != null)) {
          draft.winner = 'Game over!';
        } else {
          draft.winner = calculateWinner(draft.current.squares);
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameState.winner]
  );

  const timeTravel = useCallback((id: number) => {
    setGameState((draft) => {
      draft.current = draft.history.find((item) => item.id === id)!;
      draft.stepNumber = id;
      draft.xIsNext = id % 2 === 0;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetGame = useCallback(() => {
    setGameState(() => initialStates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex">
        <div className="mr-4">
          <Board
            state={gameState}
            updateGame={updateGame}
            resetGame={resetGame}
          />
        </div>
        <ul>
          {gameState.history.map((item) => (
            <li key={item.id}>
              <GameInfo square={item} onClick={() => timeTravel(item.id)} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Game;
