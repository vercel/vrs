import Document, { Html, Head, Main, NextScript } from "next/document";

class VRSDoc extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Space+Mono"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
          body {
            font-family: "Space Mono", monospace;
            text-rendering: optimizeLegibility;
            word-break: break-word;
            word-wrap: break-word;
            -webkit-tap-highlight-color: transparent;
            -webkit-font-smoothing: antialiased;
            font-variant-ligatures: none;
          }
          .material-icons.md-18 { font-size: 18px; }
          .material-icons.md-24 { font-size: 24px; }
          .material-icons.md-36 { font-size: 36px; }
          .material-icons.md-48 { font-size: 48px; }
        `
            }}
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/static/images/favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/static/images/favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/static/images/favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/static/images/favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/static/images/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/static/images/favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/static/images/favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/static/images/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/images/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/images/favicon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/images/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/static/images/favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/images/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/images/favicon/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/static/images/favicon/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />
          <script src="https://js.stripe.com/v3/" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default VRSDoc;
