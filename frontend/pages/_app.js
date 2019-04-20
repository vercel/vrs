import App, { Container } from "next/app";

class VRS extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  state = {
    cartItems: []
  };

  componentDidMount() {
    console.log("APP MOUNTED:", this.state.cartItems);
    const cart = this.loadFromLocalStorage("vrs:cart");
    if (cart) {
      const { items: cartItems } = cart;
      this.setState({ cartItems }, () => console.log(this.state.cartItems));
    }
  }

  addToCart = details => {
    console.log("adding to cart ...");
    console.log("PRODUCT DETAILS:", details);
    this.saveCart(details);
  };

  saveCart = details => {
    this.setState(
      ({ cartItems }) => ({
        cartItems: [...cartItems, { ...details }]
      }),
      () => {
        console.log(this.state.cartItems);
        this.saveToLocalStorage("vrs:cart", {
          items: [...this.state.cartItems]
        });
      }
    );
  };

  loadFromLocalStorage = key => {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch ({ message }) {
      throw new Error(message);
    }
  };

  saveToLocalStorage = (key, data) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch ({ message }) {
      throw new Error(message);
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component
          {...pageProps}
          addToCart={this.addToCart}
          cartState={this.state}
        />
      </Container>
    );
  }
}

export default VRS;
