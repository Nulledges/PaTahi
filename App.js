import React from 'react';
import {View, Text} from 'react-native';
import ReduxThunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
//reducers
import authenticationReducer from './store/reducers/authentication';
import storeApplicationReducer from './store/reducers/storeApplication';
import productsReducer from './store/reducers/product';
import userReducer from './store/reducers/user';
const App = () => {
  const store = configureStore({
    reducer: {
      application: storeApplicationReducer,
      auth: authenticationReducer,
      products: productsReducer,
      user: userReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({serializableCheck: false}),
  });
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
