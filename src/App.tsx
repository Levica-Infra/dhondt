import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField, Typography } from "@mui/material";
import { memo, useState } from "react";
import { ElectoralUnit } from "./components/electoralUnit";
import { INITIAL_NUM_ELECTORAL_UNITS } from "./constants/electoralUnits";
import { INITIAL_PARTIES } from "./constants/parties";
import { StyledTd, StyledTh, StyledTr } from "./styled/tables";
import { calcTotalSeatsPerParty, distributeSeats } from "./utils/dhondt";

const MemoElectoralUnit = memo(ElectoralUnit);

function App() {
  const [parties, setParties] = useState<string[]>([...INITIAL_PARTIES]);
  const [electoralUnitsSeats, setElectoralUnitsSeats] = useState<number[]>(
    new Array(INITIAL_NUM_ELECTORAL_UNITS).fill(20)
  );
  const [votes, setVotes] = useState<number[][]>(
    new Array(INITIAL_NUM_ELECTORAL_UNITS).fill(
      new Array(INITIAL_PARTIES.length).fill(0)
    )
  );
  const finalSeats = votes.map((electoralUnitVotes, idx) =>
    distributeSeats(electoralUnitVotes, electoralUnitsSeats[idx])
  );
  const totalSeatsPerParty = calcTotalSeatsPerParty(finalSeats);
  return (
    <>
      <Typography variant="h3">Гласови</Typography>
      <br />
      <table>
        <StyledTr>
          <th>&nbsp;</th>
          {parties.map((party, idx) => (
            <StyledTh>
              <Typography key={idx} variant="overline">
                {party}
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Typography>
            </StyledTh>
          ))}
          <StyledTh>
            <TextField
              size="small"
              label="Партија"
              style={{ width: "150px" }}
            />

            <IconButton color="success">
              <AddIcon />
            </IconButton>
          </StyledTh>
        </StyledTr>
        {votes.map((_, idx) => (
          <StyledTr>
            <MemoElectoralUnit
              key={idx}
              idx={idx}
              numParties={parties.length}
              setVotes={setVotes}
            />
            {!idx && <td rowSpan={votes.length}>&nbsp;</td>}
          </StyledTr>
        ))}
        <StyledTr>
          <StyledTd>
            <TextField
              size="small"
              label="Мандати"
              type="number"
              defaultValue={0}
              style={{ width: "150px" }}
            />
            <IconButton color="success">
              <AddIcon />
            </IconButton>
          </StyledTd>
          <td colSpan={parties.length}>&nbsp;</td>
        </StyledTr>
      </table>
      <br />
      <Typography variant="h3">Освоени мандати</Typography>
      <br />
      <table>
        <StyledTr>
          <th>&nbsp;</th>
          {parties.map((party, idx) => (
            <StyledTh>
              <Typography key={idx} variant="overline">
                {party}
              </Typography>
            </StyledTh>
          ))}
        </StyledTr>
        {finalSeats.map((electoralUnitFinalSeats, electoralUnitIdx) => (
          <StyledTr>
            <StyledTd>
              <Typography variant="overline">
                Изборна единица {electoralUnitIdx + 1}
              </Typography>
            </StyledTd>
            {electoralUnitFinalSeats.map((seats, idx) => (
              <StyledTd>
                <Typography key={idx} variant="overline">
                  {seats}
                </Typography>
              </StyledTd>
            ))}
          </StyledTr>
        ))}
        <StyledTr>
          <StyledTd>
            <Typography variant="overline" fontWeight={"bold"}>
              Вкупно
            </Typography>
          </StyledTd>
          {totalSeatsPerParty.map((totalSeats) => (
            <StyledTd>
              <Typography variant="overline" fontWeight={"bold"}>
                {totalSeats}
              </Typography>
            </StyledTd>
          ))}
        </StyledTr>
      </table>
    </>
  );
}

export default App;
