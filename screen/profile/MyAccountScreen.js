import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as userActions from '../../store/actions/user';
import storage from '@react-native-firebase/storage';
import SecondButton from '../../Components/UI/CustomButton/SecondButton';
import Card from '../../Components/UI/Card';
const MyAccountScreen = props => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.myInformation);

  const [profileBanner, setProfileBanner] = useState();
  const [profileIcon, setProfileIcon] = useState();

  //fetching Data
  useEffect(() => {
    try {
      const unsubcribe = dispatch(userActions.fetchUserData);
      return unsubcribe;
    } catch (error) {
      console.log('Error at MyAccountScreen: ' + error);
    }
  }, []);

  //images
  useEffect(() => {
    if (userInfo === null) {
      return;
    } else {
      const downloadProfiletURI = async () => {
        setTimeout(async () => {
          const icon = await storage()
            .ref(`profile/` + userInfo.profileIcon)
            .getDownloadURL()
            .catch(error => {
              console.log('Error on profile Icon:' + error);
            });
          const banner = await storage()
            .ref(`profile/` + userInfo.profileBanner)
            .getDownloadURL()
            .catch(error => {
              console.log('Error on banner Icon:' + error);
            });
          setProfileIcon(icon);
          setProfileBanner(banner);
        }, 2000);
      };

      downloadProfiletURI();
    }
  }, [userInfo]);

  useEffect(() => {
    props.navigation.setOptions({
      headerTintColor: 'black',
      headerTransparent: true,
      headerTitle: '',
      headerStyle: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerLeft: () => {
        return userInfo === null
          ? ''
          : userInfo.isTailor && (
              <TouchableOpacity
                style={styles.headerLeftButtonContainer}
                onPress={() => {
                  props.navigation.navigate('MYSTORE');
                }}>
                <View style={styles.headerLeftButtonItems}>
                  <MaterialIcons name={'store'} size={24} color="black" />
                  <Text style={styles.headerLeftButtonText}>
                    My Store {'>'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
      },

      headerRight: () => (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 30,
            padding: 3,
          }}
          onPress={() => {
            props.navigation.navigate('SETTINGS');
          }}>
          <View>
            <Ionicons name={'md-settings-outline'} size={24} color="black" />
          </View>
        </TouchableOpacity>
      ),
    });
  });
  return (
    <View style={styles.myAccountScreen}>
      <View style={styles.myAccountScreenContainer}>
        <View style={styles.ProfileContainer}>
          <View style={styles.ProfileBannerContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate('EDITPROFILE');
              }}>
              <Image
                resizeMode="stretch"
                style={styles.ProfileBannerImage}
                source={{uri: profileBanner}}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.ProfileImageContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate('EDITPROFILE');
              }}>
              <Image
                resizeMode="stretch"
                style={styles.ProfileImage}
                source={{uri: profileIcon}}
              />
            </TouchableWithoutFeedback>
            <View>
              <View style={styles.nameContainer}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    props.navigation.navigate('ACCOUNTANDSECURITY');
                  }}>
                  <Text style={styles.NameTextStyle}>
                    {userInfo === null ? '' : userInfo.username}
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>

        <Card style={styles.buttonContainer}>
          {userInfo === null
            ? ''
            : !userInfo.isTailor && (
                <SecondButton
                  label="BECOME A TAILOR"
                  onPress={() => {
                    props.navigation.navigate('BECOME A TAILOR');
                  }}
                />
              )}
          <SecondButton
            label="MY ORDERS"
            onPress={() => {
              props.navigation.navigate('MY ORDERS');
            }}
          />
          <SecondButton
            label="MY RATING"
            onPress={() => {
              props.navigation.navigate('MY RATING');
            }}
          />
        </Card>
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
  },
  ProfileContainer: {
    width: '100%',
    height: 125,
  },
  ProfileBannerContainer: {
    width: '100%',
    height: 125,
    position: 'absolute',
    zIndex: -1000,
  },
  ProfileBannerImage: {
    height: '100%',
    width: '100%',
  },
  ProfileImageContainer: {
    marginTop: 45,
    padding: 10,
    flexDirection: 'row',
  },
  ProfileImage: {
    backgroundColor: '#ffffff',
    borderRadius: 200,
    height: 55,
    width: 55,
  },
  nameContainer: {
    marginLeft: 10,
    padding: 1,
    borderRadius: 10,
    backgroundColor: 'rgb(255,255,255)',
  },
  NameTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
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
  headerLeftButtonContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 30,
    borderRadius: 10,
    width: 125,
  },
  headerLeftButtonItems: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  headerLeftButtonText: {
    color: 'black',
    textAlignVertical: 'center',
    textTransform: 'uppercase',
  },
});

/* export const screenOptions = navigationData => {
  return {
    headerTintColor: 'black',
    headerTransparent: true,
    headerTitle: '',
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },

    headerLeft: () => (
      <TouchableOpacity
        style={styles.headerLeftButtonContainer}
        onPress={() => {
          navigationData.navigation.navigate('MYSTORE');
        }}>
        <View style={styles.headerLeftButtonItems}>
          <MaterialIcons name={'store'} size={24} color="black" />
          <Text style={styles.headerLeftButtonText}>My Store {'>'}</Text>
        </View>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigationData.navigation.navigate('SETTINGS');
        }}>
        <View>
          <Ionicons name={'md-settings-outline'} size={24} color="white" />
        </View>
      </TouchableOpacity>
    ),
  };
}; */
export default MyAccountScreen;
