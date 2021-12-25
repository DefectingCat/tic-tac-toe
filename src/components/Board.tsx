import { FC } from 'react';
import Square from './Square';
import { State } from './Game';

interface Props {
  state: State;
  updateGame: (i: number) => void;
}

const Board: FC<Props> = ({ state, updateGame }) => {
  const { squares } = state.current;
  const { winner, xIsNext } = state;

  return (
    <>
      <p className="text-xl text-center my-2">
        {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}
      </p>
      <div className="inline-grid grid-rows-3 grid-cols-3 bg-gray-400 gap-1">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={square}
            onClick={() => updateGame(index)}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
