import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import calculateWinner from 'lib/utils/calculateWinner';

export type Character = 'X' | 'O' | null;
export type Squares = Character[];
export type Step = {
  id: number;
  next: 'X' | 'O';
  winner?: 'X' | 'O' | null;
  squares: Squares;
};

export interface GameState {
  history: Step[];
  current: Step;
}

const initialSetp: Step = {
  id: 0,
  next: 'X',
  winner: null,
  squares: Array(9).fill(null),
};

const initialState: GameState = {
  history: [initialSetp],
  current: initialSetp,
};

const validNext: {
  X: 'O';
  O: 'X';
} = {
  X: 'O',
  O: 'X',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    /**
     * Move step and update history.
     * Playload is index of squares.
     * @param state
     * @param action
     * @returns
     */
    moveStep: (state, action: PayloadAction<number>) => {
      const { current } = state;
      current.squares[action.payload] = current.next;
      current.id = current.id + 1;
      current.next = validNext[current.next];
      current.winner = calculateWinner(current.squares);

      // After time travel, it's can be make new history
      state.history = state.history.slice(0, current.id);
      state.history.push(current);
    },

    /**
     * Recover history step to current step.
     * Payload is id of step, used to find which step needs to be recovered.
     * @param state
     * @param action
     */
    timeTravel: (state, action: PayloadAction<number>) => {
      state.current = state.history.find((step) => step.id === action.payload)!;
    },
    resetGame: () => initialState,
    changeFirst: ({ current, history }, action: PayloadAction<'X' | 'O'>) => {
      current.next = action.payload;
      history[0].next = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { moveStep, timeTravel, resetGame, changeFirst } =
  counterSlice.actions;

export default counterSlice.reducer;
