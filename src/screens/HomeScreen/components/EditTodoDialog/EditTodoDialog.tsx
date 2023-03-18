import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import Dropdown from "shared/components/Dropdown";
import { Todo } from "shared/types";
import { PRIORITY, STATUS } from "shared/constants";
import { COLOR } from "shared/Color";

type EditTodoDialogProps = {
  onEditTodo: (updatedTodo: Todo) => void;
  onCloseDialog: () => void;
  todo: Todo;
  open: boolean;
};

const EditTodoDialog = ({
  todo,
  open,
  onCloseDialog,
  onEditTodo,
}: EditTodoDialogProps) => {
  const [inputTodo, setInputTodo] = useState<Todo>(todo);

  useEffect(() => {
    setInputTodo(todo);
  }, [todo]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputTodo((data: Todo) => ({ ...data, [name]: value }));
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

  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          name={"message"}
          margin="dense"
          id="name"
          label="Message"
          fullWidth
          required
          value={inputTodo.message}
          onChange={onInputChange}
        />
        <Dropdown
          value={inputTodo.completed.toString()}
          defaultValue={STATUS.IN_PROGRESS}
          onChange={onStatusChange}
          label="Status"
          sx={{ marginY: 2 }}
        >
          <MenuItem value="false">{STATUS.IN_PROGRESS}</MenuItem>
          <MenuItem value="true">{STATUS.DONE}</MenuItem>
        </Dropdown>
        <Dropdown
          value={inputTodo.priority}
          defaultValue={PRIORITY.MEDIUM}
          onChange={onPriorityChanged}
          label="Priority"
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value={PRIORITY.LOW}>{PRIORITY.LOW}</MenuItem>
          <MenuItem value={PRIORITY.MEDIUM}>{PRIORITY.MEDIUM}</MenuItem>
          <MenuItem value={PRIORITY.HIGH}>{PRIORITY.HIGH}</MenuItem>
        </Dropdown>
        <DialogContentText sx={{ color: COLOR.ERROR }}>
          Created at: {moment(todo.createdAt).format("DD.MM.YYYY HH:mm")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDialog}>CANCEL</Button>
        <Button
          onClick={() => onEditTodo(inputTodo)}
          color="error"
          disabled={!inputTodo.message}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTodoDialog;
