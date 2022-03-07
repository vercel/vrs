import Head from "next/head";
import { Motion, spring } from "react-motion";
import { useRouter } from "next/router";

import Nav from "./Nav";
import SliderWave from "./SliderWave";
import ScrollIcon from "./ScrollIcon";

import "tachyons/css/tachyons.min.css";
import "smooth-scrollbar/dist/smooth-scrollbar.css";

export default function Layout({ children, title = "VRS" }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav />
      <Motion defaultStyle={{ o: 0 }} style={{ o: spring(1) }}>
        {style => (
          <div style={{ opacity: style.o }} key="motion-content">
            {router.route === "/" && (
              <div
                className="slider-item slider-item-bg fixed"
                key="slider-bg"
              >
                <SliderWave />
                <ScrollIcon key="scroll-icon" />
              </div>
            )}
            <div className="container" data-scrollbar key="container">
              {children}
            </div>
          </div>
        )}
      </Motion>
    </div>
  );
}