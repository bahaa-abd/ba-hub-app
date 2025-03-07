import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";

// Define an enum
export enum ExampleEnum {
  OptionOne = "option1",
  OptionTwo = "option2",
  OptionThree = "option3",
}

// Extend SelectProps with enum support
export type SelectProps<T = unknown> = {
  options: Record<string, T>; // Key-value pairs for enum
  onClear?: () => void;
  value: string;
} & MuiSelectProps;

export function Select<T>({
  onChange,
  value,
  label,
  size,
  onClear,
  options,
  ...props
}: SelectProps<T>) {
  return (
    <FormControl fullWidth size={size}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        value={value}
        label={label}
        onChange={onChange}
        {...props}
        endAdornment={
          onClear &&
          value !== "" && (
            <InputAdornment
              position="end"
              sx={{ position: "absolute", right: 28 }}
            >
              <IconButton onClick={onClear} size="small">
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </InputAdornment>
          )
        }
      >
        {Object.entries(options).map(([key, val]) => (
          <MenuItem key={key} value={val as string}>
            {key}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
