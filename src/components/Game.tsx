import { FC, useCallback } from 'react';
import GameBoard from './GameBoard';
import { useImmer } from 'use-immer';
import GameInfo from './GameInfo';

type Squares = ('X' | 'O' | null)[];
export type Step = {
  id: number;
  next: 'X' | 'O';
  winner?: 'X' | 'O' | null;
  squares: Squares;
};

export interface State {
  history: Step[];
  current: Step;
}

const initailSetp: Step = {
  id: 0,
  next: 'X',
  winner: null,
  squares: Array(9).fill(null),
};

const initialStates = {
  history: [initailSetp],
  current: initailSetp,
};

const validNext: {
  X: 'O';
  O: 'X';
} = {
  X: 'O',
  O: 'X',
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
      if (gameState.current.winner) return;

      setGameState((draft) => {
        draft.current.squares[i] = draft.current.next;
        draft.current.id = draft.current.id + 1;
        draft.current.next = validNext[draft.current.next];
        draft.history = draft.history.slice(0, draft.current.id);
        draft.history.push(draft.current);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameState.current.winner]
  );

  const timeTravel = useCallback((id: number) => {
    setGameState((draft) => {
      draft.current = draft.history.find((item) => item.id === id)!;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetGame = useCallback(() => {
    setGameState(() => initialStates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateNext = useCallback(() => {
    setGameState((draft) => {
      draft.current.next = validNext[draft.current.next];
    });
  }, []);

  return (
    <>
      <div className="flex h-[100vh] justify-center items-center">
        <div className="flex">
          <div className="mr-6">
            <GameBoard
              step={gameState.current}
              updateGame={updateGame}
              resetGame={resetGame}
            />
          </div>

          <ul>
            {gameState.history.map((item) => (
              <li key={item.id}>
                <GameInfo step={item} onClick={() => timeTravel(item.id)} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Game;
