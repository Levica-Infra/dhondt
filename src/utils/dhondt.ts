export const distributeSeats = (votes: number[], seats: number) =>
  votes
    .map((vote, partyIdx) =>
      new Array(seats)
        .fill(0)
        .map((_, idx) => ({ quotient: vote / (idx + 1), partyIdx }))
    )
    .flat()
    .flat()
    .sort((a, b) => b.quotient - a.quotient)
    .slice(0, seats)
    .reduce((acc, elem) => {
      acc[elem.partyIdx]++;
      return acc;
    }, new Array(votes.length).fill(0) as number[]);

export const calcTotalSeatsPerParty = (finalSeats: number[][]) => {
  if (!finalSeats.length) return [];
  const totalSeats: number[] = new Array(finalSeats[0].length).fill(0);
  finalSeats.forEach((electoralUnitSeats) => {
    electoralUnitSeats.forEach((partySeats, partyIdx) => {
      totalSeats[partyIdx] += partySeats;
    });
  });
  return totalSeats;
};
