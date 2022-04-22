import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import { SimpleTextField } from "./simpleTextField";

interface NewPartyProps {
  setParties: React.Dispatch<React.SetStateAction<string[]>>;
  setVotes: React.Dispatch<React.SetStateAction<number[][]>>;
}

const MemoTextField = memo(SimpleTextField);

export const NewParty: FC<NewPartyProps> = ({ setParties, setVotes }) => {
  const [partyName, setPartyName] = useState<string>("");
  const editPartyName = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setPartyName(evt.target.value);
    },
    []
  );

  const addNewParty = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setParties((prev) => [...prev, partyName]);
    setVotes((prev) =>
      prev.map((electoralUnitVotes) => [...electoralUnitVotes, 0])
    );
  };

  return (
    <>
      <MemoTextField
        label="Партија"
        isNumber={false}
        onChange={editPartyName}
      />
      <IconButton
        color="success"
        disabled={!partyName.length}
        onClick={addNewParty}
      >
        <AddIcon />
      </IconButton>
    </>
  );
};
