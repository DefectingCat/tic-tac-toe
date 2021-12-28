import { FC } from 'react';
import { ReactComponent as O } from 'assets/O.svg';
import { ReactComponent as X } from 'assets/X.svg';
import type { Character } from 'features/game/gameSlice';

const validObj = {
  X: <X />,
  O: <O />,
};

interface Props {
  value: Character;
}

const GameCharacter: FC<Props> = ({ value }) => {
  return <>{value && validObj[value]}</>;
};

export default GameCharacter;
