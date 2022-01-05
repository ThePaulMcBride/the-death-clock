import styled from "styled-components";
import { motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  .react-datepicker-wrapper {
    width: auto;
  }
`;

const Week = styled(motion.div)`
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

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(52, 1fr);
  gap: 2px;
  margin-bottom: 2rem;

  @media (min-width: 650px) {
    gap: 4px;
  }

  @media (min-width: 950px) {
    gap: 6px;
  }

  ${Week}:nth-child(-n+${(props) => props.limit}) {
    background-color: black;
    transition: all 0.5s ease-in;
  }

  /* ${Week}:nth-child(${(props) => props.limit}) {
    border-color: red;
    transition: all 0.5s ease-in;
  } */
`;

function diffInWeeks(dt2, dt1) {
  if (!dt2 || !dt1) return 0;
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7;
  return Math.abs(Math.round(diff));
}

interface Props {
  lifeExpectancy: number;
  dateOfBirth: string;
  editData: () => void;
}

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.005,
    },
  },
};

const item = {
  hidden: { backgroundColor: "transparent" },
  visible: {
    backgroundColor: "black",
  },
};

export default function YearGrid(props: Props) {
  const { lifeExpectancy, dateOfBirth } = props;

  const currentDate = new Date();

  const weeksOld = diffInWeeks(currentDate, new Date(dateOfBirth));
  const weeks = lifeExpectancy * 52;

  return (
    <Container>
      <Grid
        limit={weeksOld}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {Array.from({ length: weeks }, (_, index) => (
          <Week key={index} variants={index < weeksOld ? item : {}} />
        ))}
      </Grid>
      <button onClick={props.editData}>Edit data</button>
    </Container>
  );
}
