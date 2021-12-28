import { FC } from 'react';
import GameBoard from './components/GameBoard';
import GameInfo from './components/GameInfo';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { timeTravel } from 'features/game/gameSlice';

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
            {history.map((item) => (
              <li key={item.id}>
                <GameInfo
                  stepId={item.id}
                  onClick={() => dispatch(timeTravel(item.id))}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Game;
