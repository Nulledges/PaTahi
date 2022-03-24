import React from 'react';
import {NativeBaseProvider, Box, Text, Center} from 'native-base';
//Redux
import {applyMiddleware, combineReducers, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';

import AppNavigator from './navigation/AppNavigator';

//reducers
import authReducer from './store/reducers/authentication';

const App = () => {
  const rootReducer = combineReducers({
    auth: authReducer,
  });
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AppNavigator />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
