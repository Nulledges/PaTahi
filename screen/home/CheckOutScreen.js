import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Card from '../../Components/UI/Card';
import MainButton from '../../Components/UI/CustomButton/MainButton';
import {useDispatch, useSelector} from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';
import CheckoutItems from '../../Components/Item/CheckoutItems';
const CheckOutScreen = props => {
  const dispatch = useDispatch();
  const cartTotalPrice = useSelector(state => state.cart.totalAmount);
  const specificProduct = useSelector(state => state.products.cartProducts);
  const cartItems = useSelector(state => state.cart.items);
  const approvedStore = useSelector(state => state.store.approvedCartStores);
  /* 
  console.log(props.route.params.cartStoreItems);
  console.log(props.route.params.productIds);
  console.log(props.route.params.totalPrice);
  console.log(props.route.params.storeIdItem);
  console.log(props.route.params.storeName); */
  const placeOrderHandler = () => {
    props.route.params.uniqueStoreId.map(storeIdItem => {
      const cartStoreInfo = approvedStore.find(
        cart => cart.storeId == storeIdItem,
      );
      let cartStoreItems = [];
      let productIds = [];
      let totalPrice = 0;
      cartItems.map(cart => {
        if (cart.storeId == storeIdItem) {
          totalPrice = +totalPrice + +cart.productPrice * +cart.quantity;
          cartStoreItems.push(cart);
          productIds.push(cart.productId);
        }
      });
      dispatch(
        orderActions.addOrder(
          cartStoreItems,
          productIds,
          totalPrice,
          storeIdItem,
          cartStoreInfo.storeName,
        ),
      );
    });

    dispatch(cartActions.emptyCart()),
      props.navigation.reset({routes: [{name: 'HOME'}]});
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={styles.itemsContainer}>
        {props.route.params.uniqueStoreId.map(storeIdItem => {
          let totalPrice = 0;
          let quantity = 0;
          const store = approvedStore.find(
            store => store.storeId == storeIdItem,
          );
          return (
            <View key={storeIdItem}>
              <View key={storeIdItem} style={styles.storeNameContainer}>
                <TouchableWithoutFeedback key={storeIdItem} onPress={() => {}}>
                  <Text style={styles.storeNameText} key={storeIdItem}>
                    {store == undefined ? '' : store.storeName}
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.cartItemsContainer}>
                {cartItems.map(cart => {
                  const addProduct = specificProduct.find(
                    product => product.id === cart.productId,
                  );
                  if (cart.storeId == storeIdItem) {
                    totalPrice =
                      +totalPrice + +cart.productPrice * +cart.quantity;
                    quantity = +quantity + +cart.quantity;
                  }
                  return (
                    cart.storeId === storeIdItem && (
                      <View key={cart.id}>
                        <CheckoutItems
                          key={cart.id}
                          quantity={cart.quantity}
                          images={cart.primaryImages}
                          productTitle={cart.productTitle}
                          productPrice={cart.productPrice}
                        />
                      </View>
                    )
                  );
                })}
              </View>
              <View style={styles.orderTotalContainer}>
                <View style={styles.orderTotalItemContainer}>
                  <Text style={styles.textStyle}>
                    {'Order Total ' + `(${quantity} Items):`}
                  </Text>
                  <Text style={styles.textStyle}>{totalPrice}</Text>
                </View>
              </View>
            </View>
          );
        })}
        <View style={styles.paymentDetailContainer}>
          <Text style={styles.textStyle}>Payment Details</Text>
          <View style={styles.paymentTotalItemContainer}>
            <Text style={styles.textSmallGrey}>Items Subtotal</Text>
            <Text style={styles.textSmallGrey}>₱ {cartTotalPrice}</Text>
          </View>
          <View style={styles.paymentTotalItemContainer}>
            <Text style={styles.textStyle}>Total Payment</Text>
            <Text style={styles.textStyle}>₱ {cartTotalPrice}</Text>
          </View>
        </View>
      </ScrollView>
      <Card style={styles.addToCartButtonContainer}>
        <View style={styles.addToCartButtonItems}>
          <View style={styles.addToCartTextContainer}>
            <Text style={styles.addToCartPriceText}>
              ₱ {parseInt(cartTotalPrice).toFixed(2)}
            </Text>
            <Text style={styles.addToCartText}>Total:</Text>
          </View>
          <View style={styles.addToCartButton}>
            <MainButton onPress={placeOrderHandler} label={'Place Order'} />
          </View>
        </View>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  itemsContainer: {
    marginBottom: 51,
  },
  storeNameContainer: {
    width: '100%',
    padding: 10,
    marginBottom: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  storeNameText: {color: 'black', fontWeight: 'bold'},
  cartItemsContainer: {marginBottom: 2.5, width: '100%'},
  orderTotalContainer: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 2.5,
    marginBottom: 10,
  },
  orderTotalItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  paymentDetailContainer: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 2.5,
    marginBottom: 10,
  },
  paymentTotalItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  addToCartButtonContainer: {
    width: '100%',
    height: 50,
    bottom: 0,
    position: 'absolute',
  },
  addToCartButtonItems: {
    width: '100%',
    flexDirection: 'row',
  },
  addToCartTextContainer: {
    width: '60%',
    alignSelf: 'flex-start',
    flexDirection: 'row-reverse',
  },
  addToCartPriceText: {
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold',
  },
  addToCartText: {
    color: 'black',
    marginRight: 5,
  },
  addToCartButton: {
    width: '40%',
  },
  textStyle: {
    color: 'black',
  },
  textSmallGrey: {
    color: 'rgba(0,0,0,0.3)',
    fontSize: 12,
  },
});

export default CheckOutScreen;
