import React, { FC } from 'react';

interface Props {
  value: string | null;
  onClick: () => void;
}

const Square: FC<Props> = ({ value, onClick }) => {
  return (
    <>
      <button
        className="text-center h-14 w-14 leading-14 text-5xl select-none bg-[#fff]"
        onClick={onClick}
      >
        {value}
      </button>
    </>
  );
};

export default React.memo(Square);
