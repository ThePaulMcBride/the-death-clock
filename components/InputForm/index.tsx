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
  background-color: #222222;
  padding: 2rem;

  label {
    display: flex;
    margin-bottom: 1rem;

    span {
      margin-right: 6px;
    }
  }
`;

interface Props {
  lifeExpectancy: number;
  setLifeExpectancy: (value: number) => void;
  dateOfBirth: string;
  setDateOfBirth: (value: string) => void;
  viewGrid: () => void;
}

export default function InputForm(props: Props) {
  const {
    lifeExpectancy,
    setLifeExpectancy,
    dateOfBirth,
    setDateOfBirth,
    viewGrid,
  } = props;

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
            selected={new Date(dateOfBirth)}
            onChange={(date) => setDateOfBirth(date.toString())}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="dd/MMM/yyyy"
            // inline
          />
        </label>
        <button onClick={viewGrid}>Next</button>
      </InputGroup>
    </Container>
  );
}
