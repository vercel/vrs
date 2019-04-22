import App, { Container } from "next/app";
import { StripeProvider } from "react-stripe-elements-universal";

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
    const cart = this.loadFromLocalStorage("vrs:cart");
    if (cart) {
      const { items: cartItems } = cart;
      this.setState({ cartItems }, () => console.log(this.state.cartItems));
    }
  }

  addToCart = details => {
    const { id } = details;
    this.setState(
      ({ cartItems }) => {
        if (cartItems.find(item => item["id"] == id)) {
          return {
            cartItems: cartItems.map(item => {
              if (item["id"] == id) {
                item.quantity += 1;
              }
              return item;
            })
          };
        } else {
          return {
            cartItems: [...cartItems, { ...details, quantity: 1 }]
          };
        }
      },
      () => this.saveCart()
    );
  };

  incrementQuantity = id => {
    const { cartItems } = this.state;
    const updatedCartItems = cartItems.map(item => {
      if (item["id"] == id) {
        item.quantity += 1;
      }
      return item;
    });
    this.setState({ cartItems: updatedCartItems }, () => this.saveCart());
  };

  decrementQuantity = id => {
    const { cartItems } = this.state;
    const updatedCartItems = cartItems
      .map(item => {
        if (item["id"] == id) {
          if (item.quantity > 0) {
            item.quantity -= 1;
          }
        }
        return item;
      })
      .filter(item => item.quantity > 0);
    this.setState({ cartItems: updatedCartItems }, () => this.saveCart());
  };

  removeFromCart = id => {
    const { cartItems } = this.state;
    const updatedCartItems = cartItems.filter(item => item["id"] != id);
    this.setState({ cartItems: updatedCartItems }, () => this.saveCart());
  };

  saveCart = details => {
    this.saveToLocalStorage("vrs:cart", {
      items: [...this.state.cartItems]
    });
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
        <StripeProvider apiKey="pk_test_lvZUcve5SCKEDCkOZ7BTG49N">
          <Component
            {...pageProps}
            addToCart={this.addToCart}
            removeFromCart={this.removeFromCart}
            incrementQuantity={this.incrementQuantity}
            decrementQuantity={this.decrementQuantity}
            cartState={this.state}
          />
        </StripeProvider>
      </Container>
    );
  }
}

export default VRS;
