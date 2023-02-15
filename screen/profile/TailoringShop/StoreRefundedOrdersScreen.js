import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StoreRefundedOrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text>StoreRefundedOrdersScreen</Text>
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
});

export default StoreRefundedOrdersScreen;
