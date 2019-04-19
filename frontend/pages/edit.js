/**
 * Created by shu on 10/5/2017.
 */

import Layout from "../components/Layout";
import Editor from "../components/Editor";

// 10, 11, 12, 18, 1, 2, 4, 5, 7

function Edit({ details }) {
  return (
    <Layout>
      <Editor details={details} />
    </Layout>
  );
}

Edit.getInitialProps = async function({ query }) {
  return {
    details: {
      id: query.id || "12",
      name: query.name || "Product",
      description: query.description || "Description",
      price: query.price || 99
    }
  };
};

export default Edit;
