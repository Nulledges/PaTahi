import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import storage from '@react-native-firebase/storage';
import Card from '../UI/Card';
import MainButton from '../UI/CustomButton/MainButton';

const MyProductItems = props => {
  const [productImage, setProductImage] = useState();
  useEffect(() => {
    const downloadProductImage = async () => {
      setTimeout(async () => {
        const fromStorage = await storage()
          .ref(`products/primary/` + props.images)
          .getDownloadURL();
        setProductImage(fromStorage);
      }, 3000);
    };
    downloadProductImage();
  }, [props.images]);

  return (
    <Card style={styles.MyProductItems}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={{uri: productImage}} />
        </View>
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {props.title}
          </Text>
          <Text numberOfLines={1} style={styles.price}>
            PHP {props.price}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          style={styles.button}
          label={props.publishLabel}
          onPress={props.onPressPublish}
        />
        <MainButton
          style={styles.editButton}
          textStyleProp={{color: 'black'}}
          label={props.editLabel}
          onPress={props.onPressEdit}
        />
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  MyProductItems: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  imageContainer: {
    width: '20%',
    height: 75,
    borderRadius: 10,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  infoContainer: {
    width: '80%',
    padding: 5,
  },
  title: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  price: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
  },
  button: {
    width: '47%',
    margin: 5,
    height: 40,
    borderRadius: 10,
  },
  editButton: {
    width: '47%',
    margin: 5,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
});
export default MyProductItems;
