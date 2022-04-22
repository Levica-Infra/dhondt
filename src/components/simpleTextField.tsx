import { TextField } from "@mui/material";
import { FC } from "react";

interface SimpleTextFieldProps {
  label: string;
  isNumber: boolean;
  onChange: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

export const SimpleTextField: FC<SimpleTextFieldProps> = ({
  label,
  isNumber,
  onChange,
}) => {
  return (
    <TextField
      size="small"
      label={label}
      type={isNumber ? "number" : "text"}
      style={{ width: "150px" }}
      onChange={onChange}
    />
  );
};
