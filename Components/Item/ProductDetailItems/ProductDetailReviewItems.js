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
import {AirbnbRating} from 'react-native-ratings';
const ProductDetailReviewItems = props => {
  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        <View style={styles.starInfoContainer}>
          <Text style={styles.textStyle}>Reviews</Text>
          <View style={styles.star}>
            <AirbnbRating
              defaultRating={0}
              size={13}
              showRating={false}
              isDisabled={true}
              count={5}
            />
            <Text style={styles.reviewNumbers}>({0})</Text>
          </View>
        </View>
      </View>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewInfoContainer}>
          {
            <Text style={styles.reviewText}>
              There are no reviews for this product. Be the first reviewer
            </Text>
          }
        </View>
      </View>
      {
        <TouchableOpacity style={styles.showMoreContainer} onPress={() => {}}>
          <View style={styles.showMoreInfoContainer}>
            <Text style={styles.showMoreText}>See All Reviews</Text>
          </View>
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  starContainer: {
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
  },
});

export default ProductDetailReviewItems;
