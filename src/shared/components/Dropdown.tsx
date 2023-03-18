import React, { ReactNode } from "react";
import {
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";

type DropdownProps = {
  value: string;
  defaultValue: string;
  label: string;
  onChange: (event: SelectChangeEvent) => void;
  children: ReactNode;
  sx?: SxProps;
};

const Dropdown = ({
  value,
  defaultValue,
  label,
  onChange,
  children,
  sx,
}: DropdownProps) => {
  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        defaultValue={defaultValue}
        label={label}
        onChange={onChange}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
