import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Image,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MainButton from '../../Components/UI/CustomButton/MainButton';
import TwoLabelButton from '../../Components/UI/CustomButton/TwoLabelButton';
import * as cartActions from '../../store/actions/cart';
import Card from '../../Components/UI/Card';
const ConfirmAddOrderScreen = props => {
  const dispatch = useDispatch();
  const specificProduct = props.route.params?.specificProduct;
  const specificMeasurement = props.route.params?.specificMeasurement;
  console.log(specificMeasurement)
  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(specificProduct, specificMeasurement, 1));
    props.navigation.navigate('PRODUCT DETAIL', {
      productId: specificProduct.id,
    });
  };
  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        {specificProduct.bodyMeasurementNeeded.map(item => {
          if (
            specificMeasurement.measurement[item] == undefined ||
            specificMeasurement.measurement[item.toLowerCase()] == 0
          ) {
          }
          return (
            <TwoLabelButton
              key={item}
              FirstTextStyle={{paddingLeft: 25}}
              firstLabel={item.toLowerCase()}
              secondTextStyle={{paddingRight: 25}}
              secondLabel={
                specificMeasurement.measurement[item.toLowerCase()] + ' inches'
              }
            />
          );
        })}
      </Card>

      <MainButton
        style={styles.addToCartButton}
        label={'Add to Cart'}
        onPress={addToCartHandler}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#E8E8E8',
  },
  cardContainer: {
    margin: 1,
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonContainer: {
    width: '100%',
    height: '9%',
    backgroundColor: '#ffffff',
    bottom: 0,
    position: 'absolute',
  },
  addToCartButton: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
  },
});
export default ConfirmAddOrderScreen;
