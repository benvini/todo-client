import React, { useState, ChangeEvent, useCallback } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, MenuItem, SelectChangeEvent, TextField } from "@mui/material";

import {
  EMPTY_TODO_FORM,
  ERROR_MESSAGES,
  PRIORITY,
  STATUS,
  SUCCESS_MESSAGES,
} from "shared/constants";
import { Todo, TodoRequiredFields } from "shared/types";
import Dropdown from "shared/components/Dropdown/Dropdown";
import { createTodoAsync } from "store/actions/todos";
import NotificationSnackbar from "shared/components/Snackbar/Snackbar";
import { Container, FlexCol } from "./styles";
import Title from "shared/components/Title/Title";

const AddTodoScreen = () => {
  const [formData, setFormData] = useState<TodoRequiredFields>(EMPTY_TODO_FORM);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const navigate = useNavigate();

  const onPriorityChanged = (event: SelectChangeEvent) => {
    const updatedPriority = event.target.value as string;
    setFormData((data: TodoRequiredFields) => ({
      ...data,
      priority: updatedPriority,
    }));
  };

  const onSubmit = useCallback(async () => {
    try {
      await dispatch(createTodoAsync(formData));
      setFormData(EMPTY_TODO_FORM);
      navigate("/", { state: { message: SUCCESS_MESSAGES.ADD_TODO } });
    } catch (e) {
      setShowSnackbar(true);
      setSnackbarMessage(ERROR_MESSAGES.ADD_TODO);
    }
  }, [dispatch, formData, navigate]);

  const onStatusChange = (event: SelectChangeEvent) => {
    const updatedStatusStr = event.target.value;
    const updatedStatus = updatedStatusStr === "true";
    setFormData((data: Todo) => ({
      ...data,
      completed: updatedStatus,
    }));
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((data: TodoRequiredFields) => ({ ...data, [name]: value }));
  };

  const onBackClicked = () => {
    navigate("/");
  };

  return (
    <Container>
      <FlexCol>
        <Button onClick={onBackClicked} sx={{ marginY: 4 }}>
          Back
        </Button>
        <Title>Add Todo</Title>
      </FlexCol>
      <TextField
        autoFocus
        name={"message"}
        margin="dense"
        id="name"
        label="Message"
        required
        sx={{ marginY: 4, width: 400 }}
        value={formData.message}
        onChange={onInputChange}
      />
      <Dropdown
        value={formData.completed.toString()}
        defaultValue={STATUS.IN_PROGRESS}
        onChange={onStatusChange}
        label="Status"
        sx={{ marginBottom: 2, width: 400 }}
      >
        <MenuItem value="false">{STATUS.IN_PROGRESS}</MenuItem>
        <MenuItem value="true">{STATUS.DONE}</MenuItem>
      </Dropdown>
      <Dropdown
        value={formData.priority}
        defaultValue={PRIORITY.MEDIUM}
        onChange={onPriorityChanged}
        label="Priority"
        sx={{ width: 400 }}
      >
        <MenuItem value={PRIORITY.LOW}>{PRIORITY.LOW}</MenuItem>
        <MenuItem value={PRIORITY.MEDIUM}>{PRIORITY.MEDIUM}</MenuItem>
        <MenuItem value={PRIORITY.HIGH}>{PRIORITY.HIGH}</MenuItem>
      </Dropdown>
      <Button
        onClick={() => onSubmit()}
        color="success"
        disabled={!formData.message}
        variant="contained"
        sx={{ marginTop: 2 }}
      >
        Add Todo
      </Button>
      <NotificationSnackbar
        open={showSnackbar}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default AddTodoScreen;
