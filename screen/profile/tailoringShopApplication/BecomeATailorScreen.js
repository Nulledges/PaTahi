import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import storage from '@react-native-firebase/storage';

import MainButton from '../../../Components/UI/CustomButton/MainButton';

const BecomeATailorScreen = props => {
  const [paTahiImage, setPaTahiImage] = useState();

  useEffect(() => {
    const downloadPatahiImage = async () => {
      const patahiImage = await storage()
        .ref(`Patahi/` + 'PaTahi.png')
        .getDownloadURL();
      setPaTahiImage(patahiImage);
    };
    downloadPatahiImage();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={{uri: paTahiImage}}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.text}>To get started. Register as a Tailor by</Text>
        <Text style={styles.text}>providing necessary information.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          onPress={() => {
            props.navigation.navigate('SET TAILORING SHOP');
          }}
          label={'START REGISTRATION'}
          style={{backgroundColor: 'red', borderColor: 'red'}}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: '100%',
    height: '50%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    width: '70%',
    padding: 5,
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    bottom: 0,
    position: 'absolute',
  },
});

export default BecomeATailorScreen;
