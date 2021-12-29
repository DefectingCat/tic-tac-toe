import React, { FC } from 'react';
import GameCharacter from 'components/common/GameCharacter';
import type { Character } from 'features/game/gameSlice';

interface Props {
  value: Character;
  index: number;
  handleMove: (i: number) => void;
}

const Square: FC<Props> = ({ value, index, handleMove }) => {
  const handleClick = () => {
    if (value) return;
    handleMove(index);
  };

  return (
    <>
      <div
        className="flex justify-center item-center cursor-pointer h-20 w-20 select-none bg-[#fff]"
        onClick={handleClick}
      >
        {value && <GameCharacter value={value} />}
      </div>
    </>
  );
};

export default React.memo(Square);
