import { FC, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import GameInfo from './components/GameInfo';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { timeTravel } from 'features/game/gameSlice';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';

const Game: FC = () => {
  const history = useAppSelector((state) => state.game.history);
  const dispatch = useAppDispatch();

  const handleTimeTravel = useCallback(
    (stepId: number) => {
      dispatch(timeTravel(stepId));
    },
    [dispatch]
  );

  return (
    <>
      <div className="flex h-[100vh] justify-center items-center">
        <div className="flex-1 sm:flex-none grid grid-rows-[repeat(2,_minmax(0,_1fr))_200px] sm:grid-rows-1 sm:grid-cols-2 gap-y-4 justify-items-center">
          <div className="row-span-2">
            <GameBoard />
          </div>

          <ul className="overflow-y-auto w-full flex justify-center">
            <TransitionGroup>
              {history.map((item) => (
                <Collapse key={item.id}>
                  <GameInfo stepId={item.id} onClick={handleTimeTravel} />
                </Collapse>
              ))}
            </TransitionGroup>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Game;
