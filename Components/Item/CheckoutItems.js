import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Card from '../UI/Card';
import Feather from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';
const CheckoutItems = props => {
  const [productImage, setProductImage] = useState();
  useEffect(() => {
    const downloadProductImage = async () => {
      const fromStorage = await storage()
        .ref(`products/primary/` + props.images)
        .getDownloadURL();
      setProductImage(fromStorage);
    };
    downloadProductImage();
  }, [props.images]);
  return (
    <Card style={styles.container}>
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={props.onPress} style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={{uri: productImage}} />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.textStyle}>{props.productTitle}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Text style={styles.textStyle}>
              ₱ {parseInt(props.productPrice).toFixed(2)}
            </Text>
            <Text style={styles.textStyle}>X {props.quantity}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 2.5,

  },

  itemContainer: {
    flexDirection: 'row',
    margin: 5,
  
  },
  imageContainer: {
    width: '20%',
    height: 75,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flexDirection:'column',
    justifyContent:'space-between',
    width:'80%',
    padding:5
  },
  titleContainer: {
    
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: 'black',
  },
});

export default CheckoutItems;
