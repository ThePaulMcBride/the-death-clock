import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import YearGrid from "../components/YearGrid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .Toastify__close-button {
    display: none;
  }
`;

const Logo = styled.img`
  margin-bottom: 2rem;
  display: block;
  width: 330px;
`;

const initialLifeExpectancy = "80";
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
    (router.query.life_expectancy as string) || initialLifeExpectancy;

  const dateOfBirth = (router.query.dob as string) || initialDob;

  return (
    <div className={styles.container}>
      <Head>
        <title>Death Clock</title>
        <meta name="description" content="Life is short" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main key="form">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
        <a href="https://paulmcbride.com">
          <span>A stoic reminder by</span> Paul McBride
        </a>
      </footer>
    </div>
  );
}
