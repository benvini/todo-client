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
