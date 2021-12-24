import React, { FC } from 'react';

interface Props {
  value: string;
  onClick: () => void;
}

const Square: FC<Props> = ({ value, onClick }) => {
  return (
    <>
      <button
        className="text-center border border-gray-300 h-10 w-10 leading-10 mt-[-1px] mr-[-1px] text-2xl select-none"
        onClick={onClick}
      >
        {value}
      </button>
    </>
  );
};

export default React.memo(Square);
