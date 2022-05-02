import { TextField } from "@mui/material";
import { FC } from "react";

interface SimpleTextFieldProps {
  label: string;
  isNumber: boolean;
  onChange: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  value: number | string;
  id?: number | string;
}

export const SimpleTextField: FC<SimpleTextFieldProps> = ({
  label,
  isNumber,
  onChange,
  value,
  id,
}) => {
  return (
    <TextField
      id={id !== undefined ? String(id) : undefined}
      size="small"
      label={label}
      type={isNumber ? "number" : "text"}
      value={value}
      style={{ width: "150px" }}
      onChange={onChange}
    />
  );
};
