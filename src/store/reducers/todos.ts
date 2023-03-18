import { Todo } from "shared/types";
import {
  DELETE_TODO,
  UPDATE_TODO,
  CREATE_TODO,
  SET_SELECTED_TODO,
  TODO_NOTIFICATION,
  GET_TODOS,
} from "../actions/actionTypes";

export interface TodoState {
  todos: Todo[];
  selectedTodo: Todo | undefined;
  message: string;
}

const initialState: TodoState = {
  todos: [],
  selectedTodo: undefined,
  message: "",
};

const todoReducer = (
  state: TodoState = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload.id),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload.id ? action.payload.todo : todo
        ),
      };
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload.todo],
      };
    case SET_SELECTED_TODO:
      return {
        ...state,
        selectedTodo: action.payload.todo,
      };
    case TODO_NOTIFICATION:
      return {
        ...state,
        message: action.payload.message,
      };
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload.todos,
      };
    default:
      return state;
  }
};

export default todoReducer;
