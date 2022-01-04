import { useState, memo } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div``;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const YearContainer = styled.div`
  display: flex;
`;

const Week = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 1px solid #000;
  margin: 2px;
  background-color: ${(props) => (props.fill ? "#000" : "#fff")};
`;

const initialLifeExpentancy = 80;
const age = 30;

function diffInWeeks(dt2, dt1) {
  if (!dt2 || !dt1) return 0;
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7;
  return Math.abs(Math.round(diff));
}

const Year = memo(function Year({ fill, weeks }) {
  const weekCount = Array.from({ length: 52 }, (_el, index) => index + 1);

  return (
    <YearContainer>
      {weekCount.map((week, index) => (
        <Week key={index} fill={fill || week <= weeks}></Week>
      ))}
    </YearContainer>
  );
});

export default function YearGrid() {
  const [lifeExpectancy, setLifeExpectancy] = useState(initialLifeExpentancy);
  const [dateOfBirth, setDateOfBirth] = useState(
    () => new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000 * 365)
  );

  const currentDate = new Date();

  const weeksOld = diffInWeeks(currentDate, dateOfBirth);
  const years = Array.from(
    { length: lifeExpectancy },
    (_el, index) => index + 1
  );
  const yearsOld = Math.floor(weeksOld / 52);
  const weeksLeft = weeksOld % 52;

  console.log(yearsOld, weeksLeft);

  return (
    <Container>
      <InputGroup>
        <label>
          Life Expectancy: ({lifeExpectancy} years)
          <input
            type="range"
            value={lifeExpectancy}
            onChange={(e) => setLifeExpectancy(e.target.value)}
          />
        </label>

        <label>
          Date of birth:
          <DatePicker
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
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
