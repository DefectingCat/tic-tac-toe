import React, { FC } from 'react';
import Button from '@mui/material/Button';

interface Props {
  stepId: number;
  onClick: () => void;
}

const GameInfo: FC<Props> = ({ stepId, onClick }) => {
  return (
    <>
      <li>
        <Button onClick={onClick}>
          {stepId === 0 ? 'Go to game start' : `Go to move #${stepId}`}
        </Button>
      </li>
    </>
  );
};

export default React.memo(GameInfo);
