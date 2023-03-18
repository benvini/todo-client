import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  MenuItem,
  SelectChangeEvent,
  DialogActions,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

import Dropdown from "shared/components/Dropdown";
import { EMPTY_TODO_FORM, PRIORITY, STATUS } from "shared/constants";
import { Todo, TodoRequiredFields } from "shared/types";

type AddTodoDialogProps = {
  onAddTodo: (todo: TodoRequiredFields) => void;
  onCloseDialog: () => void;
  open: boolean;
};

const AddTodoDialog = ({
  onAddTodo,
  onCloseDialog,
  open,
}: AddTodoDialogProps) => {
  const [formData, setFormData] = useState<TodoRequiredFields>(EMPTY_TODO_FORM);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((data: TodoRequiredFields) => ({ ...data, [name]: value }));
  };

  const onPriorityChanged = (event: SelectChangeEvent) => {
    const updatedPriority = event.target.value as string;
    setFormData((data: TodoRequiredFields) => ({
      ...data,
      priority: updatedPriority,
    }));
  };

  const startCloseDialog = () => {
    setFormData(EMPTY_TODO_FORM);
    onCloseDialog();
  };

  const onSubmit = () => {
    onAddTodo(formData);
    setFormData(EMPTY_TODO_FORM);
  };

  const onStatusChange = (event: SelectChangeEvent) => {
    const updatedStatusStr = event.target.value;
    const updatedStatus = updatedStatusStr === "true";
    setFormData((data: Todo) => ({
      ...data,
      completed: updatedStatus,
    }));
  };

  return (
    <Dialog open={open} onClose={startCloseDialog}>
      <DialogTitle>Add Todo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a todo, please fill the form.
        </DialogContentText>
        <TextField
          autoFocus
          name={"message"}
          margin="dense"
          id="name"
          label="Message"
          fullWidth
          required
          sx={{ marginY: 4 }}
          value={formData.message}
          onChange={onInputChange}
        />
        <Dropdown
          value={formData.completed.toString()}
          defaultValue={STATUS.IN_PROGRESS}
          onChange={onStatusChange}
          label="Status"
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value="false">{STATUS.IN_PROGRESS}</MenuItem>
          <MenuItem value="true">{STATUS.DONE}</MenuItem>
        </Dropdown>
        <Dropdown
          value={formData.priority}
          defaultValue={PRIORITY.MEDIUM}
          onChange={onPriorityChanged}
          label="Priority"
        >
          <MenuItem value={PRIORITY.LOW}>{PRIORITY.LOW}</MenuItem>
          <MenuItem value={PRIORITY.MEDIUM}>{PRIORITY.MEDIUM}</MenuItem>
          <MenuItem value={PRIORITY.HIGH}>{PRIORITY.HIGH}</MenuItem>
        </Dropdown>
      </DialogContent>
      <DialogActions>
        <Button onClick={startCloseDialog} color="error">
          Cancel
        </Button>
        <Button
          onClick={() => onSubmit()}
          color="success"
          disabled={!formData.message}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTodoDialog;
