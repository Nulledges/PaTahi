import React, {useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../../Components/UI/Card';
import MainButton from '../../../Components/UI/CustomButton/MainButton';
import * as orderActions from '../../../store/actions/order';
import OrderCustomerItem from '../../../Components/Item/OrderCustomerItem';
const StoreFinishedOrdersScreen = () => {
  const dispatch = useDispatch();
  const storeOFinishedOrders = useSelector(
    state => state.order.storeFinishedItems,
  );
  useEffect(() => {
    dispatch(orderActions.fetchStoreFinishedOrders);
  }, []);
  const renderItem = ({item}) => {
    return (
      <View>
        <View
          key={item.id}
          style={{
            width: '100%',
            padding: 10,
            marginBottom: 1,
            backgroundColor: 'white',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <TouchableWithoutFeedback
            key={item.id}
            onPress={() => {
              props.navigation.navigate('STORE DETAIL', {
                storeId: item.storeId,
              });
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}} key={item.id}>
              {item.storeName + ' >'}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('hello');
          }}>
          {item.items.map(orderitem => {
            return (
              <OrderCustomerItem
                key={orderitem.id}
                productTitle={orderitem.productTitle}
                productPrice={orderitem.productPrice}
                productQuantity={orderitem.quantity}
                storeImage={orderitem.productImages}
              />
            );
          })}
        </TouchableOpacity>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.textStyle}>{item.totalPrice}</Text>
        </View>
        <View style={styles.finishedContainer}>
          <MainButton
            label={'Collected'}
            style={styles.finishedButton}
            textStyleProp={styles.refundText}
            onPress={() => {
              console.log('FINISHED remove me');
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        {storeOFinishedOrders.length === 0 && (
          <Card style={styles.noItemContainer}>
            <Text style={styles.textStyle}>No order yet.</Text>
            <MainButton
              label={'Browse'}
              style={styles.noItemButton}
              textStyleProp={styles.textStyle}
              onPress={() => {
                props.navigation.navigate('HOME');
              }}
            />
          </Card>
        )}
        <FlatList
          data={storeOFinishedOrders}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListFooterComponent={item => {
            return (
              <TouchableOpacity
                style={styles.showMoreContainer}
                onPress={() => {}}>
                {storeOFinishedOrders.length >= 1 && (
                  <View style={styles.showMoreInfoContainer}>
                    <Text style={styles.showMoreText}>View More</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  noItemContainer: {
    width: '100%',
    height: 250,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noItemButton: {
    width: 175,
    height: 35,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  textStyle: {
    color: 'black',
  },
  itemContainer: {
    width: '100%',
    height: '100%',
  },

  showMoreContainer: {
    marginTop: 1,
    backgroundColor: '#FFFFFF',
  },
  totalPriceContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    padding: 10,
    alignItems: 'flex-end',
  },
  finishedContainer: {
    width: '100%',
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
  finishedButton: {
    width: 175,
    height: 35,
    backgroundColor: 'black',
    borderRadius: 10,
  },

  showMoreInfoContainer: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMoreText: {
    color: 'black',
  },
});

export default StoreFinishedOrdersScreen;
