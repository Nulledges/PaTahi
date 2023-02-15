import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
const ProductDetailStoreItem = props => {
  return (
    <View style={styles.container}>
      <View style={styles.storeContainer}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <Image
            resizeMode="stretch"
            style={styles.storeImage}
            source={{uri: 'https://wallpaperaccess.com/full/317501.jpg'}}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 5},
  storeContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 10,
    flexDirection: 'row',
  },
  storeImage: {
    backgroundColor: 'black',
    borderRadius: 200,
    height: 55,
    width: 55,
  },
  text: {
    color: 'black',
  },
  /*  starContainer: {
    backgroundColor: '#FFFFFF',
  },
  starInfoContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  star: {
    flexDirection: 'row',
  },
  reviewNumbers: {
    color: 'black',
  },
  reviewContainer: {
    marginTop: 1,
    backgroundColor: '#FFFFFF',
  },
  reviewInfoContainer: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
  },
  reviewText: {
    color: 'black',
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
  }, */
});

export default ProductDetailStoreItem;
