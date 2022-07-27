import React from 'react';
import {AirbnbRating} from 'react-native-ratings';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

const TwoColProductItem = props => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={props.onPress}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle}
          source={{uri: 'https://wallpaperaccess.com/full/317501.jpg'}}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {props.title}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text numberOfLines={1} style={styles.price}>
            ₱ {props.price}
          </Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.reviewContainer}>
          <View style={styles.review}>
            <AirbnbRating
              starContainerStyle={{borderColor: 'red'}}
              ratingContainerStyle={{backgroundColor:'red'}}
              defaultRating={4}
              size={15}
              showRating={false}
              isDisabled={true}
              count={5}
            />
            <Text style={styles.reviewTextStyle}>`({12})`</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  twoColProductItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '49%',
    backgroundColor: 'white',
    height: 300,
    padding: 5,
    margin: 1,
    borderWidth: 0.5,
  },
  imageContainer: {
    width: '100%',
    height: 150,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    width: '100%',
    height: 120,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2.5,
    marginTop: 10,
    marginBottom: 5,
  },
  title: {
    color: 'black',
    flexShrink: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  price: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  reviewContainer: {
    justifyContent: 'flex-start',
    height: 30,
    borderTopWidth: 1,
  },
  review: {
    flexDirection: 'row',
  },
  reviewTextStyle: {
    color: 'black',
  },
});

export default TwoColProductItem;
