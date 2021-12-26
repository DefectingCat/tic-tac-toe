import { FC } from 'react';
import { ReactComponent as O } from 'assets/O.svg';
import { ReactComponent as X } from 'assets/X.svg';
import style from './game-turn.module.css';

interface Props {
  next: 'X' | 'O';
}

const GameTurn: FC<Props> = ({ next }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div
          className={`${
            next === 'O' && style.shadow
          } w-24 h-10 border rounded-lg flex justify-center item-center cursor-pointer transition-shadow p-[2px]`}
        >
          <O />
        </div>
        <div
          className={`${
            next === 'X' && style.shadow
          } w-24 h-10 border rounded-lg flex justify-center item-center cursor-pointer transition-shadow p-[2px]`}
        >
          <X />
        </div>
      </div>
    </>
  );
};

export default GameTurn;
