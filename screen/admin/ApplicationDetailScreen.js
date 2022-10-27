import React, {useReducer, useState, useCallback} from 'react';
import {
  StyleSheet,
  Keyboard,
  useWindowDimensions,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import ImageView from 'react-native-image-viewing';

import Card from '../../Components/UI/Card';
import MainButton from '../../Components/UI/CustomButton/MainButton';
import {firebase} from '@react-native-firebase/storage';
const ApplicationDetailScreen = props => {
  const [businessPermitUri, setbusinessPermitUri] = useState();
  const [storeImageUri, setStoreImageUri] = useState();
  const [permitVisible, setIsPermitVisible] = useState(false);
  const [storeImageVisible, setIsStoreVisible] = useState(false);
  const applicationInformation = props.route.params;
  const downloadBusinessPermitUri = async () => {
    await firebase
      .app()
      .storage()
      .refFromURL(
        'gs://patahi-dev.appspot.com/' +
          props.applicationInformation.businessPermitImage,
      )
      .getDownloadURL()
      .then(URL => {
        setbusinessPermitUri(URL);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const downloadStoreImageUri = async () => {
    await firebase
      .app()
      .storage()
      .refFromURL(
        'gs://patahi-dev.appspot.com/' +
          props.applicationInformation.storeImage,
      )
      .getDownloadURL()
      .then(URL => {
        setStoreImageUri(URL);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.ApplicationDetailScreen}>
      <Card style={styles.ApplicationDetailContainer}>
        <View style={styles.ApplicationDateContainer}>
          <Text style={{color: 'black'}}>DATE SUBMITTED: </Text>
          <Text style={{color: 'black'}}>
            {applicationInformation.dateSubmitted}
          </Text>
        </View>
        <Text style={{color: 'black'}}>BUSINESS PERMIT</Text>
        <View style={styles.imagePreview}>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsPermitVisible(true);
            }}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{
                uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        <ImageView
          images={[
            {
              uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
            },
          ]}
          imageIndex={0}
          visible={permitVisible}
          onRequestClose={() => setIsPermitVisible(false)}
        />
        <Text style={{color: 'black'}}>STORE IMAGE</Text>
        <View style={styles.imagePreview}>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsStoreVisible(true);
            }}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{
                uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        <ImageView
          images={[
            {
              uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
            },
          ]}
          imageIndex={0}
          visible={storeImageVisible}
          onRequestClose={() => setIsStoreVisible(false)}
        />
      
        <View style={styles.buttonContainer}>
          <MainButton
            style={{backgroundColor: 'green'}}
            label="APPROVE"
            onPress={() => {}}
          />
        </View>
        <View style={styles.buttonContainer}>
          <MainButton
            style={{backgroundColor: 'red'}}
            label="REJECT"
            onPress={() => {}}
          />
        </View>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  ApplicationDetailScreen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 5,
    backgroundColor: '#E8E8E8',
  },
  ApplicationDetailContainer: {
    width: '100%',
    height:'100%',
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  ApplicationDateContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    alignContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
});
export const screenOptions = navigationData => {
  storeName = navigationData.route.params
    ? navigationData.route.params.storeName
    : null;
  return {
    headerTitle: storeName.toUpperCase() + ' APPLICATION',
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
  };
};
export default ApplicationDetailScreen;
