import { FC, useState } from 'react';
import Square from './Square';

const Board: FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number) => {
    const mySquares = squares.slice();
    mySquares[i] = xIsNext ? 'X' : 'O';
    setSquares(mySquares);
    setXIsNext(!xIsNext);
  };

  const calculateWinner = (squares: string[] | null[]) => {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);

  return (
    <>
      <div>
        <p>
          {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}
        </p>
      </div>
      <div className="w-[122px] flex flex-wrap">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={square}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
