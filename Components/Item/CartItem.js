import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Card from '../UI/Card';
import Feather from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';
const CartItems = props => {
  const [productImage, setProductImage] = useState();
  useEffect(() => {
    const downloadProductImage = async () => {
      const fromStorage = await storage()
        .ref(`products/` + props.images)
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
        <Text style={styles.textStyle}>{props.productTitle}</Text>
        <Text style={styles.textStyle}>
          ₱ {parseInt(props.productPrice).toFixed(2)}
        </Text>
        <TouchableOpacity onPress={props.minus}>
          <View>
            <Feather name={'minus'} size={24} color="black" />
          </View>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{props.quantity}</Text>
        <TouchableOpacity onPress={props.plus}>
          <View>
            <Feather name={'plus'} size={24} color="black" />
          </View>
        </TouchableOpacity>
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
    margin: 10,
  },
  imageContainer: {
    width: '20%',
    height: 75,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  textStyle: {
    color: 'black',
  },
});

export default CartItems;
