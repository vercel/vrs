import { Component } from "react";
import Router from "next/router";
import Link from "next/link";
import Head from "next/head";

import Nav from "./Nav";

import tachyonsStyles from "tachyons/css/tachyons.min.css";
import layoutStyles from "../styles/layout.less";
import scrollBarStyles from "smooth-scrollbar/dist/smooth-scrollbar.css";

import SliderWave from "./SliderWave";
import ScrollIcon from "./ScrollIcon";
import { Motion, spring } from "react-motion";

export default class Layout extends Component {
  componentDidMount() {
    /*
    this.sbs = ScrollBar.initAll();
    if (window.scrollHandlers) {
      window.scrollHandlers.forEach(handler => {
        this.sbs[0].addListener(handler);
      });
    }
    */
    this.route = Router.router ? Router.router.pathname : "";
  }

  render() {
    let { children, title = "VRS" } = this.props;
    return (
      <div>
        <Head>
          <title>{title}</title>
          <style
            dangerouslySetInnerHTML={{
              __html: tachyonsStyles + scrollBarStyles + layoutStyles
            }}
          />
        </Head>
        <Nav
          clearCart={this.props.clearCart}
          cartState={this.props.cartState}
          incrementQuantity={this.props.incrementQuantity}
          decrementQuantity={this.props.decrementQuantity}
          removeFromCart={this.props.removeFromCart}
          toggleCartOpen={this.props.toggleCartOpen}
        />
        <Motion defaultStyle={{ o: 0 }} style={{ o: spring(1) }}>
          {style => (
            <div style={{ opacity: style.o }} key="motion-content">
              {this.route === "/" && (
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
}
