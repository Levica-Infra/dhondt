import { FC, memo, useCallback } from "react";
import { StyledTd } from "../styled/tables";
import { ElectoralUnitHeader } from "./electoralUnitHeader";
import { SimpleTextField } from "./simpleTextField";

const MemoSimpleTextField = memo(SimpleTextField);

interface ElectoralUnitProps {
  idx: number;
  seats: number;
  numParties: number;
  votes: number[][];
  setVotes: React.Dispatch<React.SetStateAction<number[][]>>;
  setElectoralUnitsSeats: React.Dispatch<React.SetStateAction<number[]>>;
}

export const ElectoralUnit: FC<ElectoralUnitProps> = ({
  idx,
  seats,
  numParties,
  votes,
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
        <ElectoralUnitHeader
          seats={seats}
          idx={idx}
          setVotes={setVotes}
          setElectoralUnitsSeats={setElectoralUnitsSeats}
        />
      </StyledTd>
      {new Array(numParties).fill(0).map((_, partyIdx) => (
        <StyledTd key={partyIdx}>
          <MemoSimpleTextField
            isNumber={true}
            value={votes[idx][partyIdx]}
            onChange={handleChangeVotes}
            label="Гласови"
            id={partyIdx}
          />
        </StyledTd>
      ))}
    </>
  );
};
