import React, { FC } from 'react';
import { ReactComponent as O } from 'assets/O.svg';
import { ReactComponent as X } from 'assets/X.svg';
import './game.css';

interface Props {
  value: 'X' | 'O' | null;
  onClick: () => void;
}

const validObj = {
  X: <X />,
  O: <O />,
};

const Square: FC<Props> = ({ value, onClick }) => {
  return (
    <>
      <div
        className="flex justify-center item-center cursor-pointer h-20 w-20 select-none bg-[#fff]"
        onClick={onClick}
      >
        {value && validObj[value]}
      </div>
    </>
  );
};

export default React.memo(Square);
