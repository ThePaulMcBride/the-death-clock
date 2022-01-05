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
    transition: background-color 0.5s ease-in;
  }

  /* ${Week}:nth-child(${(props) => props.limit}) {
    border-color: red;
    transition: all 0.5s ease-in;
  } */
`;

const SettingsButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;

  svg {
    color: #333333;
    width: 20px;
    margin-right: 5px;
  }
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

      <SettingsButton onClick={props.editData}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
        Settings
      </SettingsButton>
    </Container>
  );
}
