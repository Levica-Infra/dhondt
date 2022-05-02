import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import { INITIAL_NUM_ELECTORAL_UNIT_SEATS } from "../constants/electoralUnits";
import { SimpleTextField } from "./simpleTextField";

interface NewElectoralUnitProps {
  setElectoralUnitSeats: React.Dispatch<React.SetStateAction<number[]>>;
  setVotes: React.Dispatch<React.SetStateAction<number[][]>>;
}

const MemoTextField = memo(SimpleTextField);

export const NewElectoralUnit: FC<NewElectoralUnitProps> = ({
  setElectoralUnitSeats,
  setVotes,
}) => {
  const [newElectoralUnitSeats, setNewElectoralUnitSeats] = useState<number>(
    INITIAL_NUM_ELECTORAL_UNIT_SEATS
  );
  const editNewElectoralUnitSeats = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setNewElectoralUnitSeats(
        evt.target.value.length ? parseInt(evt.target.value, 10) : 0
      );
    },
    []
  );

  const addNewElectoralUnit = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setElectoralUnitSeats((prev) => [...prev, newElectoralUnitSeats]);
    setVotes((prev) => [...prev, prev[0].map((_) => 0)]);
  };

  return (
    <>
      <MemoTextField
        label="Мандати"
        isNumber={true}
        onChange={editNewElectoralUnitSeats}
        value={newElectoralUnitSeats}
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
