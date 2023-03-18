import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SNACKBAR_DURATION } from "shared/constants";

type NotificationSnackbarProps = {
  open: boolean;
  onClose: () => void;
  message: string;
};

const NotificationSnackbar = ({
  open,
  onClose,
  message,
}: NotificationSnackbarProps) => {
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  return (
    <Snackbar
      open={open}
      autoHideDuration={SNACKBAR_DURATION}
      onClose={onClose}
      message={message}
      action={action}
    />
  );
};

export default NotificationSnackbar;
