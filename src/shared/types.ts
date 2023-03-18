export type Todo = {
  _id?: string;
  message: string;
  completed: boolean;
  priority: string;
  createdAt?: string;
};

export type TodoRequiredFields = {
  message: string;
  priority: string;
  completed: boolean;
};

export type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};
