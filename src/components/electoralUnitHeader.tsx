import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton, Typography } from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import { SimpleTextField } from "./simpleTextField";

const MemoSimpleTextField = memo(SimpleTextField);

interface ElectoralUnitHeaderProps {
  seats: number;
  threshold: number;
  idx: number;
  setVotes: React.Dispatch<React.SetStateAction<number[][]>>;
  setElectoralUnitsSeats: React.Dispatch<React.SetStateAction<number[]>>;
  setElectoralUnitsThresholds: React.Dispatch<React.SetStateAction<number[]>>;
}

export const ElectoralUnitHeader: FC<ElectoralUnitHeaderProps> = ({
  seats,
  threshold,
  idx,
  setVotes,
  setElectoralUnitsSeats,
  setElectoralUnitsThresholds,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [singleElectoralUnitSeats, setSingleElectoralUnitSeats] =
    useState<number>(seats);
  const [singleElectoralUnitThreshold, setSingleElectoralUnitThreshold] =
    useState<number>(threshold);

  const toggleEditMode = () => {
    setSingleElectoralUnitSeats(seats);
    setSingleElectoralUnitThreshold(threshold);
    setEditMode((prev) => !prev);
  };

  const editSingleElectoralUnitSeats = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSingleElectoralUnitSeats(parseInt(evt.target.value, 10));
    },
    []
  );

  const editSingleElectoralUnitThreshold = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSingleElectoralUnitThreshold(parseInt(evt.target.value, 10));
    },
    []
  );

  const deleteElectoralUnit = (idx: number) => () => {
    setElectoralUnitsSeats((prev) => [
      ...prev.slice(0, idx),
      ...prev.slice(idx + 1),
    ]);
    setElectoralUnitsThresholds((prev) => [
      ...prev.slice(0, idx),
      ...prev.slice(idx + 1),
    ]);
    setVotes((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
  };

  const saveSingleElectoralUnitSeats = () => {
    setElectoralUnitsSeats((prev) => [
      ...prev.slice(0, idx),
      singleElectoralUnitSeats,
      ...prev.slice(idx + 1),
    ]);
    setElectoralUnitsThresholds((prev) => [
      ...prev.slice(0, idx),
      singleElectoralUnitThreshold,
      ...prev.slice(idx + 1),
    ]);
    setEditMode(false);
  };

  return editMode ? (
    <span>
      <Typography variant="overline">
        Изборна единица {idx + 1}&nbsp;
      </Typography>
      <MemoSimpleTextField
        label="Мандати"
        isNumber={true}
        onChange={editSingleElectoralUnitSeats}
        value={singleElectoralUnitSeats}
      />
      <MemoSimpleTextField
        label="Праг (%)"
        isNumber={true}
        onChange={editSingleElectoralUnitThreshold}
        value={singleElectoralUnitThreshold}
      />
      <IconButton color="success" onClick={saveSingleElectoralUnitSeats}>
        <SaveIcon />
      </IconButton>
      <IconButton color="warning" onClick={toggleEditMode}>
        <CancelIcon />
      </IconButton>
    </span>
  ) : (
    <Typography variant="overline">
      Изборна единица {idx + 1} ({seats} мандати - {threshold}% праг)
      <IconButton onClick={toggleEditMode}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={deleteElectoralUnit(idx)}>
        <DeleteIcon />
      </IconButton>
    </Typography>
  );
};
