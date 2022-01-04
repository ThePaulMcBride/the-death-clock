import Head from "next/head";
import Image from "next/image";
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

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Death Clock</title>
        <meta name="description" content="Life is short" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <h1 className={styles.title}>Death Clock ☠️</h1>

        <YearGrid />
      </Main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
