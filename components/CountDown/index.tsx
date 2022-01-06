import { useState, useEffect, useRef } from "react";
import { add, differenceInSeconds } from "date-fns";
import styled from "styled-components";
import { useAnimationFrame } from "framer-motion";

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

function calculateLifeRemaining(
  inputDateOfBirth: string,
  lifeExpectancy: number
) {
  const dateOfBirth = new Date(inputDateOfBirth);
  const currentDate = new Date();
  const dateOfDeath = add(dateOfBirth, { years: lifeExpectancy });

  const lifeUsed = differenceInSeconds(currentDate, dateOfBirth);
  const totalLife = differenceInSeconds(dateOfDeath, dateOfBirth);
  const percentage = (lifeUsed / totalLife) * 100;
  return (100 - percentage).toFixed(8);
}

export default function CountDown(props: Props) {
  const sizeOfUpdateRef = useRef(0);
  const [animationState, setAnimationState] = useState("initial");
  const [lifeRemaining, setLifeRemaining] = useState("100");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationState("ticking");
    }, 10000);

    return () => clearTimeout(timeout);
  }, [setAnimationState]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (animationState !== "ticking") return;
      const remainingLife = calculateLifeRemaining(
        props.dateOfBirth,
        props.lifeExpectancy
      );
      setLifeRemaining(remainingLife);
    }, 1000);

    return () => clearInterval(interval);
  }, [
    setLifeRemaining,
    props.dateOfBirth,
    props.lifeExpectancy,
    animationState,
  ]);

  useEffect(() => {
    const remainingLife = calculateLifeRemaining(
      props.dateOfBirth,
      props.lifeExpectancy
    );

    const difference = 100 - parseFloat(remainingLife);
    const numberOfUpdates = 2000 / 16;
    sizeOfUpdateRef.current = difference / numberOfUpdates;
  }, [props.dateOfBirth, props.lifeExpectancy]);

  useAnimationFrame(() => {
    if (animationState === "ticking") return;

    const sizeOfUpdate = sizeOfUpdateRef.current;

    const expectedRemainingLife = calculateLifeRemaining(
      props.dateOfBirth,
      props.lifeExpectancy
    );

    setLifeRemaining((lifeRemaining) => {
      const update = parseFloat(lifeRemaining) - sizeOfUpdate;
      if (update > parseFloat(expectedRemainingLife)) return update.toFixed(8);
      return expectedRemainingLife;
    });
  });

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
