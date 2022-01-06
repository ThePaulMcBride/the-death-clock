import { useState, useEffect } from "react";
import { add, differenceInSeconds } from "date-fns";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

const LabelText = styled.span`
  color: #ffe074;
  display: block;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  letter-spacing: 1px;
  font-size: 1.5rem;
  font-weight: 300;
`;

const Percentage = styled.span`
  display: flex;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  letter-spacing: 1px;
  font-size: 3rem;
  font-weight: 700;
  position: relative;
  display: grid;
  grid-template: "container";
  place-items: center;
  place-content: center;

  > * {
    grid-area: container;
  }

  &::after {
    grid-area: container;
    content: "";
    width: 100%;
    height: 4px;
    background-color: black;
    transform: translateY(-1px);
  }
`;

interface Props {
  lifeExpectancy: number;
  dateOfBirth: string;
}

export default function CountDown(props: Props) {
  const [lifeRemaining, setLifeRemaining] = useState("");

  useEffect(() => {
    function calculateAndsetLifeRemaining() {
      const dateOfBirth = new Date(props.dateOfBirth);
      const currentDate = new Date();
      const dateOfDeath = add(dateOfBirth, { years: props.lifeExpectancy });

      const lifeUsed = differenceInSeconds(currentDate, dateOfBirth);
      const totalLife = differenceInSeconds(dateOfDeath, dateOfBirth);
      const percentage = (lifeUsed / totalLife) * 100;
      const remainingLife = 100 - percentage;
      setLifeRemaining(remainingLife.toFixed(8));
    }

    calculateAndsetLifeRemaining();

    const interval = setInterval(() => {
      calculateAndsetLifeRemaining();
    }, 1000);

    return () => clearInterval(interval);
  }, [setLifeRemaining, props.dateOfBirth, props.lifeExpectancy]);

  return (
    <Container>
      <LabelText>You have</LabelText>
      <Percentage>
        <span>{lifeRemaining || (100).toFixed(7)}%</span>
      </Percentage>
      <LabelText>of your expected lifespan remaining</LabelText>
    </Container>
  );
}
