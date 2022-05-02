import { TextField } from "@mui/material";
import { FC, memo, useCallback } from "react";
import { StyledTd } from "../styled/tables";
import { ElectoralUnitHeader } from "./electoralUnitHeader";

const MemoElectoralUnitHeader = memo(ElectoralUnitHeader);

interface ElectoralUnitProps {
  idx: number;
  seats: number;
  numParties: number;
  setVotes: React.Dispatch<React.SetStateAction<number[][]>>;
  setElectoralUnitsSeats: React.Dispatch<React.SetStateAction<number[]>>;
}

export const ElectoralUnit: FC<ElectoralUnitProps> = ({
  idx,
  seats,
  numParties,
  setVotes,
  setElectoralUnitsSeats,
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
        <MemoElectoralUnitHeader
          seats={seats}
          idx={idx}
          setVotes={setVotes}
          setElectoralUnitsSeats={setElectoralUnitsSeats}
        />
      </StyledTd>
      {new Array(numParties).fill(0).map((_, idx) => (
        <StyledTd key={idx}>
          <TextField
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
