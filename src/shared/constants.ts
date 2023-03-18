export const EMPTY_TODO = {
  _id: "",
  message: "",
  completed: false,
  priority: "Medium",
  createdAt: "",
};

export const PRIORITY = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export const STATUS = {
  DONE: "Done",
  IN_PROGRESS: "In Progress",
};

export const EMPTY_TODO_FORM = {
  message: "",
  priority: PRIORITY.MEDIUM,
  completed: false,
};

export const STATUS_OPTIONS = {
  DONE: "Done",
  IN_PROGRESS: "In Progress",
};

export const BASE_URL = "http://localhost:3001";

export const ERROR_MESSAGES = {
  ADD_TODO: "Add todo failed",
  GET_TODOS: "Unable fetch todos",
  GET_TODO_BY_ID: "Todo not found",
  UPDATE_TODO: "Unable to update todo",
  DELETE_TODO: "Unable to delete todo",
};

export const SUCCESS_MESSAGES = {
  ADD_TODO: "Todo added successfully",
  GET_TODOS: "Todo not found",
  GET_TODO_BY_ID: "Todo not found",
  UPDATE_TODO: "Todo updated successfully",
  DELETE_TODO: "Todo deleted successfully",
};

export const SNACKBAR_DURATION = 6000;
