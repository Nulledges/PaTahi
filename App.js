import React from 'react';
import {View, Text} from 'react-native';
import ReduxThunk from 'redux-thunk';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
//reducers
import authenticationReducer from './store/reducers/authentication';
import storeApplicationReducer from './store/reducers/storeApplication';

const App = () => {
  const store = configureStore({
    reducer: {
      application: storeApplicationReducer,
      auth: authenticationReducer,
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
