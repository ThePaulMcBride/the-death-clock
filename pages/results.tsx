import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import YearGrid from "../components/YearGrid";

const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  margin-bottom: 2rem;
  display: block;
  width: 330px;
`;

const initialLifeExpentancy = "80";
const initialDob = (() => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return new Date(new Date().setFullYear(currentYear - 30))
    .toISOString()
    .substring(0, 10);
})();

export default function Home() {
  const router = useRouter();
  const lifeExpectancy =
    (router.query.life_expectancy as string) || initialLifeExpentancy;

  const dateOfBirth = (router.query.dob as string) || initialDob;

  return (
    <div className={styles.container}>
      <Head>
        <title>Death Clock</title>
        <meta name="description" content="Life is short" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main key="form">
        <Logo src="logo.svg" />

        <YearGrid
          lifeExpectancy={parseInt(lifeExpectancy)}
          dateOfBirth={dateOfBirth}
          editData={() =>
            router.push({
              pathname: "/",
              query: { life_expectancy: lifeExpectancy, dob: dateOfBirth },
            })
          }
        />
      </Main>

      <footer className={styles.footer}>
        <a
          href="https://paulmcbride.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>A stoic reminder by</span> Paul McBride
        </a>
      </footer>
    </div>
  );
}
