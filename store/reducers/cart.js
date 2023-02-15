import {ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART} from '../actions/cart';
import {LOGOUT} from '../actions/authentication';
import cartItem from '../../models/cartItem';
const initialState = {
  items: [],
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productVariantID = addedProduct.id + addedProduct.productTitle;
      const quantity = action.quantity;
      let updatedOrNewCartItem;
      /*      console.log(state.items[addedProduct.id]);
      console.log(state.items); */
      /*  console.log(state.items); */
      const cartItems = state.items.find(item => {
        return item.id === addedProduct.id;
      });
      /*   console.log(addedProduct); */
      if (cartItems) {
        console.log('added q');
        cartItems.quantity++;
      } else {
        console.log('added p');
        updatedOrNewCartItem = new cartItem(
          addedProduct.id,
          addedProduct.id,
          quantity,
          addedProduct.storeId,
          addedProduct.productCategory,
          addedProduct.productDescription,
          addedProduct.productImages[0],
          addedProduct.productPrice,
          addedProduct.productTitle,
        );
      }
      if (updatedOrNewCartItem === undefined) {
        return {
          ...state,
          totalAmount: state.totalAmount + +addedProduct.productPrice,
        };
      }
      return {
        ...state,
        items: [...state.items, updatedOrNewCartItem],
        totalAmount: state.totalAmount + +addedProduct.productPrice,
      };
    case REMOVE_FROM_CART:
      const selectCartItem = state.items.find(item => {
        return item.id === action.productId;
      });
      const currentQty = selectCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        selectCartItem.quantity--;
      } else {
        updatedCartItems = {...state};
        const index = updatedCartItems.items
          .map(item => item.id)
          .indexOf(action.productId);
        updatedCartItems.items.splice(index, 1);
      }
      if (updatedCartItems === undefined) {
        return {
          ...state,
          totalAmount: state.totalAmount - +selectCartItem.productPrice,
        };
      }
      return {
        ...state,
        totalAmount: state.totalAmount - +selectCartItem.productPrice,
      };
    case EMPTY_CART:
      return {
        ...initialState,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
