import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Image, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import TwoColProductItem from '../../../Components/Item/TwoColProductItem';
import MainButton from '../../../Components/UI/CustomButton/MainButton';
import MyProductItems from '../../../Components/Item/MyProductItems';

import * as productActions from '../../../store/actions/product';

const LiveProductScreen = props => {
  const dispatch = useDispatch();
  const userProduct = useSelector(state =>
    state.products.userStoreProducts.filter(
      product => product.isActive === true,
    ),
  );

  useEffect(() => {
    try {
      const unsubcribe = dispatch(productActions.fetchUserStoreProducts);
      return unsubcribe;
    } catch (error) {
      console.log('Error at LiveProductScreen: ' + error);
    }
  }, []);

  const renderItem = ({item}) => (
    <MyProductItems
      editLabel="Edit"
      publishLabel="Delist"
      title={item.productTitle}
      price={+item.productPrice}
      images={item.productPrimaryImage}
      onPressPublish={() => {
        dispatch(productActions.delistProduct(item.id));
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
    backgroundColor:'red'
  },
  button: {
    width: '100%',
    bottom: 0,
  },
});

export default LiveProductScreen;
/* 
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item And its too long',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-47f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-da1-471f-bd96-1455e29d72',
    title: 'Third Item',
  },
  {
    id: '586940f-da1-471f-bd96-1455e29d72',
    title: 'Third Item',
  },
  {
    id: '586940f-da1-471f-bd96-14559d72',
    title: 'Third Item',
  },
]; */
