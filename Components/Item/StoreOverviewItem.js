import React, {
  useState,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import {AirbnbRating} from 'react-native-ratings';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Card from '../UI/Card';

const StoreOverviewItem = props => {
  return (
    <Card style={styles.store}>
      <View style={styles.storeContainer}>
        <TouchableWithoutFeedback onPress={props.onPress}>
          <View>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="stretch"
                style={styles.image}
                source={{uri: 'https://wallpaperaccess.com/full/317501.jpg'}}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.storeName}>{props.storeName}</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.reviewContainer}>
                <View style={styles.review}>
                  <AirbnbRating
                    defaultRating={4}
                    size={15}
                    showRating={false}
                    isDisabled={true}
                    count={5}
                  />
                  <Text>`({12})`</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  store: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  storeContainer: {
    height: 300,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: 170,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    height: 105,
  },
  infoBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: '45%',
  },
  storeName: {
    fontSize: 20,
    marginVertical: 2,
    fontWeight: 'bold',
    textTransform:'uppercase',
    color:'black'
  },
  reviewContainer: {
    justifyContent: 'flex-start',
    height: 30,
    borderTopWidth: 1,
  },
  review: {
    flexDirection: 'row',
  },
});

export default StoreOverviewItem;
