import React, {useEffect, useCallback} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../Components/UI/Card';
import MainButton from '../../Components/UI/CustomButton/MainButton';
import * as orderActions from '../../store/actions/order';

import OrderCustomerItem from '../../Components/Item/OrderCustomerItem';
const CollectedScreen = props => {
  const dispatch = useDispatch();
  const collectedOrders = useSelector(state => state.order.collectedItems);
  useFocusEffect(
    useCallback(() => {
      console.log('hello remove me');
      return dispatch(orderActions.fetchCollectedOrders);
    }, []),
  );

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
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        {collectedOrders.length === 0 && (
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
          data={collectedOrders}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListFooterComponent={item => {
            return (
              <TouchableOpacity
                style={styles.showMoreContainer}
                onPress={() => {}}>
                {collectedOrders.length >= 1 && (
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
export default CollectedScreen;
