import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/authentication';
import SecondButton from '../../Components/UI/CustomButton/SecondButton';
import Card from '../../Components/UI/Card';
const AccountSettingsScreen = props => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logout());
  };
  return (
    <View style={styles.AccountSettingsScreen}>
      <View style={styles.AccountSettingsScreenContainer}>
        <Card style={styles.cardContainer}>
          <SecondButton
            label="ACCOUNT & SECURITY"
            onPress={() => {
              props.navigation.navigate('ACCOUNTANDSECURITY');
            }}
          />
        </Card>

        <Card style={styles.cardContainer}>
          <SecondButton
            customTextStyle={styles.AccountSettingsLogoutTextStyle}
            label="LOGOUT"
            onPress={logout}
          />
        </Card>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  AccountSettingsScreen: {
    flex: 1,

    backgroundColor: '#E8E8E8',
  },

  AccountSettingsLogoutTextStyle: {
    color: 'red',
  },
  cardContainer: {
    margin: 1,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default AccountSettingsScreen;

{
  /* <Box>
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
    </Box> */
}
