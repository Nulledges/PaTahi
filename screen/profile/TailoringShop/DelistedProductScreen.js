import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Image, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import TwoColProductItem from '../../../Components/Item/TwoColProductItem';
import MainButton from '../../../Components/UI/CustomButton/MainButton';
import MyProductItems from '../../../Components/Item/MyProductItems';

import * as productActions from '../../../store/actions/product';

const DelistedProductScreen = props => {
  const dispatch = useDispatch();
  const userProduct = useSelector(state =>
    state.products.userStoreProducts.filter(
      product => product.isActive === false,
    ),
  );


  const renderItem = ({item}) => (
    <MyProductItems
      editLabel="Edit"
      publishLabel="Publish"
      title={item.productTitle}
      price={+item.productPrice}
      images={item.productImages}
      onPressPublish={() => {
        dispatch(productActions.publishProduct(item.id));
      }}
      onPressEdit={() => {
        props.navigation.navigate('ADD PRODUCT', {productId: item.id});
      }}
    />
  );
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <FlatList
          style={{height: '90%', marginBottom: 50}}
          data={userProduct}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View style={styles.buttonContainer}>
          <MainButton
            style={styles.button}
            label="ADD PRODUCT"
            onPress={() => {
              props.navigation.navigate('ADD PRODUCT');
            }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
  itemContainer: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    bottom: 0,
    position: 'absolute',
  },
  button: {
    width: '100%',
    bottom: 0,
  },
});

export default DelistedProductScreen;
