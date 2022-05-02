import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton, Typography } from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import { SimpleTextField } from "./simpleTextField";

const MemoSimpleTextField = memo(SimpleTextField);

interface PartyHeaderProps {
  party: string;
  idx: number;
  setParties: React.Dispatch<React.SetStateAction<string[]>>;
  setVotes: React.Dispatch<React.SetStateAction<number[][]>>;
}

export const PartyHeader: FC<PartyHeaderProps> = ({
  party,
  idx,
  setParties,
  setVotes,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [partyName, setPartyName] = useState<string>(party);

  const deleteParty = (idx: number) => () => {
    setParties((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
    setVotes((prev) =>
      prev.map((electoralUnitVotes) => [
        ...electoralUnitVotes.slice(0, idx),
        ...electoralUnitVotes.slice(idx + 1),
      ])
    );
  };

  const toggleEditMode = () => {
    setPartyName(party);
    setEditMode((prev) => !prev);
  };

  const editPartyName = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setPartyName(evt.target.value);
    },
    []
  );

  const savePartyName = () => {
    setParties((prev) => [
      ...prev.slice(0, idx),
      partyName,
      ...prev.slice(idx + 1),
    ]);
    setEditMode(false);
  };

  return editMode ? (
    <span>
      <MemoSimpleTextField
        label="Партија"
        isNumber={false}
        onChange={editPartyName}
        value={partyName}
      />
      <IconButton color="success" onClick={savePartyName}>
        <SaveIcon />
      </IconButton>
      <IconButton color="warning" onClick={toggleEditMode}>
        <CancelIcon />
      </IconButton>
    </span>
  ) : (
    <Typography variant="overline">
      {party}
      <IconButton onClick={toggleEditMode}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={deleteParty(idx)}>
        <DeleteIcon />
      </IconButton>
    </Typography>
  );
};
