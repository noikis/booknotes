import { produce } from "immer";

import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  (state: CellState = initialState, action: Action): CellState => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return state;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const { order } = state;

        // get indexes of swapped elements
        const index = order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        // move elements outside the bounds of the array
        if (targetIndex < 0 || targetIndex > order.length - 1) {
          return state;
        }
        // swap
        order[index] = order[targetIndex];
        order[targetIndex] = action.payload.id;
        return state;
      case ActionType.INSERT_CELL_AFTER:
        // Generate Cell with random id
        const cell: Cell = {
          id: randomId(),
          content: "",
          type: action.payload.type,
        };
        // Update state.data (immer :)
        state.data[cell.id] = cell;

        const currentIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        // Not found return -1
        if (currentIndex < 0) {
          state.order.unshift(cell.id);
        } else {
          state.order.splice(currentIndex + 1, 0, cell.id);
        }
        return state;
      default:
        return state;
    }
  }
);

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
