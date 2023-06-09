import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { CircularProgress } from "@mui/material";

import TodoTable from "../TodoTable/TodoTable";
import { Todo } from "shared/types";
import DeleteTodoDialog from "../DeleteTodoDialog/DeleteTodoDialog";
import { EMPTY_TODO, ERROR_MESSAGES, SUCCESS_MESSAGES } from "shared/constants";
import NotificationSnackbar from "shared/components/Snackbar/Snackbar";
import { RootState } from "store/store";
import {
  setSelectedTodo,
  deleteTodoAsync,
  getTodosAsync,
} from "store/actions/todos";
import Typography from "shared/components/Typography/Typography";
import Title from "shared/components/Title/Title";
import Button from "shared/components/Button/Button";
import { COLOR } from "shared/Color";
import {
  Container,
  ButtonsContainer,
  EmptyTableTypography,
  StyledButton,
} from "./styles";

const HomeScreen = () => {
  const [focusedTodo, setFocusedTodo] = useState<Todo>(EMPTY_TODO);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [showDeleteTodoModal, setShowDeleteTodoModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const updatedTodos = useSelector((state: RootState) => state.todos.todos);
  const lastNotificationMessage = useRef("");
  const notificationMessage = location.state?.message;

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getTodosAsync());
        setIsLoading(false);
        setError(false);
      } catch (err) {
        setShowSnackbar(true);
        setSnackbarMessage(ERROR_MESSAGES.GET_TODOS);
        setIsLoading(false);
        setError(true);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (
      notificationMessage &&
      notificationMessage !== lastNotificationMessage.current
    ) {
      setShowSnackbar(true);
      setSnackbarMessage(notificationMessage);
      lastNotificationMessage.current = notificationMessage;
    }
  }, [notificationMessage]);

  useEffect(() => {
    setTodos(updatedTodos || []);
  }, [updatedTodos]);

  const startDeleteTodo = () => {
    setShowDeleteTodoModal(true);
  };

  const onCloseDeleteTodoModal = () => {
    setFocusedTodo(EMPTY_TODO);
    setShowDeleteTodoModal(false);
  };

  const onDeleteTodo = async () => {
    const focusedTodoID = focusedTodo._id;
    try {
      if (!focusedTodoID) {
        throw new Error("Unable to update todo without id");
      }
      await dispatch(deleteTodoAsync(focusedTodoID));
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
    navigate("/add");
  };

  const startEditTodo = () => {
    navigate("/edit");
    dispatch(setSelectedTodo(focusedTodo));
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
    lastNotificationMessage.current = "";
  };

  if (isLoading) {
    return (
      <Container>
        <Title>Todo App</Title>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>Todo App</Title>
        <Typography>{ERROR_MESSAGES.GET_TODOS}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Todo App</Title>
      {!todos?.length ? (
        <>
          <EmptyTableTypography>No todos available.</EmptyTableTypography>
          <Button color={COLOR.SUCCESS} onClick={startAddTodo}>
            Add Todo
          </Button>
        </>
      ) : (
        <>
          <TodoTable
            todos={todos}
            focusedTodo={focusedTodo}
            setFocusedTodo={setFocusedTodo}
          />
          <ButtonsContainer>
            <StyledButton color={COLOR.SUCCESS} onClick={startAddTodo}>
              Add Todo
            </StyledButton>
            <StyledButton
              color={COLOR.PURPLE}
              onClick={startEditTodo}
              disabled={!focusedTodo._id}
            >
              Edit Todo
            </StyledButton>
            <Button
              color={COLOR.ERROR}
              onClick={startDeleteTodo}
              disabled={!focusedTodo._id}
            >
              Delete Todo
            </Button>
          </ButtonsContainer>
        </>
      )}
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
