import React, {useCallback, useEffect} from 'react';

import {Box, Text, Image, Button, HStack, Pressable} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as authActions from '../../store/actions/authentication';
import {firebase} from '@react-native-firebase/auth';

const MyAccountScreen = props => {
  const dispatch = useDispatch();
/* 
  useFocusEffect(
    useCallback(() => {
      const unsubsribe = () => {
        let mounted = true;
        auth().onAuthStateChanged(user => {
          if (user) {
            if (mounted) {
              mounted = false;
    
            }
          }
        });
      };
      return unsubsribe();
    }),
  ); */

  return (
    <Box>
      <Image
        size={75}
        resizeMode={'contain'}
        borderRadius={200}
        source={{
          uri: 'https://wallpaperaccess.com/full/317501.jpg',
        }}
        alt="Alternate Text"
      />
      <Pressable>
        {({isPressed}) => {
          return (
            <HStack
              justifyContent="space-between"
              mt="4"
              maxWidth="500"
              w="100%"
              maxHeight="10"
              h="10"
              overflow="hidden"
              borderWidth="1"
              shadow="1"
              bg={isPressed ? 'gray.400' : 'gray.200'}>
              <Text padding="2">My Orders</Text>
              <Text padding="2">View Orders History ></Text>
            </HStack>
          );
        }}
      </Pressable>
    </Box>
  );
};
export default MyAccountScreen;
