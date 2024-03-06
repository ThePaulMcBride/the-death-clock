import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4137859431738623"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
