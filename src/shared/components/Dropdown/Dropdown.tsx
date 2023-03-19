import { Select, FormControl, InputLabel } from "@mui/material";

import { DropdownProps } from "./types";

const Dropdown = ({
  value,
  defaultValue,
  label,
  onChange,
  children,
  fullWidth,
  sx,
}: DropdownProps) => {
  return (
    <FormControl fullWidth={fullWidth} sx={sx}>
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
