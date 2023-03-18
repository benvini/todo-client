import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

type DeleteTodoDialogProps = {
  onDeleteTodo: () => void;
  onCloseDialog: () => void;
  open: boolean;
};

const DeleteTodoDialog = ({
  open,
  onCloseDialog,
  onDeleteTodo,
}: DeleteTodoDialogProps) => {
  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogTitle>Delete Todo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this todo?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDialog}>CANCEL</Button>
        <Button onClick={onDeleteTodo} color="error">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTodoDialog;
