import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCallback } from "react";
import moment from "moment";
import { EMPTY_TODO } from "shared/constants";
import { Todo } from "shared/types";
import { COLOR } from "shared/Color";

type TodoTableProps = {
  todos: Todo[];
  focusedTodo: Todo;
  setFocusedTodo: (actionTodo: Todo) => void;
};

const TodoTable = ({ todos, focusedTodo, setFocusedTodo }: TodoTableProps) => {
  const findTodoById = useCallback(
    (id: string | undefined) => {
      if (!id) {
        return undefined;
      }
      return todos.find((todo) => todo._id === id);
    },
    [todos]
  );

  const onTodoClicked = useCallback(
    (id: string | undefined) => {
      const actionTodo = findTodoById(id);
      if (actionTodo) {
        setFocusedTodo(actionTodo);
      } else {
        setFocusedTodo(EMPTY_TODO);
      }
    },
    [findTodoById, setFocusedTodo]
  );

  const renderTodos = useCallback(() => {
    if (!todos.length) {
      return [];
    }
    return todos.map((todo) => (
      <TableRow
        key={todo._id}
        onClick={() => onTodoClicked(todo._id)}
        sx={{
          backgroundColor:
            focusedTodo?._id === todo._id ? COLOR.BLUE : undefined,
        }}
      >
        <TableCell>{todo.message}</TableCell>
        <TableCell sx={{ color: todo.completed ? COLOR.SUCCESS : COLOR.ERROR }}>
          {todo.completed ? "Done" : "In Progress"}
        </TableCell>
        <TableCell>{todo.priority}</TableCell>
        <TableCell>
          {moment(todo.createdAt).format("DD.MM.YYYY HH:mm")}
        </TableCell>
      </TableRow>
    ));
  }, [focusedTodo, onTodoClicked, todos]);

  return (
    <TableContainer sx={{ width: "60%", marginY: 4 }} component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Message</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderTodos()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoTable;
