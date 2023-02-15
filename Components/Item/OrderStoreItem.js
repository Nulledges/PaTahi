import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Card from '../UI/Card';

const OrderStoreItem = props => {
  return <Card style={styles.container}></Card>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
});

export default OrderStoreItem;
