import Layout from "../../components/Layout";
import Editor from "../../components/Editor";
import { fetchData } from "../../utils/fetchData";

function Model({ details }) {
  return (
    <Layout>
      <Editor details={details} />;
    </Layout>
  );
}

export async function getStaticProps(props) {
  const details = await fetchData(props.params.id);

  return {
    props: {
      details
    },
  };
};

export async function getStaticPaths() {
  const docs = await fetchData();

  return {
    paths: docs.map(doc => ({
      params: { id: `${doc.id}` }
    })),
    fallback: false
  }
}

export default Model;
