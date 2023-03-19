import { Dispatch } from "redux";

import { Todo } from "shared/types";
import { deleteTodo, createTodo, updateTodo, getTodos } from "shared/utils/api";
import {
  DELETE_TODO,
  UPDATE_TODO,
  CREATE_TODO,
  TODO_ERROR,
  SET_SELECTED_TODO,
  TODO_NOTIFICATION,
  GET_TODOS,
} from "./actionTypes";

export const deleteTodoAsync = (id: string) => async (dispatch: Dispatch) => {
  try {
    await deleteTodo(id);
    dispatch({
      type: DELETE_TODO,
      payload: { id },
    });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: { error: (error as Error).message },
    });
  }
};

export const updateTodoAsync =
  (id: string, todo: Todo) => async (dispatch: Dispatch) => {
    try {
      const updatedTodo = await updateTodo(id, todo);
      dispatch({
        type: UPDATE_TODO,
        payload: { id, todo: updatedTodo },
      });
    } catch (error) {
      dispatch({
        type: TODO_ERROR,
        payload: { error: (error as Error).message },
      });
    }
  };

export const getTodosAsync = () => async (dispatch: Dispatch) => {
  try {
    const todos = await getTodos();
    dispatch({
      type: GET_TODOS,
      payload: { todos },
    });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: { error: (error as Error).message },
    });
  }
};

export const createTodoAsync = (todo: Todo) => async (dispatch: Dispatch) => {
  try {
    const newTodo = await createTodo(todo);
    dispatch({
      type: CREATE_TODO,
      payload: { todo: newTodo },
    });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: { error: (error as Error).message },
    });
  }
};

export const setSelectedTodo = (todo: Todo) => {
  return {
    type: SET_SELECTED_TODO,
    payload: { todo },
  };
};

export const todoNotification = (message: string) => {
  return {
    type: TODO_NOTIFICATION,
    payload: { message },
  };
};
