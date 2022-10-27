import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import Card from '../../Components/UI/Card';
import {AirbnbRating} from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomInputWithLabelAndLength from '../../Components/UI/Inputs/CustomInputWithLabelAndLength';
const RateProductScreen = props => {
  const [inputError, setInputError] = useState(false);

  const product = props.route.params;
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            console.log('Clicked');
          }}>
          <ScrollView>
            <Ionicons name="md-checkmark-sharp" size={24} color="black" />
          </ScrollView>
        </TouchableOpacity>
      ),
    });
  });
  return (
    <ScrollView contentContainerStyle={styles.RateProductScreen}>
      <TouchableWithoutFeedback>
        <Card style={styles.ProductContainer}>
          <Image
            resizeMode="stretch"
            style={styles.ProductImage}
            source={{uri: product.productImage}}
          />
          <Text numberOfLines={1} style={styles.productTextStyle}>
            {product.productName}
          </Text>
        </Card>
      </TouchableWithoutFeedback>
      <Card style={styles.ReviewContainer}>
        <View style={styles.RatingContainer}>
          <Text style={styles.TextStyle}>PRODUCT RATING</Text>
          <AirbnbRating
            count={5}
            defaultRating={5}
            showRating={false}
            size={20}
          />
        </View>

        <CustomInputWithLabelAndLength
          //props send to customInput
          initialValue=""
          initiallyValid={false}
          required
          isError={inputError}
          labelText="Review"
          placeHolder="Enter Review"
          errorText="Please enter review"
          maxLength={200}
          isMultiLine={true}
          textInputStyle={styles.CustomInputStyle}
          //props to add on custom input
          id="Review"
          onInputChange={() => {}}
          returnKeyType="done"
        />
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  RateProductScreen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  ProductContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  ProductImage: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  productTextStyle: {
    color: 'black',
    textAlignVertical: 'center',
  },
  TextStyle: {
    color: 'black',
    marginRight: 40,
  },
  ReviewContainer: {width: '100%', padding: 10},
  RatingContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  CustomInputStyle: {
    justifyContent: 'flex-start',
    height: 200,
    textAlignVertical: 'top',
  },
});
export default RateProductScreen;
