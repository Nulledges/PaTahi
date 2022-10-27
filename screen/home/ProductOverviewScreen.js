import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Text,
  StatusBar,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import TwoColProductItem from '../../Components/Item/TwoColProductItem';

import * as productActions from '../../store/actions/product';
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
    id: '58694a0f-3da1-471f5571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f5571e9d72',
    title: 'Third Item',
  },
];
const ProductOverviewScreen = props => {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.products.allProducts);
  useEffect(() => {
    try {
      const unsubcribe = dispatch(productActions.fetchAllProducts);
      return unsubcribe;
    } catch (error) {
      console.log('Error at ProductOverviewScreen: ' + error);
    }
  }, []);

  const renderItem = ({item}) => (
    <TwoColProductItem
      title={item.productTitle}
      price={parseInt(item.productPrice).toFixed(2)}
      images={item.productImages}
      onPress={() => {
        props.navigation.navigate('PRODUCT DETAIL', {productId: item.id});
      }}
    />
  );
  return (
    <View style={styles.ProductOverviewScreen}>
      <View style={styles.itemContainer}>
        <FlatList
          data={allProducts}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProductOverviewScreen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  itemContainer: {
    width: '100%',
  },
});

export default ProductOverviewScreen;
