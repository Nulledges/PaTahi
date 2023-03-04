import React from 'react';
import {View, Text} from 'react-native';
import ReduxThunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
//reducers
import authenticationReducer from './store/reducers/authentication';
import storeReducer from './store/reducers/store';
import storeApplicationReducer from './store/reducers/storeApplication';
import productsReducer from './store/reducers/product';
import userReducer from './store/reducers/user';
import adminReducer from './store/reducers/admin';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import chatReducer from './store/reducers/chat';
const App = () => {
  const store = configureStore({
    reducer: {
      application: storeApplicationReducer,
      store: storeReducer,
      auth: authenticationReducer,
      products: productsReducer,
      user: userReducer,
      admin: adminReducer,
      cart: cartReducer,
      order: orderReducer,
      chat: chatReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({serializableCheck: false, immutableCheck: false}),
  });
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
