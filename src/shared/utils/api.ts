import axios from "axios";
import { BASE_URL } from "shared/constants";
import { Todo } from "shared/types";

export const getTodos = async () => {
  const response = await axios.get(`${BASE_URL}/`);
  return response.data;
};

export const deleteTodo = async (id: string | undefined) => {
  if (!id) {
    throw new Error("id is undefined");
  }
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const updateTodo = async (id: string | undefined, todo: Todo) => {
  if (!id) {
    throw new Error("id is undefined");
  }
  const response = await axios.patch(`${BASE_URL}/${id}`, todo);
  return response.data;
};

export const getTodoById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createTodo = async (todo: Todo) => {
  const response = await axios.post(`${BASE_URL}/`, todo);
  return response.data;
};
