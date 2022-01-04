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
  display: flex;
  justify-content: space-between;
  margin: 0 auto 2rem;
  max-width: 900px;

  label {
    display: flex;

    span {
      margin-right: 6px;
    }
  }
`;

const YearContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Week = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #000;
  margin: 2px;
  background-color: ${(props) => (props.$fill ? "#000" : "#fff")};
`;

const initialLifeExpentancy = "80";
const age = 30;

function diffInWeeks(dt2, dt1) {
  if (!dt2 || !dt1) return 0;
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7;
  return Math.abs(Math.round(diff));
}

interface YearProps {
  fill: boolean;
  weeks: number;
}

const Year = memo(function Year(props: YearProps) {
  const weekCount = Array.from({ length: 52 }, (_el, index) => index + 1);

  return (
    <YearContainer>
      {weekCount.map((week, index) => (
        <Week key={index} $fill={props.fill || week <= props.weeks}></Week>
      ))}
    </YearContainer>
  );
});

export default function YearGrid() {
  const [lifeExpectancy, setLifeExpectancy] = useState(initialLifeExpentancy);
  const [dateOfBirth, setDateOfBirth] = useState(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return new Date(new Date().setFullYear(currentYear - 30));
  });

  const currentDate = new Date();

  const weeksOld = diffInWeeks(currentDate, dateOfBirth);
  const years = Array.from(
    { length: parseInt(lifeExpectancy) },
    (_el, index) => index + 1
  );
  const yearsOld = Math.floor(weeksOld / 52);
  const weeksLeft = weeksOld % 52;

  return (
    <Container>
      <InputGroup>
        <label>
          <span>Life Expectancy: ({lifeExpectancy} years)</span>
          <input
            type="range"
            value={lifeExpectancy}
            onChange={(e) => setLifeExpectancy(e.target.value)}
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

      {years.map((year, index) => {
        const fill = yearsOld > year ? true : false;
        const weeks = yearsOld === year ? weeksLeft : 0;

        return <Year key={index} fill={fill} weeks={weeks} />;
      })}
    </Container>
  );
}
