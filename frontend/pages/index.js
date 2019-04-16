/**
 * Created by shu on 7/5/2017.
 */

import { useEffect } from "react";
import Layout from "../components/Layout";
import Slider from "../components/Slider";

export default function Index() {
  useEffect(() => {
    console.log("vrs booted");
    document.cookie =
      'user-from-github={"username":"coetry","avatar_url":"https://avatars3.githubusercontent.com/u/10926503?v=4"}';
  }, []);
  return (
    <Layout>
      <section>
        <Slider />
      </section>
    </Layout>
  );
}
