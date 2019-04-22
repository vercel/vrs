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


  incrementQuantity = id => {
    const { cartItems } = this.state
    const updatedCartItems = cartItems.map(item => {
      if (item['id'] == id) {
	item.quantity += 1
      }
      return item
    })
    this.setState({cartItems: updatedCartItems})
  }

  decrementQuantity = id => {
    const { cartItems } = this.state
    const updatedCartItems = cartItems.map(item => {
      if (item['id'] == id) {
	item.quantity -= 1
      }
      return item
    })
    this.setState({cartItems: updatedCartItems})
  }

  saveCart = details => {
    const {id} = details
    this.setState(
      ({ cartItems }) => {
	if (cartItems.find(item => item['id'] == id)) {
	  return {
	    cartItems: cartItems.map(item => {
	      if (item['id'] == id) {
		item.quantity += 1
	      }
	      return item
	    })
	  }
	} else {
	  return {
	    cartItems: [...cartItems, { ...details, quantity: 1 }]
	  }
	}
      }
	,
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
          incrementQuantity={this.incrementQuantity}
          decrementQuantity={this.decrementQuantity}
          cartState={this.state}
        />
      </Container>
    );
  }
}

export default VRS;
