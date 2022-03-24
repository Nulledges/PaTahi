import React from 'react';
//from installed packages
import {Pressable, Box} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
//from screen\authentication
import LoginScreen from '../screen/authentication/LoginScreen';
import ForgetPasswordScreen from '../screen/authentication/ForgetPasswordScreen';
import SignupScreen from '../screen/authentication/SignupScreen';
//from Profile
import MyAccountScreen from '../screen/profile/MyAccountScreen';
import AccountSettingsScreen from '../screen/profile/AccountSettingsScreen';
import AccountInformationScreen from '../screen/profile/AccountInformationScreen';
import ChangeNumberScreen from '../screen/profile/ChangeNumberScreen';
import ChangeEmailScreen from '../screen/profile/ChangeEmailScreen';
import ChangePasswordScreen from '../screen/profile/ChangePasswordScreen';
//from chat
import ChatScreen from '../screen/chat/ChatScreen';
//from notification
import NotificationScreen from '../screen/notification/NotificationScreen';
//home
import HomeScreen from '../screen/home/HomeScreen';
import CartScreen from '../screen/home/CartScreen';
import ProductOverviewScreen from '../screen/home/ProductOverviewScreen';
import ProductDetailScreen from '../screen/home/ProductDetailScreen';
import HomeStoreOverviewScreen from '../screen/home/HomeStoreOverviewScreen';
import HomeStoreDetailScreen from '../screen/home/HomeStoreDetailScreen';
import MoreInfomationScreen from '../screen/home/MoreInformationScreen';

const LoginStack = createNativeStackNavigator();
export const LoginNavigator = () => {
  return (
    <LoginStack.Navigator initialRouteName="LOG IN">
      <LoginStack.Screen
        name="LOG IN"
        component={LoginScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
        }}
      />
      <LoginStack.Screen
        name="FORGOT PASSWORD"
        component={ForgetPasswordScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
        }}
      />
      <LoginStack.Screen
        name="SIGN UP"
        component={SignupScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
        }}
      />
    </LoginStack.Navigator>
  );
};

