import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

const RatingAndReviewItem = props => {
  return (
    <View>
      <View>
        <View>
          <Image
            resizeMode="stretch"
            style={styles.ProfilePicture}
            source={{uri: props.customerImage}}
          />
        </View>
        <View>
          <Text>{props.customerName}</Text>
          <AirbnbRating count={5} />
        </View>
        <View>
          <Text>{props.productReview}</Text>
        </View>
        <TouchableWithoutFeedback onPress={props.onPress}>
          <View>
            <Image resizeMode="stretch" source={{uri: props.productImage}} />
            <Text>{props.productName}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View>{props.dateCreated}</View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  RatingAndReviewItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfilePicture: {
    borderRadius: 200,
    height: 75,
    width: 75,
  },
});

export default RatingAndReviewItem;
