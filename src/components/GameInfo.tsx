import React, { FC } from 'react';
import Button from '@mui/material/Button';

interface Props {
  stepId: number;
  onClick: (stepId: number) => void;
}

const GameInfo: FC<Props> = ({ stepId, onClick }) => {
  return (
    <>
      <li>
        <Button onClick={() => onClick(stepId)}>
          {stepId === 0 ? 'Go to game start' : `Go to move #${stepId}`}
        </Button>
      </li>
    </>
  );
};

export default React.memo(GameInfo);
