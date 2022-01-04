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

      {view === "form" ? (
        <Main>
          <h1 className={styles.title}>Death Clock ☠️</h1>
          <InputForm
            lifeExpectancy={lifeExpectancy}
            setLifeExpectancy={setLifeExpectancy}
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            viewGrid={() => setView("grid")}
          />
        </Main>
      ) : null}

      {view === "grid" ? (
        <Main>
          <h1 className={styles.title}>Death Clock ☠️</h1>

          <YearGrid
            lifeExpectancy={lifeExpectancy}
            dateOfBirth={dateOfBirth}
            editData={() => setView("form")}
          />
        </Main>
      ) : null}

      <footer className={styles.footer}>
        <a
          href="https://paulmcbride.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by Paul McBride
        </a>
      </footer>
    </div>
  );
}
