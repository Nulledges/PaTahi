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
import ProductDetailImageItem from '../../Components/Item/ProductDetailItems/ProductDetailImageItem';
import ProductDetailInformationItems from '../../Components/Item/ProductDetailItems/ProductDetailInformationsItem';
import MainButton from '../../Components/UI/CustomButton/MainButton';
const ProductDetailScreen = props => {
  const dispatch = useDispatch();

  const specificProduct = useSelector(state =>
    state.products.allProducts.find(
      product => product.id === props.route.params.productId,
    ),
  );

  /*  useEffect(() => {
    let images = [];
    specificProduct.productImages.map((image, index) => {
      images.push({uri: image});
    });
    setProductImages(images);
  }, [specificProduct]); */

  /*   firestore()
    .collection('Products')
    .get()
    .then(documentSnapshot => {
      let data = [];
      documentSnapshot.docs.forEach(item => {
        console.log(item)
       for (let i = 0; i < item.data().uri.length; i++) {
          data.push({uri: item.data().uri[i]});
          console.log('data: ' + item.data().uri[i] + 'i: ' + i);
        }
      });
      console.log(data);
    }); */
  useEffect(() => {
    props.navigation.setOptions({
      headerTintColor: 'white',
      headerTransparent: true,
      headerTitle: '',
      headerStyle: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    });
  });
  console.log(specificProduct);
  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={{height: '90%', marginBottom: '19%'}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <ProductDetailImageItem images={specificProduct.productImages} />
        <ProductDetailInformationItems
          productName={specificProduct.productTitle}
          productPrice={parseInt(specificProduct.productPrice).toFixed(2)}
        />
      </ScrollView>

      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: '100%',
          height: '100%',
        }}
        style={styles.buttonContainer}>
        <MainButton style={styles.storeButton} label={'Store'} />
        <MainButton style={styles.addToCartButton} label={'Add to Cart'} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
  buttonContainer: {
    width: '100%',
    height: '10%',
    backgroundColor: '#FFFFFF',
    bottom: 0,
    position: 'absolute',
  },
  storeButton: {
    width: '47%',
    margin: 5,
    bottom: 0,
  },
  addToCartButton: {
    width: '47%',
    margin: 5,
    bottom: 0,
  },
});

export default ProductDetailScreen;
