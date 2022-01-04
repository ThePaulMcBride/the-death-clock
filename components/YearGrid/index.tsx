import { useState, memo } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  .react-datepicker-wrapper {
    width: auto;
  }
`;

const InputGroup = styled.div`
  width: 100%;
  justify-content: space-between;
  margin: 0 auto 1rem;
  max-width: 900px;

  label {
    display: flex;
    margin-bottom: 1rem;

    span {
      margin-right: 6px;
    }
  }

  @media (min-width: 950px) {
    display: flex;
    margin: 0 auto 2rem;
  }
`;

const Week = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  border: 1px solid #000;

  @media (min-width: 650px) {
    width: 6px;
    height: 6px;
  }

  @media (min-width: 950px) {
    width: 10px;
    height: 10px;
    border-width: 2px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(52, 1fr);
  gap: 2px;

  @media (min-width: 650px) {
    gap: 4px;
  }

  @media (min-width: 950px) {
    gap: 6px;
  }

  ${Week}:nth-child(-n+${(props) => props.limit}) {
    background-color: black;
  }
`;

const initialLifeExpentancy = 80;

function diffInWeeks(dt2, dt1) {
  if (!dt2 || !dt1) return 0;
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7;
  return Math.abs(Math.round(diff));
}

export default function YearGrid() {
  const [lifeExpectancy, setLifeExpectancy] = useState(initialLifeExpentancy);
  const [dateOfBirth, setDateOfBirth] = useState(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return new Date(new Date().setFullYear(currentYear - 30));
  });

  const currentDate = new Date();

  const weeksOld = diffInWeeks(currentDate, dateOfBirth);
  const months = lifeExpectancy * 12;
  const weeks = lifeExpectancy * 52;

  return (
    <Container>
      <InputGroup>
        <label>
          <span>Life Expectancy: ({lifeExpectancy} years)</span>
          <input
            type="range"
            value={lifeExpectancy}
            onChange={(e) => setLifeExpectancy(parseInt(e.target.value))}
          />
        </label>

        <label>
          <span>Date of birth:</span>
          <DatePicker
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="dd/MMM/yyyy"
          />
        </label>
      </InputGroup>

      <Grid limit={weeksOld}>
        {Array.from({ length: weeks }, (_, index) => (
          <Week key={index} />
        ))}
      </Grid>
    </Container>
  );
}
