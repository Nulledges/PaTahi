import React, {useState, useEffect} from 'react';

import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {
  LoginNavigator,
  AccountNavigator,
  MainLoginNavigator,
  MainAccountNavigator,
} from './navigation';
import {Box, Button, Text} from 'native-base';
import * as authActions from '../store/actions/authentication';
import {useSelector, useDispatch} from 'react-redux';

const AppNavigator = () => {
  const userToken = useSelector(state => !!state.auth.token);

  const dispatch = useDispatch();

  const navigation = () => {
    if (userToken) {
      return (
        <NavigationContainer>
          <MainAccountNavigator />
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          {!userToken && <MainLoginNavigator />}
        </NavigationContainer>
      );
    }
  };

  return navigation();
};

export default AppNavigator;
