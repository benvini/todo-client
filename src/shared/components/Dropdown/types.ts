import { SxProps } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

export type DropdownProps = {
  value: string;
  defaultValue: string;
  label: string;
  onChange: (event: SelectChangeEvent) => void;
  children: ReactNode;
  sx?: SxProps;
  fullWidth?: boolean;
};
