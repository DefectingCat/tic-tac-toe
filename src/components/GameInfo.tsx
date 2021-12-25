import { FC } from 'react';
import { SquaresState } from './Game';

interface Props {
  square: SquaresState;
  onClick: () => void;
}

const GameInfo: FC<Props> = ({ square, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="border p-2 rounded-xl hover:bg-gray-200 hover:text-gray-500 transition-all my-1"
      >
        {square.id === 0 ? 'Go to game start' : `Go to move #${square.id}`}
      </button>
    </>
  );
};

export default GameInfo;
