import { FC } from 'react';
import { ReactComponent as O } from 'assets/O.svg';
import { ReactComponent as X } from 'assets/X.svg';
import style from './game-turn.module.css';

interface Props {
  next: 'X' | 'O';
  changeFirst: (character: 'X' | 'O') => void;
}

const oStyle = {
  O: style.shadow,
  X: '',
};

const xStyle = {
  O: '',
  X: style.shadow,
};

const GameTurn: FC<Props> = ({ next, changeFirst }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div
          className={`${oStyle[next]} w-24 h-10 border rounded-lg flex justify-center item-center cursor-pointer transition-shadow p-[2px]`}
          onClick={() => next === 'X' && changeFirst('O')}
        >
          <O />
        </div>

        <div
          className={`${xStyle[next]} w-24 h-10 border rounded-lg flex justify-center item-center cursor-pointer transition-shadow p-[2px]`}
          onClick={() => next === 'O' && changeFirst('X')}
        >
          <X />
        </div>
      </div>
    </>
  );
};

export default GameTurn;
