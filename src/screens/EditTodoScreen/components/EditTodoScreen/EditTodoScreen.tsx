import { Button, MenuItem, TextField, Typography } from "@mui/material";
import Dropdown from "shared/components/Dropdown";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "./styles";
import {
  EMPTY_TODO,
  ERROR_MESSAGES,
  PRIORITY,
  STATUS,
  SUCCESS_MESSAGES,
} from "shared/constants";
import { COLOR } from "shared/Color";
import NotificationSnackbar from "shared/components/Snackbar";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Todo } from "shared/types";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { todoNotification, updateTodoAsync } from "store/actions/todos";
import { SelectChangeEvent } from "@mui/material";
import { RootState } from "store/store";

const EditTodoScreen = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const selectedTodo = useSelector(
    (state: RootState) => state.todos.selectedTodo
  );
  const [inputTodo, setInputTodo] = useState<Todo>(selectedTodo || EMPTY_TODO);
  const navigate = useNavigate();

  useEffect(() => {
    setInputTodo(selectedTodo || EMPTY_TODO);
  }, [selectedTodo]);

  const onEditTodo = useCallback(async () => {
    try {
      if (!inputTodo._id) {
        throw new Error("Unable to update todo without id");
      }
      await dispatch(updateTodoAsync(inputTodo._id, inputTodo));
      dispatch(todoNotification(SUCCESS_MESSAGES.UPDATE_TODO));
      navigate("/");
    } catch (e) {
      setShowSnackbar(true);
      setSnackbarMessage(ERROR_MESSAGES.UPDATE_TODO);
    }
  }, [dispatch, inputTodo, navigate]);

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  const onPriorityChanged = (event: SelectChangeEvent) => {
    const updatedPriority = event.target.value as string;

    setInputTodo((data: Todo) => ({
      ...data,
      priority: updatedPriority,
    }));
  };

  const onStatusChange = (event: SelectChangeEvent) => {
    const updatedStatusStr = event.target.value;
    const updatedStatus = updatedStatusStr === "true";
    setInputTodo((data: Todo) => ({
      ...data,
      completed: updatedStatus,
    }));
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputTodo((data: Todo) => ({ ...data, [name]: value }));
  };

  const onBackClicked = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Typography>Edit Todo</Typography>
      <Button onClick={onBackClicked}>Back</Button>
      <TextField
        autoFocus
        name={"message"}
        margin="dense"
        id="name"
        label="Message"
        required
        value={inputTodo.message}
        onChange={onInputChange}
        sx={{ marginY: 4, width: 400 }}
      />
      <Dropdown
        value={inputTodo.completed.toString()}
        defaultValue={STATUS.IN_PROGRESS}
        onChange={onStatusChange}
        label="Status"
        sx={{ marginBottom: 2, width: 400 }}
      >
        <MenuItem value="false">{STATUS.IN_PROGRESS}</MenuItem>
        <MenuItem value="true">{STATUS.DONE}</MenuItem>
      </Dropdown>
      <Dropdown
        value={inputTodo.priority}
        defaultValue={PRIORITY.MEDIUM}
        onChange={onPriorityChanged}
        label="Priority"
        sx={{ marginBottom: 2, width: 400 }}
      >
        <MenuItem value={PRIORITY.LOW}>{PRIORITY.LOW}</MenuItem>
        <MenuItem value={PRIORITY.MEDIUM}>{PRIORITY.MEDIUM}</MenuItem>
        <MenuItem value={PRIORITY.HIGH}>{PRIORITY.HIGH}</MenuItem>
      </Dropdown>
      {inputTodo.createdAt && (
        <Typography sx={{ marginBottom: 2, color: COLOR.ERROR }}>
          Created at: {moment(inputTodo.createdAt).format("DD.MM.YYYY HH:mm")}
        </Typography>
      )}

      <Button
        onClick={() => onEditTodo()}
        color="error"
        disabled={!inputTodo.message}
      >
        Update Todo
      </Button>
      <NotificationSnackbar
        open={showSnackbar}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default EditTodoScreen;
