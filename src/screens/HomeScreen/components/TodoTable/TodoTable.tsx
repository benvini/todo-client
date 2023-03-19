import { useCallback } from "react";
import moment from "moment";

import { EMPTY_TODO } from "shared/constants";
import { COLOR } from "shared/Color";
import { TodoTableProps } from "./types";
import {
  TableContainer,
  Table,
  TableRowCells,
  TableRowColumns,
  TableCell,
  Thead,
  Tbody,
} from "./styles";

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
      <TableRowCells
        key={todo._id}
        onClick={() => onTodoClicked(todo._id)}
        focused={focusedTodo?._id === todo._id}
      >
        <TableCell>{todo.message}</TableCell>
        <TableCell color={todo.completed ? COLOR.SUCCESS : COLOR.ERROR}>
          {todo.completed ? "Done" : "In Progress"}
        </TableCell>
        <TableCell>{todo.priority}</TableCell>
        <TableCell>
          {moment(todo.createdAt).format("DD.MM.YYYY HH:mm")}
        </TableCell>
      </TableRowCells>
    ));
  }, [focusedTodo, onTodoClicked, todos]);

  return (
    <TableContainer>
      <Table>
        <Thead>
          <TableRowColumns>
            <TableCell>Message</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Created At</TableCell>
          </TableRowColumns>
        </Thead>
        <Tbody>{renderTodos()}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default TodoTable;
