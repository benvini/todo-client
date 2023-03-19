import { Todo } from "shared/types";

export type TableRowProps = {
  focused?: boolean;
};

export type TableCellProps = {
  color?: string;
};

export type TodoTableProps = {
  todos: Todo[];
  focusedTodo: Todo;
  setFocusedTodo: (actionTodo: Todo) => void;
};
