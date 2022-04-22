import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TextField, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { StyledTd } from "../styled/tables";

interface ElectoralUnitProps {
  idx: number;
  seats: number;
  numParties: number;
  setVotes: React.Dispatch<React.SetStateAction<number[][]>>;
}

export const ElectoralUnit: FC<ElectoralUnitProps> = ({
  idx,
  seats,
  numParties,
  setVotes,
}) => {
  const handleChangeVotes = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setVotes((votes) => {
        const newVotes = [...votes];
        newVotes[idx] = [...votes[idx]];
        newVotes[idx][parseInt(evt.target.id, 10)] = parseInt(
          evt.target.value,
          10
        );
        return newVotes;
      });
    },
    [idx, setVotes]
  );

  return (
    <>
      <StyledTd>
        <Typography variant="overline">
          Изборна единица {idx + 1} ({seats} мандати)
        </Typography>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </StyledTd>
      {new Array(numParties).fill(0).map((_, idx) => (
        <StyledTd>
          <TextField
            key={idx}
            id={idx.toString()}
            type="number"
            defaultValue={0}
            size="small"
            onChange={handleChangeVotes}
            label="Гласови"
            style={{ width: "150px" }}
          />
        </StyledTd>
      ))}
    </>
  );
};
