import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import YearGrid from "../components/YearGrid";
import { calculateLifeRemaining } from "../components/CountDown";
import { ShareIcon } from "@heroicons/react/solid";
import { ToastContainer, toast } from "react-toastify";
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

const Button = styled.button`
  background-color: #ffe074;
  display: flex;
  justify-content: space-between;
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

  function shareClicked() {
    const lifeRemaining = calculateLifeRemaining(
      dateOfBirth,
      parseInt(lifeExpectancy)
    );

    const emojisRemaining = 25 - Math.round(parseFloat(lifeRemaining) / 4);

    let output = "";

    for (let i = 0; i < 25; i++) {
      output += emojisRemaining <= i ? "⚪️" : "🔘";
      if (i % 5 === 4) {
        output += "\n";
      }
    }

    output += "\n";
    output += `I have ${lifeRemaining}% left`;
    output += "\n";
    output += "https://thedeathclock.co";

    navigator.clipboard.writeText(output);
    toast("Copied to clipboard");
  }

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
        <Button
          className="inline-flex items-center px-4 py-3 border border-transparent text-lg leading-4 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 text-black focus:ring-yellow-500 w-60 mt-8"
          onClick={() => shareClicked()}
        >
          Share Result
          <ShareIcon className="w-6" />
        </Button>
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
