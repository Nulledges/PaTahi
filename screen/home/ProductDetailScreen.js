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
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import ProductDetailImageItem from '../../Components/Item/ProductDetailItems/ProductDetailImageItem';
import ProductDetailInformationItems from '../../Components/Item/ProductDetailItems/ProductDetailInformationsItem';
import ProductDetailReviewItems from '../../Components/Item/ProductDetailItems/ProductDetailReviewItems';
import ProductDetailStoreItem from '../../Components/Item/ProductDetailItems/ProductDetailStoreItem';
import MainButton from '../../Components/UI/CustomButton/MainButton';
import Card from '../../Components/UI/Card';
import TwoLabelButton from '../../Components/UI/CustomButton/TwoLabelButton';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/product';
import * as storeActions from '../../store/actions/store';

const ProductDetailScreen = props => {
  const dispatch = useDispatch();

  const productId = props.route.params.productId;
  const storeId = props.route.params.storeId;
  const userToken = useSelector(state => state.auth.token);
  const specificProduct = useSelector(state => state.products.specificProduct);
  const cartItems = useSelector(state => state.cart.items);
  const specificStore = useSelector(state =>
    state.store.approvedSpecificStores.find(store => store.storeId === storeId),
  );
  console.log('productdeatail' + storeId);
  console.log(specificProduct);
  useEffect(() => {
    try {
      dispatch(storeActions.fetchSpecificStore(storeId));
      dispatch(productActions.fetchSpecificProduct(productId));
    } catch (error) {
      console.log('Error on HomeStoreDetailScreen: ' + error);
    }
  }, [productId, storeId]);

  /*   const approvedStores = useSelector(state =>
    state.store.approvedStores.find(
      store => store.storeId === specificProduct.storeId,
    ),
  ); */

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

  //navigation options
  useEffect(() => {
    props.navigation.setOptions({
      headerTintColor: 'white',
      headerTransparent: true,
      headerBackVisible: false,
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

      headerLeft: () => (
        <TouchableOpacity
          style={styles.goBackArrowContainer}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <View>
            <Ionicons name={'arrow-back'} size={24} color="black" />
          </View>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.cartContainer}
          onPress={() => {
            if (!!userToken) {
              props.navigation.navigate('CART');
            } else {
              props.navigation.navigate('HOMESTACKLOGIN');
            }
          }}>
          <View>
            {cartItems.length > 0 && (
              <View style={styles.redDotContainer}></View>
            )}
            <Ionicons name="md-cart" size={24} color="black" />
          </View>
        </TouchableOpacity>
      ),
    });
  });
  const addToCartHandler = () => {
    if (!!userToken) {
      props.navigation.navigate('CHOOSE MEASUREMENT', {
        specificProduct: specificProduct,
      });
    } else {
      props.navigation.navigate('HOMESTACKLOGIN');
    }

    /*  dispatch(cartActions.addToCart(specificProduct, 1)); */
  };
  const goToStoreHandler = () => {
    props.navigation.navigate('STORE DETAIL', {
      storeId: specificProduct.storeId,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={{height: '90%', marginBottom: '20%'}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <ProductDetailImageItem
          primaryImage={
            specificProduct.productPrimaryImage == undefined
              ? []
              : specificProduct.productPrimaryImage
          }
          images={
            specificProduct.productImages == undefined
              ? []
              : specificProduct.productImages
          }
        />

        <ProductDetailInformationItems
          productName={
            specificProduct.productTitle == undefined
              ? ''
              : specificProduct.productTitle
          }
          productPrice={
            specificProduct.productPrice == undefined
              ? ''
              : parseInt(specificProduct.productPrice).toFixed(2)
          }
          productDescription={
            specificProduct.productDescription == undefined
              ? ''
              : specificProduct.productDescription
          }
          productBodyMeasurementNeeded={
            specificProduct.bodyMeasurementNeeded == undefined
              ? []
              : specificProduct.bodyMeasurementNeeded
          }
        />
        <ProductDetailStoreItem
          storeIcon={specificStore == undefined ? '' : specificStore.storeIcon}
          name={specificStore == undefined ? '' : specificStore.storeName}
        />
        <ProductDetailReviewItems />
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
        <MainButton
          style={styles.storeButton}
          label={'Store'}
          onPress={goToStoreHandler}
        />
        <MainButton
          style={styles.addToCartButton}
          label={'Add to Cart'}
          onPress={addToCartHandler}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  goBackArrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  cartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 50,
  },

  redDotContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 5,
    height: 5,
    zIndex: 100,
    alignSelf: 'flex-end',
    borderRadius: 50,
    padding: 5,
  },

  mainContainer: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  buttonContainer: {
    width: '100%',
    height: '9%',
    backgroundColor: '#ffffff',
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
