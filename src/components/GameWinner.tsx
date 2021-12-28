import Grow from '@mui/material/Grow';
import { FC, useState } from 'react';
import GameCharacter from 'components/common/GameCharacter';

interface Props {
  winner: 'X' | 'O' | null;
}

const GameWinner: FC<Props> = ({ winner }) => {
  const [showWinner, setShowWinner] = useState(!!winner);

  return (
    <>
      <Grow in={showWinner} timeout={600}>
        <div
          className="h-[254px] w-[254px] bg-[#fff] flex flex-col justify-center items-center"
          onClick={() => setShowWinner(false)}
        >
          <div className="h-52 w-52">
            <GameCharacter value={winner} />
          </div>
          <div className="text-3xl">WINNER!</div>
        </div>
      </Grow>
    </>
  );
};

export default GameWinner;
