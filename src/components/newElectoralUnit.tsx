import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import {
  INITIAL_NUM_ELECTORAL_UNIT_SEATS,
  INITIAL_THRESHOLD,
} from "../constants/electoralUnits";
import { SimpleTextField } from "./simpleTextField";

interface NewElectoralUnitProps {
  setElectoralUnitsSeats: React.Dispatch<React.SetStateAction<number[]>>;
  setElectoralUnitsThresholds: React.Dispatch<React.SetStateAction<number[]>>;
  setVotes: React.Dispatch<React.SetStateAction<number[][]>>;
}

const MemoTextField = memo(SimpleTextField);

export const NewElectoralUnit: FC<NewElectoralUnitProps> = ({
  setElectoralUnitsSeats,
  setElectoralUnitsThresholds,
  setVotes,
}) => {
  const [newElectoralUnitSeats, setNewElectoralUnitSeats] = useState<number>(
    INITIAL_NUM_ELECTORAL_UNIT_SEATS
  );
  const [newElectoralUnitThreshold, setNewElectoralUnitThreshold] =
    useState<number>(INITIAL_THRESHOLD);

  const editNewElectoralUnitSeats = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setNewElectoralUnitSeats(
        evt.target.value.length ? parseInt(evt.target.value, 10) : 0
      );
    },
    []
  );

  const editNewElectoralUnitThreshold = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setNewElectoralUnitThreshold(
        evt.target.value.length ? parseInt(evt.target.value, 10) : 0
      );
    },
    []
  );

  const addNewElectoralUnit = () => {
    setElectoralUnitsSeats((prev) => [...prev, newElectoralUnitSeats]);
    setElectoralUnitsThresholds((prev) => [...prev, newElectoralUnitThreshold]);
    setVotes((prev) => [...prev, prev[0].map((_) => 0)]);
  };

  return (
    <>
      <MemoTextField
        label="Мандати"
        isNumber={true}
        onChange={editNewElectoralUnitSeats}
        value={newElectoralUnitSeats}
        maxValue={1000}
      />
      <MemoTextField
        label="Праг (%)"
        isNumber={true}
        onChange={editNewElectoralUnitThreshold}
        value={newElectoralUnitThreshold}
        maxValue={100}
      />
      <IconButton
        color="success"
        disabled={newElectoralUnitSeats <= 0}
        onClick={addNewElectoralUnit}
      >
        <AddIcon />
      </IconButton>
    </>
  );
};
