import Layout from '../components/Layout';
import Footer from '../components/Footer';

export default function About() {
  return (
    <Layout>
      <main className="pv3 pv5-ns vh-100 white dt mw8 center">
        <div className="items-center">
          <p className="lh-copy">
            VRS is a fully-functional e-commerce store, built on the serverless
            paradigm.
            <br />
            <br />
            With a single command `npx vercel`, the store deploys instantly,
            scales automatically, and requires zero supervision. The underlying
            infrastructure can handle peak time traffic with consistent fast
            performance.
          </p>
          <p className="lh-copy" />
          <p className="lh-copy">
            The source-code for VRS is open-sourced on{' '}
            <a
              className="link dim white underline"
              href="https://github.com/vercel/vrs"
            >
              GitHub
            </a>
            .<br />
            You can deploy VRS to Vercel's scalable serverless infrastructure{' '}
            <strong>for free</strong>.
            <br />
          </p>
          <p className="lh-copy">
            Once you have the{' '}
            <a
              className="link dim white underline"
              href="https://vercel.com/cli"
            >
              Vercel CLI
            </a>{' '}
            installed, clone the{' '}
            <a
              className="link dim white underline"
              href="https://github.com/vercel/vrs"
            >
              VRS repo
            </a>
            , add the necessary{' '}
            <a
              className="link dim white underline"
              href="https://vercel.com/docs/concepts/projects/environment-variables"
            >
              environment variables
            </a>{' '}
            with the Vercel CLI, and run `npx vercel` — that’s it.
          </p>
          <p className="lh-copy">
            The 3D models used are freely licensed through{' '}
            <a
              className="link white underline dim"
              href="https://clara.io/legal/content-guidelines"
            >
              Clara
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
