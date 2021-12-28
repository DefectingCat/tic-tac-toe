import { FC, useCallback } from 'react';
import GameSquare from './GameSquare';
import Fab from '@mui/material/Fab';
import GameTurn from './GameTurn';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { moveStep, resetGame, changeFirst } from 'features/game/gameSlice';
import Grow from '@mui/material/Grow';
import GameWinner from './GameWinner';

const Board: FC = () => {
  const { next, winner, squares } = useAppSelector(
    (state) => state.game.current
  );
  const history = useAppSelector((state) => state.game.history);
  const dispatch = useAppDispatch();

  const handleMove = useCallback(
    (i: number) => () => {
      if (winner) return;
      dispatch(moveStep(i));
    },
    [dispatch, winner]
  );

  const handleReset = () => {
    if (history.length < 2) return;
    dispatch(resetGame());
  };

  const handleChangeFirst = (character: 'X' | 'O') => {
    if (history.length > 1) return;
    dispatch(changeFirst(character));
  };

  return (
    <>
      <div className="text-2xl text-center">
        <GameTurn next={next} changeFirst={handleChangeFirst} />
      </div>

      <Grow in timeout={1000}>
        <div className="relative my-4">
          <div className="inline-grid grid-rows-3 grid-cols-3 gap-[7px] bg-gray-300">
            {squares.map((square, index) => (
              <GameSquare
                key={index}
                value={square}
                onClick={handleMove(index)}
              />
            ))}
          </div>

          {winner && (
            <div className="absolute top-0 left-0">
              <GameWinner winner={winner} />
            </div>
          )}
        </div>
      </Grow>

      <div className="flex justify-center items-center">
        <Fab variant="extended" onClick={handleReset} color="primary">
          Reset game
        </Fab>
      </div>
    </>
  );
};

export default Board;
