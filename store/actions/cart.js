export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const addToCart = (product, quantity) => {
  return {
    type: ADD_TO_CART,
    product: product,
    quantity: quantity,
  };
};
export const removeFromCart = productId => {
  return {type: REMOVE_FROM_CART, productId: productId};
};

export const emptyCart = () => {
  return {type: EMPTY_CART};
};
