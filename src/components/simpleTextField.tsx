import { TextField } from "@mui/material";
import { FC, useCallback } from "react";

interface SimpleTextFieldProps {
  label: string;
  isNumber: boolean;
  onChange: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  value: number | string;
  id?: number | string;
  maxValue?: number;
}

export const SimpleTextField: FC<SimpleTextFieldProps> = ({
  label,
  isNumber,
  onChange,
  value,
  id,
  maxValue,
}) => {
  const onChangeWrapper = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (maxValue !== undefined) {
        evt.target.value = String(
          Math.min(parseInt(evt.target.value, 10), maxValue)
        );
      }
      onChange(evt);
    },
    [onChange, maxValue]
  );

  return (
    <TextField
      id={id !== undefined ? String(id) : undefined}
      size="small"
      label={label}
      type={isNumber ? "number" : "text"}
      InputProps={maxValue ? { inputProps: { min: 0, max: maxValue } } : {}}
      value={value}
      style={{ width: "150px" }}
      onChange={onChangeWrapper}
    />
  );
};
