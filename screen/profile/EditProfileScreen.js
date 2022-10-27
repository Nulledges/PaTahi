import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Card from '../../Components/UI/Card';
import TwoLabelButton from '../../Components/UI/CustomButton/TwoLabelButton';

const EditProfileScreen = props => {
  return (
    <View style={styles.EditProfileScreen}>
      <View style={styles.ImageContainer}>
        <TouchableWithoutFeedback>
          <Image
            resizeMode="stretch"
            style={styles.ProfilePicture}
            source={{uri: 'https://wallpaperaccess.com/full/317501.jpg'}}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.ProfileText}>Edit</Text>
        <TouchableWithoutFeedback>
          <Image
            resizeMode="stretch"
            style={styles.Profilebanner}
            source={{
              uri: 'https://images.unsplash.com/photo-1608555307638-992062b31329?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
          />
        </TouchableWithoutFeedback>
        <View style={styles.ProfilebannerTextContainer}>
          <Text style={styles.ProfilebannerText}>Change Cover Image</Text>
        </View>
      </View>
      <Card style={{marginTop: 15}}>
        <TwoLabelButton
          firstLabel="Name"
          secondLabel=" >"
          onPress={() => {
            props.navigation.navigate('EDITNAME');
          }}
        />
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  EditProfileScreen: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  ImageContainer: {
    width: '100%',
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfilePicture: {
    borderRadius: 200,
    height: 55,
    width: 55,
    position: 'absolute',
    zIndex: 100,
  },
  ProfileText: {
    position: 'absolute',
    fontWeight: 'bold',
    zIndex: 200,
    color: 'black',
  },
  Profilebanner: {
    width: '100%',
    height: 125,
  },
  ProfilebannerTextContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    backgroundColor: '#654321',
  },
  ProfilebannerText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
