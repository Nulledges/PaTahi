import React from 'react';
import {Box, Text, Pressable} from 'native-base';
import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/authentication';
const AccountSettingsScreen = props => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logout());
  };
  return (
    <Box>
      <Pressable
        onPress={() => {
          props.navigation.navigate('ACCOUNT INFORMATION');
        }}>
        {({isPressed}) => {
          return (
            <Box
              mt="4"
              maxWidth="500"
              w="100%"
              maxHeight="10"
              h="10"
              overflow="hidden"
              borderWidth="1"
              shadow="1"
              bg={isPressed ? 'gray.400' : 'gray.200'}>
              <Text padding="2">ACCOUNT INFORMATION</Text>
            </Box>
          );
        }}
      </Pressable>

      <Pressable onPress={logout}>
        {({isPressed}) => {
          return (
            <Box
              mt="2"
              maxWidth="500"
              w="100%"
              maxHeight="10"
              h="10"
              overflow="hidden"
              borderWidth="1"
              shadow="1"
              bg={isPressed ? 'gray.400' : 'gray.200'}
              alignItems="center">
              <Text padding="2" color="red.500">
                LOGOUT
              </Text>
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
};

export default AccountSettingsScreen;
