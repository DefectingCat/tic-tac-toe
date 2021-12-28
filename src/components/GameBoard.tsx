import { FC } from 'react';
import GameSquare from './GameSquare';
import Fab from '@mui/material/Fab';
import GameTurn from './GameTurn';
import { ReactComponent as O } from 'assets/O.svg';
import { ReactComponent as X } from 'assets/X.svg';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { moveStep, resetGame } from 'features/game/gameSlice';

const validObj = {
  X: <X />,
  O: <O />,
};

const Board: FC = () => {
  const { next, winner, squares } = useAppSelector(
    (state) => state.game.current
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="text-2xl text-center">
        {winner && validObj[winner]}

        {/* <div className="flex items-center justify-center">
          Next player:
          <div className="inline-block w-10 h-10">{validObj[next]}</div>
        </div> */}

        <GameTurn next={next} />
      </div>

      <div className="inline-grid grid-rows-3 grid-cols-3 gap-[7px] bg-gray-300 my-4">
        {squares.map((square, index) => (
          <GameSquare
            key={index}
            value={square}
            onClick={() => dispatch(moveStep(index))}
          />
        ))}
      </div>

      <div className="flex justify-center items-center">
        <Fab
          variant="extended"
          onClick={() => dispatch(resetGame())}
          color="primary"
        >
          Reset game
        </Fab>
      </div>
    </>
  );
};

export default Board;
