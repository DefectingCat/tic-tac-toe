import { FC } from 'react';
import GameBoard from './components/GameBoard';
import GameInfo from './components/GameInfo';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { timeTravel } from 'features/game/gameSlice';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';

const Game: FC = () => {
  const history = useAppSelector((state) => state.game.history);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex h-[100vh] justify-center items-center">
        <div className="flex">
          <div className="mr-6">
            <GameBoard />
          </div>

          <ul>
            <TransitionGroup>
              {history.map((item) => (
                <Collapse key={item.id}>
                  <GameInfo
                    stepId={item.id}
                    onClick={() => dispatch(timeTravel(item.id))}
                  />
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
