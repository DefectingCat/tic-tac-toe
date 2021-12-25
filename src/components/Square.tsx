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
      <button
        className="text-center h-14 w-14 leading-14 text-5xl select-none bg-[#14bdac]"
        onClick={onClick}
      >
        {value && validObj[value]}
      </button>
    </>
  );
};

export default React.memo(Square);
