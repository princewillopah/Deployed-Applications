import React, { createContext, useReducer } from 'react';

const initial = {
  cart: { cartItems: [] },
  user: JSON.parse(localStorage.getItem('user')) || null
};

export const Store = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const item = action.payload;
      const exist = state.cart.cartItems.find(x => x.product === item.product);
      let cartItems;
      if (exist) cartItems = state.cart.cartItems.map(x => x.product === exist.product ? item : x);
      else cartItems = [...state.cart.cartItems, item];
      localStorage.setItem('cart', JSON.stringify({ cartItems }));
      return { ...state, cart: { cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(x => x.product !== action.payload);
      localStorage.setItem('cart', JSON.stringify({ cartItems }));
      return { ...state, cart: { cartItems } };
    }
    case 'USER_LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case 'USER_LOGOUT':
      localStorage.removeItem('user');
      return { ...state, user: null, cart: { cartItems: [] } };
    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};
