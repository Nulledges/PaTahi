import React, {useCallback, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as authActions from '../../store/actions/authentication';
import {firebase} from '@react-native-firebase/auth';
import SecondButton from '../../Components/UI/CustomButton/SecondButton';
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
  /*   <Image
  size={75}
  resizeMode={'contain'}
  borderRadius={200}
  source={{
    uri: 'https://wallpaperaccess.com/full/317501.jpg',
  }}
  alt="Alternate Text"
/> */
  {
    /* <Box>
<Pressable
  onPress={() => {
    props.navigation.navigate('PURCHASE HISTORY');
  }}>
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
</Box> */
  }
  return (
    <View style={styles.myAccountScreen}>
      <View style={styles.myAccountScreenContainer}>
        <View style={styles.buttonContainer}>
          <SecondButton
            label="BECOME A TAILOR"
            onPress={() => {
              props.navigation.navigate('APPLICATION OVERVIEW');
            }}
          />
          <SecondButton
            label="MY ORDERS"
            onPress={() => {
              props.navigation.navigate('PURCHASE HISTORY');
            }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  myAccountScreen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  myAccountScreenContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  buttonContainer: {
    width: '100%',
  },
  MyAccountScreenCustomButton: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MyAccountScreenCustomButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  MyAccountTextStyle: {
    padding: 4,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export default MyAccountScreen;
