import React, {useLayoutEffect} from 'react';
import {ToastAndroid, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
//Authentication Screen
import LoginScreen from '../screen/authentication/LoginScreen';
import ForgetPasswordScreen from '../screen/authentication/ForgetPasswordScreen';
import SignupScreen from '../screen/authentication/SignupScreen';
//Admin Screen
import AdminMainScreen from '../screen/admin/AdminMainScreen';
import StoreApplicationScreen from '../screen/admin/StoreApplicationScreen';
import ApplicationScreen from '../screen/admin/ApplicationsScreen';
import ApprovedScreen from '../screen/admin/ApprovedScreen';
import AdminSettingsScreen from '../screen/admin/AdminSettingsScreen';
//profile Screen
import MyAccountScreen from '../screen/profile/MyAccountScreen';
import AccountSettingsScreen from '../screen/profile/AccountSettingsScreen';
import ApplicationOverviewScreen from '../screen/profile/tailoringShopApplication/ApplicationOverviewScreen';
import ApplicationFormScreen from '../screen/profile/tailoringShopApplication/ApplicationFormScreen';
/* import AccountInformationScreen from '../screen/profile/AccountInformationScreen';
import ChangeNumberScreen from '../screen/profile/ChangeNumberScreen';
import ChangeEmailScreen from '../screen/profile/ChangeEmailScreen';
import ChangePasswordScreen from '../screen/profile/ChangePasswordScreen'; */
//chat Screen
import ChatScreen from '../screen/chat/ChatScreen';
//notification Screen
import NotificationScreen from '../screen/notification/NotificationScreen';
//home Screen
import HomeScreen from '../screen/home/HomeScreen';
import CartScreen from '../screen/home/CartScreen';
import ProductOverviewScreen from '../screen/home/ProductOverviewScreen';
import ProductDetailScreen from '../screen/home/ProductDetailScreen';
import HomeStoreOverviewScreen from '../screen/home/HomeStoreOverviewScreen';
import HomeStoreDetailScreen, {
  screenOptions as StoreDetailScreenOptions,
} from '../screen/home/HomeStoreDetailScreen';
import MoreInfomationScreen from '../screen/home/MoreInformationScreen';
//purchaseStatus Screen
import OnGoingScreen from '../screen/purchaseStatus/OnGoingScreen';
import FinishedScreen from '../screen/purchaseStatus/FinishedScreen';
import CollectedScreen from '../screen/purchaseStatus/CollectedScreen';
import RefundedScreen from '../screen/purchaseStatus/RefundedScreen';
//--------------------------------------//
const LoginStack = createNativeStackNavigator();
export const LoginStackNavigator = () => {
  return (
    <LoginStack.Navigator initialRouteName="LOG IN">
      <LoginStack.Screen
        name="LOG IN"
        component={LoginScreen}
        options={{
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <LoginStack.Screen
        name="FORGOT PASSWORD"
        component={ForgetPasswordScreen}
        options={{
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <LoginStack.Screen
        name="SIGN UP"
        component={SignupScreen}
        options={{
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
    </LoginStack.Navigator>
  );
};
const AccountStack = createNativeStackNavigator();
export const AccountStackNavigator = ({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'PURCHASE HISTORY') {
      navigation.setOptions({
        tabBarStyle: {display: 'none', backgroundColor: '#FFFFFF'},
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {display: 'flex', backgroundColor: '#FFFFFF'},
      });
    }
  }, [navigation, route]);
  return (
    <AccountStack.Navigator initialRouteName="ACCOUNT">
      <AccountStack.Screen
        name="ACCOUNT"
        component={MyAccountScreen}
        options={({navigation}) => ({
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SETTINGS');
              }}>
              <View>
                <Ionicons name={'md-settings-outline'} size={24} color="black" />
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <AccountStack.Screen
        name="PURCHASE HISTORY"
        component={PurchaseStatusTopTabNavigator}
        options={{
          headerTintColor: 'black',

          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="SETTINGS"
        component={AccountSettingsScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="APPLICATION FORM"
        component={ApplicationFormScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="APPLICATION OVERVIEW"
        component={ApplicationOverviewScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />

      {/*   <AccountStack.Screen
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
      /> */}
    </AccountStack.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();
export const HomeStackNavigator = () => {
  const userToken = useSelector(state => state.auth.token);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HOME"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                if (!!userToken) {
                  navigation.navigate('CART');
                } else {
                  ToastAndroid.showWithGravity(
                    'You need to Login!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
                  navigation.navigate('LOGIN');
                }
              }}>
              <View>
                <Ionicons name="md-cart" size={24} color="black" />
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <HomeStack.Screen
        name="CART"
        component={CartScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <HomeStack.Screen
        name="PRODUCT OVERVIEW"
        component={ProductOverviewScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <HomeStack.Screen
        name="STORE OVERVIEW"
        component={HomeStoreOverviewScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <HomeStack.Screen
        name="STORE DETAIL"
        component={HomeStoreDetailScreen}
        options={StoreDetailScreenOptions}
      />
      <HomeStack.Screen
        name="MORE INFO"
        component={MoreInfomationScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
    </HomeStack.Navigator>
  );
};
const AdminStack = createNativeStackNavigator();
export const AdminStackNavigator = () => {
  return (
    <AdminStack.Navigator initialRouteName="ADMIN">
      <AdminStack.Screen
        name="ADMIN"
        component={AdminMainScreen}
        options={({navigation}) => ({
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ADMIN SETTINGS');
              }}>
              <View>
                <Ionicons
                  name={'md-settings-outline'}
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <AdminStack.Screen
        name="STORE APPLICATIONS"
        component={ApplicationStatusTopTabNavigator}
        options={{
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AdminStack.Screen
        name="ADMIN SETTINGS"
        component={AdminSettingsScreen}
        options={{
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
    </AdminStack.Navigator>
  );
};
const MainLoginBottomTab = createBottomTabNavigator();
export const MainLoginNavigator = () => {
  const userToken = useSelector(state => state.auth.token);
  return (
    <MainLoginBottomTab.Navigator
      initialRouteName="HOMEBOTTOM"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        tabBarHideOnKeyboard: true,
      }}>
      <MainLoginBottomTab.Screen
        name="HOMEBOTTOM"
        component={HomeStackNavigator}
        options={{
          headerTintColor: 'black',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShown: false,
          tabBarLabel: 'HOME',
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused ? 'md-home' : 'md-home-outline';
            return <Ionicons name={iconName} size={24} color="black" />;
          },
        }}
      />
      <MainLoginBottomTab.Screen
        name="CHAT"
        component={ChatScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          tabBarLabel: 'CHAT',
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused
              ? 'chatbox-ellipses'
              : 'chatbox-ellipses-outline';
            return <Ionicons name={iconName} size={24} color="black" />;
          },
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            if (!!userToken) {
              navigation.navigate('CHAT');
            } else {
              ToastAndroid.showWithGravity(
                'You need to Login!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
              navigation.navigate('LOGIN');
            }
          },
        })}
      />
      <MainLoginBottomTab.Screen
        name="NOTIFICATION"
        component={NotificationScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
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
              ToastAndroid.showWithGravity(
                'You need to Login!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
              navigation.navigate('LOGIN');
            }
          },
        })}
      />
      <MainLoginBottomTab.Screen
        name="LOGIN"
        component={LoginStackNavigator}
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
    </MainLoginBottomTab.Navigator>
  );
};

const MainAccountBottomTab = createBottomTabNavigator();
export const MainAccountNavigator = () => {
  const userToken = useSelector(state => state.auth.token);
  return (
    <MainAccountBottomTab.Navigator
      initialRouteName="HOMEBOTTOM"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        tabBarHideOnKeyboard: true,
      }}>
      <MainAccountBottomTab.Screen
        name="HOMEBOTTOM"
        component={HomeStackNavigator}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
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
      <MainAccountBottomTab.Screen
        name="CHAT"
        component={ChatScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
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
      <MainAccountBottomTab.Screen
        name="NOTIFICATION"
        component={NotificationScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF ',
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
      <MainAccountBottomTab.Screen
        name="BOTTOMACCOUNT"
        component={AccountStackNavigator}
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
    </MainAccountBottomTab.Navigator>
  );
};

const PurchaseStatusTopTab = createMaterialTopTabNavigator();
export const PurchaseStatusTopTabNavigator = () => {
  return (
    <PurchaseStatusTopTab.Navigator
      initialRouteName="ONGOING"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        tabBarHideOnKeyboard: true,
        tabBarScrollEnabled: true,
      }}>
      <PurchaseStatusTopTab.Screen name="ONGOING" component={OnGoingScreen} />
      <PurchaseStatusTopTab.Screen name="FINISHED" component={FinishedScreen} />
      <PurchaseStatusTopTab.Screen
        name="COLLECTED"
        component={CollectedScreen}
      />
      <PurchaseStatusTopTab.Screen name="REFUNDED" component={RefundedScreen} />
      {/*       <PurchaseStatusTopTab.Screen name="CANCELED" component={CanceledScreen} /> */}
    </PurchaseStatusTopTab.Navigator>
  );
};

const ApplicationStatusTopTab = createMaterialTopTabNavigator();
export const ApplicationStatusTopTabNavigator = () => {
  return (
    <ApplicationStatusTopTab.Navigator
      initialRouteName="APPLICATIONS"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        tabBarHideOnKeyboard: true,
        tabBarScrollEnabled: true,
      }}>
      <ApplicationStatusTopTab.Screen
        name="APPLICATIONS"
        component={ApplicationScreen}
      />
      <ApplicationStatusTopTab.Screen
        name="APPROVED"
        component={ApprovedScreen}
      />
    </ApplicationStatusTopTab.Navigator>
  );
};
