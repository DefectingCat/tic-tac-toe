import { FC } from 'react';
import type { Step } from './Game';
import Button from '@mui/material/Button';

interface Props {
  step: Step;
  onClick: () => void;
}

const GameInfo: FC<Props> = ({ step, onClick }) => {
  return (
    <>
      <Button onClick={onClick}>
        {step.id === 0 ? 'Go to game start' : `Go to move #${step.id}`}
      </Button>
    </>
  );
};

export default GameInfo;
