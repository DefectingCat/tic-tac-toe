import React, { FC } from 'react';
import Button from '@mui/material/Button';

interface Props {
  stepId: number;
  onClick: () => void;
}

const GameInfo: FC<Props> = ({ stepId, onClick }) => {
  return (
    <>
      <Button onClick={onClick}>
        {stepId === 0 ? 'Go to game start' : `Go to move #${stepId}`}
      </Button>
    </>
  );
};

export default React.memo(GameInfo);
