import styled from "styled-components";

const Container = styled.div``;

const Year = styled.div`
  display: flex;
`;

const Week = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 3px solid #000;
  margin: 6px;
`;

const lifeExpentancy = 80;
const years = new Array(lifeExpentancy).fill(0).map((_, i) => i + 1);
const weeks = new Array(52).fill(0).map((_, i) => i + 1);

export default function YearGrid() {
  return (
    <Container>
      {years.map((year, index) => {
        return (
          <Year key={index}>
            {weeks.map((week, index) => {
              return <Week key={index}></Week>;
            })}
          </Year>
        );
      })}
    </Container>
  );
}
