import Head from "next/head";
import { Motion, spring } from "react-motion";
import { useRouter } from "next/router";

import Nav from "./Nav";
import SliderWave from "./SliderWave";
import ScrollIcon from "./ScrollIcon";

import "tachyons/css/tachyons.min.css";
import "smooth-scrollbar/dist/smooth-scrollbar.css";

// include three.js
const THREE = require("three/build/three");
global.THREE = THREE;

// three.js polyfills...shit!
require("three/examples/js/Mirror");
require("three/examples/js/loaders/ColladaLoader2");
require("three/examples/js/renderers/Projector");
require("three/examples/js/renderers/CanvasRenderer");
require("three/examples/js/effects/VREffect");
require("three/examples/js/shaders/CopyShader");
require("three/examples/js/shaders/DotScreenShader");
require("three/examples/js/shaders/RGBShiftShader");
require("three/examples/js/shaders/EdgeShader2");
require("three/examples/js/shaders/FilmShader");
require("three/examples/js/shaders/VignetteShader");
require("three/examples/js/shaders/DigitalGlitch");
require("three/examples/js/shaders/ToneMapShader");
require("three/examples/js/shaders/BokehShader");
require("three/examples/js/shaders/BlendShader");
require("three/examples/js/shaders/ColorCorrectionShader");
require("three/examples/js/shaders/HorizontalBlurShader");
require("three/examples/js/shaders/VerticalBlurShader");
require("three/examples/js/shaders/BleachBypassShader");
require("three/examples/js/shaders/HorizontalTiltShiftShader");
require("three/examples/js/shaders/VerticalTiltShiftShader");
require("three/examples/js/shaders/FocusShader");
require("three/examples/js/shaders/LuminosityHighPassShader");
require("three/examples/js/shaders/FXAAShader");
require("three/examples/js/postprocessing/EffectComposer");
require("three/examples/js/postprocessing/RenderPass");
require("three/examples/js/postprocessing/MaskPass");
require("three/examples/js/postprocessing/ShaderPass");
require("three/examples/js/postprocessing/FilmPass");
require("three/examples/js/postprocessing/GlitchPass");
require("three/examples/js/postprocessing/DotScreenPass");
require("three/examples/js/postprocessing/BokehPass");
require("three/examples/js/postprocessing/OutlinePass");
require("three/examples/js/postprocessing/UnrealBloomPass");
require("three/examples/js/controls/OrbitControls");
require("three/examples/js/controls/DeviceOrientationControls");

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