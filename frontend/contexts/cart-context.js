import { useState, useEffect, createContext } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItemsCount, setCartItemsCount] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(
    () => {
      console.log("cart-context useEffect");
      console.log("cartItemsCount", cartItemsCount);
      if (!initialized) {
        console.log("initializing ...");
        const count = getCartItemsCount();
        count ? setCartItemsCount(count) : setCartItemsCount(0);
        setInitialized(true);
      }
    },
    [cartItemsCount]
  );

  function addToCart(productInfo) {
    console.log("adding to cart ...");
    console.log("product info:", productInfo);

    saveCart();
    setCartItemsCount(cartItemsCount + 1);
  }

  function getCartItemsCount() {
    console.log("getting cart items from localstorage");
    const parsed = JSON.parse(window.localStorage.getItem("vrs:cart"));
    console.log(parsed);
    if (parsed && parsed.cartItemsCount) {
      return parsed.cartItemsCount;
    }
    return 0;
  }

  function saveToLocalStorage(key, data) {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch ({ message }) {
      console.error(message);
    }
  }

  function saveCart() {
    saveToLocalStorage("vrs:cart", { cartItemsCount, cartItems });
  }

  return (
    <CartContext.Provider
      value={{
        cartItemsCount,
        setCartItemsCount,
        cartItems,
        setCartItems,
        addToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
