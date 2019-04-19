import Link from "next/link";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import fetch from "isomorphic-unfetch";

const MODEL_NUM = 16;

function Store({ products }) {
  return (
    <Layout>
      <article className="pt5 bg-black white ph3">
        <a className="link white tc">
          <p>
            <i className="material-icons md-48 v-top">store</i>
          </p>
          <h1 className="tc f3 mb4">Model Store</h1>
        </a>
        <h2 className="f4 fw4 pa3 mv0 tc">
          <i className="material-icons red">whatshot</i>
        </h2>
        <div className="cf pa2">
          {// how about adding some placeholders here
          Array(MODEL_NUM)
            .fill(0)
            .map((_, i) => (
              <div className="fl w-100 w-50-m w-25-l pa2" key={i}>
                <Link href={`/edit?id=${i + 1}`}>
                  <a className="db link dim tc white">
                    <img
                      src={`/static/models/${i + 1}/thumbnail@m.jpg`}
                      alt="Lorem"
                      className="w-100 db outline black-10"
                    />
                    <dl className="mt2 f6 lh-copy">
                      <dt className="clip">Name</dt>
                      <dd className="ml0 white truncate w-100">
                        {products[i].name}
                      </dd>
                      <dt className="clip">Description</dt>
                      <dd className="ml0 gray truncate w-100">
                        {products[i].description}
                      </dd>
                    </dl>
                  </a>
                </Link>
              </div>
            ))}
        </div>
      </article>
      <Footer />
    </Layout>
  );
}

Store.getInitialProps = async function getInitialProps({ req }) {
  /*
  let URL = "/api/get-products";
  if (req) {
    const proto = req.headers.referer.includes("https") ? "https" : "http";
    const host = req.headers.host;
    URL = `${proto}://${host}${URL}`;
  }
  try {
    const response = await fetch(URL);
    const { docs: products } = await response.json();
    return { products };
  } catch (e) {
    console.error(e.message);
    return { products: [] };
  }
  */
  return {
    products: [
      {
        name: "Charzard",
        description: "A friendly fire lizard Pokemon",
        price: 99
      },
      {
        name: "Bulbasaur",
        description: "A loving dinosaur Pokemon",
        price: 99
      },
      {
        name: "Moltres",
        description: "A legendary fire bird Pokemon",
        price: 99
      },
      { name: "Sonic", description: "A fast blue hedgehog", price: 99 },
      { name: "iPhone 5", description: "A smartphone from Apple", price: 99 },
      {
        name: "NASA Rocket",
        description: "Transportation to space",
        price: 99
      },
      {
        name: "Tai Kamiya",
        description: "The legendary Digimon trainer",
        price: 99
      },
      {
        name: "Hatsune Miku",
        description: "The first sound from the future",
        price: 99
      },
      {
        name: "Sony Cybershot",
        description: "A 16 MP Digital Camera",
        price: 99
      },
      {
        name: "Room w/ Ball",
        description: "A colorful room w/ light ball",
        price: 99
      },
      {
        name: "Water Sniper",
        description: "A powerful water gun",
        price: 99
      },
      {
        name: "Mario",
        description: "Adventurous Italian plumber",
        price: 99
      },
      { name: "Iron Man", description: "A Tony Stark invention", price: 99 },
      { name: "Headphones", description: "HD wireless headphones", price: 99 },
      {
        name: "Blue Chair",
        description: "Ergonomic chair w/ wheels",
        price: 99
      },
      { name: "White Chair", description: "Comfortable desk chair", price: 99 }
    ]
  };
};

export default Store;
