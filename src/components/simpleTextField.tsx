import { TextField } from "@mui/material";
import { FC } from "react";

interface SimpleTextFieldProps {
  label: string;
  isNumber: boolean;
  onChange: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  defaultValue?: number;
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
      defaultValue={isNumber ? defaultValue : undefined}
      style={{ width: "150px" }}
      onChange={onChange}
    />
  );
};
