import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Image, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';

import MainButton from '../../../Components/UI/CustomButton/MainButton';
import MyProductItems from '../../../Components/Item/MyProductItems';

import * as productActions from '../../../store/actions/product';

const LiveProductScreen = props => {
  const dispatch = useDispatch();
  const userStoreId = useSelector(state => state.store.myStore);
  const userProduct = useSelector(state =>
    state.products.userStoreProducts.filter(
      product => product.isActive === true,
    ),
  );
  console.log(userStoreId);
  useEffect(() => {
    try {
      const unsubcribe = dispatch(
        productActions.fetchUserStoreProducts(userStoreId.storeId),
      );
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
        props.navigation.navigate('ADD PRODUCT', {
          productId: item.id,
        });
      }}
    />
  );
  return (
    <View style={styles.container}>
      {userProduct == '' && (
        <View style={styles.cardContainer}>
          <Text style={styles.textStyle}>No live products</Text>
        </View>
      )}
      {userProduct != '' && (
        <FlatList
          data={userProduct}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
      <MainButton
        style={styles.circularButton}
        label={<Feather name={'plus'} size={50} color="white" />}
        onPress={() => {
          props.navigation.navigate('ADD PRODUCT', {
            storeId: userStoreId.storeId,
          });
        }}
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
    flex: 1,
    width: '97%',
    maxHeight: 146,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularButton: {
    alignSelf: 'flex-end',
    width: 75,
    height: 75,
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderColor: 'white',
    borderRadius: 50,
    borderWidth: 2,
  },
  textStyle: {
    color: 'black',
  },
});

export default LiveProductScreen;
