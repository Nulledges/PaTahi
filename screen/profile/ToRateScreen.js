import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ToRateItem from '../../Components/Item/ToRateItem';
const ToRateScreen = props => {

  return (
    <View style={styles.ToRateScreen}>
      <ToRateItem
        profileImage="https://wallpaperaccess.com/full/317501.jpg"
        userName="Bryan"
        productImage="https://wallpaperaccess.com/full/317501.jpg"
        productName="Name of the Product"
        onToRatePress={() => {
          props.navigation.navigate('RATE PRODUCT', {
            productName: 'Name of the Product',
            productImage: 'https://wallpaperaccess.com/full/317501.jpg',
          });
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  ToRateScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
});

export default ToRateScreen;
