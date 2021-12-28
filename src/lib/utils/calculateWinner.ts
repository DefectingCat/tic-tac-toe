import { Squares } from 'features/game/gameSlice';

const calculateWinner = (squares: Squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const line = lines.find(
    (line) =>
      squares[line[0]] &&
      squares[line[0]] === squares[line[1]] &&
      squares[line[0]] === squares[line[2]]
  );
  return line && squares[line[0]];
};

export default calculateWinner;
