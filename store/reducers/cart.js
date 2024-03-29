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
      const addedMeasurement = action.measurement;
      const productVariantID = addedProduct.id + addedProduct.productTitle;
      const quantity = action.quantity;

      let updatedOrNewCartItem;

      const cartItems = state.items.find(item => {
        return item.id === addedProduct.id;
      });

      if (cartItems) {
        cartItems.quantity++;
      } else {
        updatedOrNewCartItem = new cartItem(
          addedProduct.id,
          addedProduct.id,
          quantity,
          addedProduct.storeId,
          addedProduct.productCategory,
          addedProduct.productDescription,
          addedProduct.productPrimaryImage,
          addedProduct.productPrice,
          addedProduct.productTitle,
          addedProduct.bodyMeasurementNeeded,
          addedMeasurement,
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
