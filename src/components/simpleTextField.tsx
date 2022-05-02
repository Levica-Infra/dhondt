import { TextField } from "@mui/material";
import { FC } from "react";

interface SimpleTextFieldProps {
  label: string;
  isNumber: boolean;
  onChange: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  defaultValue?: number | string;
}

export const SimpleTextField: FC<SimpleTextFieldProps> = ({
  label,
  isNumber,
  onChange,
  defaultValue,
}) => {
  return (
    <TextField
      size="small"
      label={label}
      type={isNumber ? "number" : "text"}
      defaultValue={defaultValue}
      style={{ width: "150px" }}
      onChange={onChange}
    />
  );
};