const AccountStack = createNativeStackNavigator();
export const AccountNavigator = () => {
  return (
    <AccountStack.Navigator initialRouteName="ACCOUNT">
      <AccountStack.Screen
        name="ACCOUNT"
        component={MyAccountScreen}
        options={({navigation}) => ({
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('SETTINGS');
              }}>
              {({isPressed}) => {
                let iconName;
                iconName = isPressed ? 'md-settings' : 'md-settings-outline';
                return (
                  <Box
                    maxW="96"
                    borderWidth="1"
                    borderColor="#D9DDDC"
                    bg={isPressed ? '#D9DDDC' : '#D9DDDC'}
                    p="1"
                    rounded="8"
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}>
                    <Ionicons name={iconName} size={24} />
                  </Box>
                );
              }}
            </Pressable>
          ),
        })}
      />
      <AccountStack.Screen
        name="SETTINGS"
        component={AccountSettingsScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
        }}
      />
      <AccountStack.Screen
        name="ACCOUNT INFORMATION"
        component={AccountInformationScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
        }}
      />
      <AccountStack.Screen
        name="CHANGE NUMBER"
        component={ChangeNumberScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
        }}
      />
      <AccountStack.Screen
        name="CHANGE EMAIL"
        component={ChangeEmailScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
        }}
      />
      <AccountStack.Screen
        name="CHANGE PASSWORD"
        component={ChangePasswordScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
        }}
      />
    </AccountStack.Navigator>
  );
};
const HomeStack = createNativeStackNavigator();
export const HomeNavigator = () => {
  const userToken = useSelector(state => state.auth.token);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HOME"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
          headerRight: () => (
            <Pressable
              onPress={() => {
                if (!!userToken) {
                  navigation.navigate('CART');
                } else {
                  navigation.navigate('LOGIN');
                }
              }}>
              {({isPressed}) => {
                let iconName;
                iconName = isPressed ? 'md-cart' : 'md-cart-outline';
                return (
                  <Box
                    maxW="96"
                    borderWidth="1"
                    borderColor="#D9DDDC"
                    bg={isPressed ? '#D9DDDC' : '#D9DDDC'}
                    p="1"
                    rounded="8"
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}>
                    <Ionicons name={iconName} size={24} />
                  </Box>
                );
              }}
            </Pressable>
          ),
        })}
      />
      <HomeStack.Screen
        name="CART"
        component={CartScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
        }}
      />
    </HomeStack.Navigator>
  );
};
const MainLoginBottomTabNavigator = createBottomTabNavigator();
export const MainLoginNavigator = () => {
  const userToken = useSelector(state => state.auth.token);
  return (
    <MainLoginBottomTabNavigator.Navigator
      initialRouteName="HOMEBOTTOM"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#D9DDDC',
        },
        tabBarHideOnKeyboard: true,
      }}>
      <MainLoginBottomTabNavigator.Screen
        name="HOMEBOTTOM"
        component={HomeNavigator}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused ? 'md-home' : 'md-home-outline';
            return <Ionicons name={iconName} size={24} color="#000000" />;
          },
        }}
      />
      <MainLoginBottomTabNavigator.Screen
        name="CHAT"
        component={ChatScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
          tabBarLabel: 'CHAT',
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused
              ? 'chatbox-ellipses'
              : 'chatbox-ellipses-outline';
            return <Ionicons name={iconName} size={24} color="#000000" />;
          },
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            if (!!userToken) {
              navigation.navigate('CHAT');
            } else {
              navigation.navigate('LOGIN');
            }
          },
        })}
      />
      <MainLoginBottomTabNavigator.Screen
        name="NOTIFICATION"
        component={NotificationScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
          tabBarLabel: 'NOTIFICATION',
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused
              ? 'md-notifications'
              : 'md-notifications-outline';
            return <Ionicons name={iconName} size={24} color="#000000" />;
          },
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            if (!!userToken) {
              navigation.navigate('NOTIFICATION');
            } else {
              navigation.navigate('LOGIN');
            }
          },
        })}
      />
      <MainLoginBottomTabNavigator.Screen
        name="LOGIN"
        component={LoginNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'LOGIN',
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused ? 'log-in' : 'log-in-outline';
            return <Ionicons name={iconName} size={24} color="#000000" />;
          },
        }}
      />
    </MainLoginBottomTabNavigator.Navigator>
  );
};

const MainAccountBottomTabNavigator = createBottomTabNavigator();
export const MainAccountNavigator = () => {
  const userToken = useSelector(state => state.auth.token);
  return (
    <MainAccountBottomTabNavigator.Navigator
      initialRouteName="HOMEBOTTOM"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#D9DDDC',
        },
        tabBarHideOnKeyboard: true,
      }}>
      <MainAccountBottomTabNavigator.Screen
        name="HOMEBOTTOM"
        component={HomeNavigator}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused ? 'md-home' : 'md-home-outline';
            return <Ionicons name={iconName} size={24} color="#000000" />;
          },
        }}
      />
      <MainAccountBottomTabNavigator.Screen
        name="CHAT"
        component={ChatScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
          tabBarLabel: 'CHAT',
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused
              ? 'chatbox-ellipses'
              : 'chatbox-ellipses-outline';
            return <Ionicons name={iconName} size={24} color="#000000" />;
          },
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            if (!!userToken) {
              navigation.navigate('CHAT');
            } else {
              navigation.navigate('LOG IN');
            }
          },
        })}
      />
      <MainAccountBottomTabNavigator.Screen
        name="NOTIFICATION"
        component={NotificationScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
          tabBarLabel: 'NOTIFICATION',
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused
              ? 'md-notifications'
              : 'md-notifications-outline';
            return <Ionicons name={iconName} size={24} color="#000000" />;
          },
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            if (!!userToken) {
              navigation.navigate('NOTIFICATION');
            } else {
              navigation.navigate('LOG IN');
            }
          },
        })}
      />
      <MainAccountBottomTabNavigator.Screen
        name="BOTTOMACCOUNT"
        component={AccountNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'ACCOUNT',
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused ? 'md-person' : 'md-person-outline';
            return <Ionicons name={iconName} size={24} color="#000000" />;
          },
        }}
      />
    </MainAccountBottomTabNavigator.Navigator>
  );
};
