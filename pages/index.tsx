import Head from "next/head";
import dynamic from "next/dynamic";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import YearGrid from "../components/YearGrid";
import useLocalStorage from "@alexmarqs/react-use-local-storage";

const InputForm = dynamic(() => import("../components/InputForm"), {
  ssr: false,
});

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
`;

const initialLifeExpentancy = 80;
const initialDob = (() => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return new Date(new Date().setFullYear(currentYear - 30)).toString();
})();

export default function Home() {
  const [view, setView] = useLocalStorage("view", "form");
  const [lifeExpectancy, setLifeExpectancy] = useLocalStorage(
    "lifeExpectancy",
    initialLifeExpentancy
  );
  const [dateOfBirth, setDateOfBirth] = useLocalStorage(
    "dateOfBirth",
    initialDob
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Death Clock</title>
        <meta name="description" content="Life is short" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main key="form">
        <Logo src="logo.svg" />

        {view === "form" ? (
          <InputForm
            lifeExpectancy={lifeExpectancy}
            setLifeExpectancy={setLifeExpectancy}
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            viewGrid={() => setView("grid")}
          />
        ) : null}

        {view === "grid" ? (
          <YearGrid
            lifeExpectancy={lifeExpectancy}
            dateOfBirth={dateOfBirth}
            editData={() => setView("form")}
          />
        ) : null}
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
