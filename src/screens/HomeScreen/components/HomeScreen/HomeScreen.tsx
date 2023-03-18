import { useEffect, useState } from "react";
import { Container, ButtonsContainer } from "./styles";
import { Typography, Button } from "@mui/material";
import TodoTable from "../TodoTable/TodoTable";
import AddTodoDialog from "../AddTodoDialog/AddTodoTialog";
import { Todo, TodoRequiredFields } from "shared/types";
import EditTodoDialog from "../EditTodoDialog/EditTodoDialog";
import DeleteTodoDialog from "../DeleteTodoDialog/DeleteTodoDialog";
import { EMPTY_TODO, ERROR_MESSAGES, SUCCESS_MESSAGES } from "shared/constants";
import {
  getAllTodos,
  deleteTodo,
  getTodoById,
  updateTodo,
  createTodo,
} from "shared/utils/api";
import NotificationSnackbar from "shared/components/Snackbar";

const HomeScreen = () => {
  const [focusedTodo, setFocusedTodo] = useState<Todo>(EMPTY_TODO);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);
  const [showDeleteTodoModal, setShowDeleteTodoModal] = useState(false);
  const [showEditTodoModal, setShowEditTodoModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const allTodos = await getAllTodos();
        setTodos(allTodos);
        setError(false);
      } catch (err) {
        setShowSnackbar(true);
        setSnackbarMessage(ERROR_MESSAGES.GET_TODOS);
        setError(true);
      }
    })();
  }, []);

  const startDeleteTodo = () => {
    setShowDeleteTodoModal(true);
  };

  const onAddTodo = async (todo: TodoRequiredFields) => {
    const todoToCreate = {
      message: todo.message,
      completed: todo.completed,
      priority: todo.priority,
    };
    try {
      const newTodo = await createTodo(todoToCreate);
      setTodos((todos) => [...todos, newTodo]);
      setShowSnackbar(true);
      setSnackbarMessage(SUCCESS_MESSAGES.ADD_TODO);
    } catch (err) {
      setShowSnackbar(true);
      setSnackbarMessage(ERROR_MESSAGES.ADD_TODO);
    } finally {
      onCloseAddTodoModal();
    }
  };

  const onCloseDeleteTodoModal = () => {
    setFocusedTodo(EMPTY_TODO);
    setShowDeleteTodoModal(false);
  };

  const startEditTodo = () => {
    setShowEditTodoModal(true);
  };

  const onEditTodo = async (modifiedTodo: Todo) => {
    try {
      const updatedTodo = await updateTodo(modifiedTodo._id, modifiedTodo);
      const updatedTodos = todos.map((todo) => {
        if (updatedTodo._id !== todo._id) {
          return todo;
        }
        return updatedTodo;
      }, todos);
      setShowSnackbar(true);
      setSnackbarMessage(SUCCESS_MESSAGES.UPDATE_TODO);
      setTodos(updatedTodos);
    } catch (err) {
      setShowSnackbar(true);
      setSnackbarMessage(ERROR_MESSAGES.UPDATE_TODO);
    } finally {
      onCloseEditTodoModal();
    }
  };

  const onCloseEditTodoModal = () => {
    setFocusedTodo(EMPTY_TODO);
    setShowEditTodoModal(false);
  };

  const onDeleteTodo = async () => {
    const focusedTodoID = focusedTodo._id;
    try {
      const deletedTodo = await deleteTodo(focusedTodoID);
      setTodos((todos) => todos.filter((todo) => todo._id !== deletedTodo._id));
      setShowSnackbar(true);
      setSnackbarMessage(SUCCESS_MESSAGES.DELETE_TODO);
    } catch (err) {
      setShowSnackbar(true);
      setSnackbarMessage(ERROR_MESSAGES.DELETE_TODO);
    } finally {
      onCloseDeleteTodoModal();
    }
  };

  const startAddTodo = () => {
    setShowAddTodoModal(true);
  };

  const onCloseAddTodoModal = () => {
    setFocusedTodo(EMPTY_TODO);
    setShowAddTodoModal(false);
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  if (error) {
    return (
      <Container>
        <Typography>Todo App</Typography>
        <Typography sx={{ marginY: 4 }}>{ERROR_MESSAGES.GET_TODOS}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography>Todo App</Typography>
      {!todos?.length ? (
        <>
          <Typography sx={{ marginY: 4 }}>No todos available.</Typography>
          <Button
            variant="contained"
            color="success"
            onClick={startAddTodo}
            sx={{ marginRight: 2 }}
          >
            Add Todo
          </Button>{" "}
        </>
      ) : (
        <>
          <TodoTable
            todos={todos}
            focusedTodo={focusedTodo}
            setFocusedTodo={setFocusedTodo}
          />
          <ButtonsContainer>
            <Button
              variant="contained"
              color="success"
              onClick={startAddTodo}
              sx={{ marginRight: 2 }}
            >
              Add Todo
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={startEditTodo}
              disabled={!focusedTodo._id}
              sx={{ marginRight: 2 }}
            >
              Edit Todo
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={startDeleteTodo}
              disabled={!focusedTodo._id}
            >
              Delete Todo
            </Button>
          </ButtonsContainer>
        </>
      )}
      <AddTodoDialog
        onAddTodo={onAddTodo}
        open={showAddTodoModal}
        onCloseDialog={onCloseAddTodoModal}
      />
      <EditTodoDialog
        open={showEditTodoModal}
        todo={focusedTodo}
        onEditTodo={onEditTodo}
        onCloseDialog={onCloseEditTodoModal}
      />
      <DeleteTodoDialog
        open={showDeleteTodoModal}
        onDeleteTodo={onDeleteTodo}
        onCloseDialog={onCloseDeleteTodoModal}
      />
      <NotificationSnackbar
        open={showSnackbar}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default HomeScreen;
