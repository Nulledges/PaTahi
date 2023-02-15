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
import MainButton from '../../UI/CustomButton/MainButton';
const ProductDetailInformationItem = props => {
  return (
    <View>
      <View style={styles.productBasicContainer}>
        <View style={styles.infoContainer}>
          <View style={{margin: 5}}>
            <Text style={styles.name}>{props.productName}</Text>
          </View>
          <View style={{margin: 5}}>
            <Text style={styles.price}>₱ {props.productPrice}</Text>
          </View>
          {/*  <View style={{margin: 5}}>
            <MainButton
              style={{backgroundColor: 'red', borderColor: 'red'}}
              label={'Add to Cart'}
            />
          </View> */}
        </View>
      </View>
      <View style={styles.productDescriptionTextContainer}>
        <View style={styles.productDescriptionInfoTextContainer}>
          <Text style={styles.productDescriptionText}>Description</Text>
        </View>
      </View>
      <View style={styles.productDescriptionContainer}>
        <View style={styles.productDescriptionInfoContainer}>
          <Text style={styles.productDescriptionOverviewText}>
            {props.productDescription}
          </Text>
        </View>
      </View>

      <View style={styles.productDescriptionTextContainer}>
        <View style={styles.productDescriptionInfoTextContainer}>
          <Text style={styles.productDescriptionText}>
            Required Measurements
          </Text>
        </View>
      </View>
      <View style={styles.productDescriptionContainer}>
        <View style={styles.productDescriptionInfoContainer}>
          {props.productBodyMeasurementNeeded.map((measurement, index) => {
            return (
              <Text style={styles.productDescriptionOverviewText} key={index}>
                {measurement}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productBasicContainer: {
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
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  productDescriptionTextContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 5,
  },
  productDescriptionInfoTextContainer: {
    width: '100%',
    padding: 10,
  },
  productDescriptionText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  productDescriptionContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 1,
  },
  productDescriptionInfoContainer: {
    width: '100%',
    padding: 10,
  },
  productDescriptionOverviewText: {
    color: 'black',
  },
});
export default ProductDetailInformationItem;
