import React, {useRef, useState, useEffect, useCallback} from 'react';
import {AirbnbRating} from 'react-native-ratings';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';

const ProductDetailInformationItem = props => {
  return (
    <View style={styles.ProductInformationContainer}>
      <View style={styles.infoContainer}>
        <View style={{margin: 5}}>
          <Text style={styles.name}>{props.productName}</Text>
        </View>
        <View style={{margin: 5}}>
          <Text style={styles.price}>PHP {props.productPrice}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProductInformationContainer: {
    backgroundColor: '#FFFFFF',
  },
  infoContainer: {
    width: '100%',
    padding: 10,
  },
  name: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  price: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
export default ProductDetailInformationItem;
