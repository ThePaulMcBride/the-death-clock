import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            defer
            data-domain="thedeathclock.co"
            src="https://plausible.io/js/plausible.js"
          ></script>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Condensed&display=optional"
            rel="stylesheet"
          />
          <meta
            property="og:logo"
            content={`https://thedeathclock.co/deathclock-cover.png`}
          />
          <meta key="og:type" property="og:type" content="website" />
          <meta
            key="og:description"
            property="og:description"
            content="Life is short"
          />
          <meta
            key="og:image"
            property="og:image"
            content={`https://thedeathclock.co/deathclock-cover.png`}
          />
          <meta key="og:image:width" property="og:image:width" content="1200" />
          <meta key="og:image:width" property="og:image:height" content="627" />
          <meta
            key="twitter:card"
            name="twitter:card"
            content="summary_large_image"
          />
          <meta
            key="twitter:creator"
            name="twitter:creator"
            content="@ThePaulMcBride"
          />
          <meta
            key="twitter:image"
            name="twitter:image"
            content={`https://thedeathclock.co/deathclock-cover.png`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
