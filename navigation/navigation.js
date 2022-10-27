import React, {useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  ToastAndroid,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Alert,
} from 'react-native';

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
import ApplicationScreen from '../screen/admin/ApplicationsScreen';
import ApplicationDetailScreen, {
  screenOptions as ApplicationDetailScreenOptions,
} from '../screen/admin/ApplicationDetailScreen';
import ApprovedScreen from '../screen/admin/ApprovedScreen';
import AdminSettingsScreen from '../screen/admin/AdminSettingsScreen';
//profile Screen
import MyAccountScreen, {
  screenOptions as MyAccountScreenOptions,
} from '../screen/profile/MyAccountScreen';
import AccountSettingsScreen from '../screen/profile/AccountSettingsScreen';
import AccountAndSecurityScreen from '../screen/profile/AccountAndSecurityScreen';
import EditProfileScreen from '../screen/profile/EditProfileScreen';
import EditNameScreen from '../screen/profile/EditNameScreen';
import ChangeUsernameScreen from '../screen/profile/ChangeUsernameScreen';
import ChangeNumberScreen from '../screen/profile/ChangeNumberScreen';
import VerifyNumberScreen from '../screen/profile/VerifyNumberScreen';
import ChangeEmailScreen from '../screen/profile/ChangeEmailScreen';
import EmailLoginVerificationScreen from '../screen/profile/EmailLoginVerificationScreen';
import PasswordLoginVerificationScreen from '../screen/profile/PasswordLoginVerificationScreen';
import ChangePasswordScreen from '../screen/profile/ChangePasswordScreen';
import RatingScreen from '../screen/profile/RatingScreen';
import ToRateScreen from '../screen/profile/ToRateScreen';
import RateProductScreen from '../screen/profile/RateProductScreen';
//profile tailoringShopApplication
import ApplicationOverviewScreen from '../screen/profile/tailoringShopApplication/ApplicationOverviewScreen';
import ApplicationFormScreen from '../screen/profile/tailoringShopApplication/ApplicationFormScreen';
import ApplicationHistoryScreen from '../screen/profile/tailoringShopApplication/ApplicationHistory';
//profile tailorShop
import MyStoreScreen from '../screen/profile/TailoringShop/MyStoreScreen';
import AddProductScreen from '../screen/profile/TailoringShop/AddProductScreen';
import LiveProductScreen from '../screen/profile/TailoringShop/LiveProductScreen';
import DelistedProductScreen from '../screen/profile/TailoringShop/DelistedProductScreen';
import SelectCategoryScreen from '../screen/profile/TailoringShop/SelectCategoryScreen';
import TailoringProductRating from '../screen/profile/TailoringShop/TailoringProductRatingScreen';
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
  const navigation = useNavigation();
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
          headerLeft: () => (
            <TouchableOpacity
              style={{marginRight: 30}}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'HOMEBOTTOM'}],
                });
              }}>
              <View>
                <Ionicons name={'arrow-back'} size={24} color="black" />
              </View>
            </TouchableOpacity>
          ),
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
//for homelogin
const HomeLoginStack = createNativeStackNavigator();
export const HomeLoginStackNavigator = () => {
  const navigation = useNavigation();
  return (
    <HomeLoginStack.Navigator initialRouteName="LOG IN">
      <HomeLoginStack.Screen
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
      <HomeLoginStack.Screen
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
      <HomeLoginStack.Screen
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
    </HomeLoginStack.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();
export const HomeStackNavigator = ({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === 'HOMESTACKLOGIN' ||
      routeName === 'CART' ||
      routeName === 'PRODUCT OVERVIEW' ||
      routeName === 'PRODUCT DETAIL'
    ) {
      navigation.setOptions({
        tabBarStyle: {display: 'none', backgroundColor: '#FFFFFF'},
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {display: 'flex', backgroundColor: '#FFFFFF'},
      });
    }
  }, [navigation, route]);
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
                  navigation.navigate('HOMESTACKLOGIN');
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
          headerLeft: () => (
            <TouchableOpacity>
              <View>
                <TextInput
                  placeholder="Search!"
                  placeholderTextColor={'black'}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    height: 40,
                    width: 300,
                    fontSize: 14,
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: 15,
                  }}
                />
              </View>
            </TouchableOpacity>
          ),
          headerTitle: '',
          headerBackVisible: true,
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <HomeStack.Screen
        name="PRODUCT DETAIL"
        component={ProductDetailScreen}
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
      <HomeStack.Screen
        name="HOMESTACKLOGIN"
        component={HomeLoginStackNavigator}
        options={{
          headerTintColor: 'black',
          headerTitle: 'LOG IN',
          headerShown: false,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const NotificationStack = createNativeStackNavigator();
export const NotificationStackNavigator = ({navigation, route}) => {
  /*   useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'CHATSTACKLOGIN') {
      navigation.setOptions({
        tabBarStyle: {display: 'none', backgroundColor: '#FFFFFF'},
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {display: 'flex', backgroundColor: '#FFFFFF'},
      });
    }
  }, [navigation, route]); */
  return (
    <NotificationStack.Navigator initialRouteName="CHAT">
      <NotificationStack.Screen
        name="NOTIFICATION"
        component={NotificationScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
    </NotificationStack.Navigator>
  );
};

const AccountStack = createNativeStackNavigator();
export const AccountStackNavigator = ({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === 'MY ORDERS' ||
      routeName === 'APPLICATION OVERVIEW' ||
      routeName === 'MY RATING' ||
      routeName === 'RATE PRODUCT' ||
      routeName === 'APPLICATION FORM' ||
      routeName === 'MY PRODUCT' ||
      routeName === 'ADD PRODUCT' ||
      routeName === 'MYSTORE' ||
      routeName === 'SELECT CATEGORY'
    ) {
      navigation.setOptions({
        tabBarStyle: {display: 'none', backgroundColor: '#FFFFFF'},
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {display: 'flex', backgroundColor: '#FFFFFF'},
      });
    }
  }, [navigation, route]);
  const userToken = useSelector(state => state.auth.token);
  return (
    <AccountStack.Navigator initialRouteName="ACCOUNT">
      <AccountStack.Screen
        name="ACCOUNT"
        component={MyAccountScreen}
        options={MyAccountScreenOptions}
      />
      <AccountStack.Screen
        name="MY ORDERS"
        component={PurchaseStatusTopTabNavigator}
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
      <AccountStack.Screen
        name="MY RATING"
        component={MyRatingTopTabNavigator}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="RATE PRODUCT"
        component={RateProductScreen}
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
        name="APPLICATION HISTORY"
        component={ApplicationHistoryScreen}
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
        name="ACCOUNTANDSECURITY"
        component={AccountAndSecurityScreen}
        options={{
          headerTintColor: 'black',
          headerTitle: 'ACCOUNT & SECURITY',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="EDITPROFILE"
        component={EditProfileScreen}
        options={{
          headerTintColor: 'black',
          headerTitle: 'Edit Profile',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="EDITNAME"
        component={EditNameScreen}
        options={{
          headerTintColor: 'black',
          headerTitle: 'Edit Name',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="CHANGEUSERNAME"
        component={ChangeUsernameScreen}
        options={{
          headerTintColor: 'black',
          headerTitle: 'Username',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="VERIFYNUMBER"
        component={VerifyNumberScreen}
        options={{
          headerTintColor: 'black',
          headerTitle: 'Verify Phone Number',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="CHANGENUMBER"
        component={ChangeNumberScreen}
        options={{
          headerTintColor: 'black',
          headerTitle: 'Phone Number',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />

      <AccountStack.Screen
        name="EMAILLOGINVERIFICATION"
        component={EmailLoginVerificationScreen}
        options={{
          headerTintColor: 'black',
          headerTitle: 'Verification',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="CHANGEEMAIL"
        component={ChangeEmailScreen}
        options={{
          headerTintColor: 'black',
          headerTitle: 'Change Email',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />

      <AccountStack.Screen
        name="PASSWORDLOGINVERIFICATION"
        component={PasswordLoginVerificationScreen}
        options={{
          headerTintColor: 'black',
          headerTitle: 'Verification',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="CHANGEPASSWORD"
        component={ChangePasswordScreen}
        options={{
          headerTintColor: 'black',
          headerTitle: 'Change Password',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="MYSTORE"
        component={MyStoreScreen}
        options={{
          headerTintColor: 'black',
          headerTitle: 'MY STORE',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="ADD PRODUCT"
        component={AddProductScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="SELECT CATEGORY"
        component={SelectCategoryScreen}
        options={{
          headerTintColor: 'black',
          headerTitle: 'SELECT CATEGORY',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountStack.Screen
        name="MY PRODUCT"
        component={ProductStatusTopTabNavigator}
        options={{
          headerTitle: 'MY PRODUCTS',
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
    </AccountStack.Navigator>
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
      <AdminStack.Screen
        name="APPLICATION DETAIL"
        component={ApplicationDetailScreen}
        options={ApplicationDetailScreenOptions}
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
        name="CHATBOTTOM"
        component={LoginStackNavigator}
        options={({navigation}) => ({
          headerTintColor: 'black',
          headerTitle: 'LOG IN',
          /*          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 15}}
              onPress={() => {
                navigation.navigate('HOMEBOTTOM');
              }}>
              <View>
                <Ionicons name={'arrow-back'} size={24} color="black" />
              </View>
            </TouchableOpacity>
          ),
         */ tabBarStyle: {
            display: 'none',
          },
          headerShown: false,
          tabBarLabel: 'CHAT',
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused
              ? 'chatbox-ellipses'
              : 'chatbox-ellipses-outline';
            return <Ionicons name={iconName} size={24} color="black" />;
          },
        })}
        /*    listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            <View></View>;
            if (!!userToken) {
              navigation.navigate('CHATBOTTOM');
            } else {
              navigation.navigate('CHATBOTTOM', {
                screen: 'LOG IN',
              });
            }
                     Alert.alert(
                'Log In Required',
                'Please Log In First',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                {cancelable: true},
              );  
         
          },
        })} */
      />
      <MainLoginBottomTab.Screen
        name="NOTIFICATIONBOTTOM"
        component={LoginStackNavigator}
        options={{
          headerTintColor: 'black',
          headerShown: false,
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
          tabBarStyle: {
            display: 'none',
          },
        }}
        /*  listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            if (!!userToken) {
              navigation.navigate('NOTIFICATIONBOTTOM');
            } else {
              navigation.navigate('NOTIFICATIONBOTTOM', {
                screen: 'NOTIFICATIONLOGIN',
              });
            }
          },
        })} */
      />
      <MainLoginBottomTab.Screen
        name="BOTTOMLOGINACCOUNT"
        component={LoginStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'ACCOUNT',
          tabBarStyle: {
            display: 'none',
          },
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused ? 'md-person' : 'md-person-outline';
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
          tabBarLabel: 'HOME',
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
        /*    listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            if (!!userToken) {
              navigation.navigate('CHAT');
            } else {
              navigation.navigate('LOG IN');
            }
          },
        })} */
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
        /*       listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            if (!!userToken) {
              navigation.navigate('NOTIFICATION');
            } else {
              navigation.navigate('LOG IN');
            }
          },
        })} */
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
const ProductStatusTopTab = createMaterialTopTabNavigator();
export const ProductStatusTopTabNavigator = () => {
  return (
    <ProductStatusTopTab.Navigator
      initialRouteName="LIVE"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        tabBarHideOnKeyboard: true,
        tabBarScrollEnabled: true,
      }}>
      <ProductStatusTopTab.Screen name="LIVE" component={LiveProductScreen} />
      <ProductStatusTopTab.Screen
        name="DELISTED"
        component={DelistedProductScreen}
      />
    </ProductStatusTopTab.Navigator>
  );
};
const MyRatingTopTab = createMaterialTopTabNavigator();
export const MyRatingTopTabNavigator = () => {
  return (
    <MyRatingTopTab.Navigator>
      <MyRatingTopTab.Screen
        name="TORATE"
        options={{tabBarLabel: 'TO RATE'}}
        component={ToRateScreen}
      />
      <MyRatingTopTab.Screen
        name="MY REVIEWS"
        options={{tabBarLabel: 'MY REVIEWS'}}
        component={RatingScreen}
      />
    </MyRatingTopTab.Navigator>
  );
};
const AccountLoginStack = createNativeStackNavigator();
export const AccountLoginStackNavigator = ({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'MY ORDERS' || routeName === 'ACCOUNTSTACKLOGIN') {
      navigation.setOptions({
        tabBarStyle: {display: 'none', backgroundColor: '#FFFFFF'},
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {display: 'flex', backgroundColor: '#FFFFFF'},
      });
    }
  }, [navigation, route]);
  const userToken = useSelector(state => state.auth.token);
  return (
    <AccountLoginStack.Navigator initialRouteName="ACCOUNT">
      <AccountLoginStack.Screen
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
                navigation.navigate('ACCOUNTSTACKLOGIN');
              }}>
              <View>
                <Ionicons name={'log-in-outline'} size={24} color="black" />
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <AccountLoginStack.Screen
        name="MY ORDERS"
        component={PurchaseStatusTopTabNavigator}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountLoginStack.Screen
        name="SETTINGS"
        component={AccountSettingsScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountLoginStack.Screen
        name="APPLICATION OVERVIEW"
        component={ApplicationOverviewScreen}
        options={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <AccountLoginStack.Screen
        name="ACCOUNTSTACKLOGIN"
        component={LoginStackNavigator}
        options={{
          headerTintColor: 'black',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#D9DDDC',
          },
        }}
      />

      {/*   <AccountStack.Screen
        name="ACCOUNT AND SECURITY"
        component={AccountAndSecurityScreen}
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
    </AccountLoginStack.Navigator>
  );
};
