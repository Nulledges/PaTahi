import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import Card from '../UI/Card';
const ToRateItem = props => {
  return (
    <Card style={styles.ToRateItem}>
      <View style={styles.ItemsContainer}>
        <View style={styles.ProfileImageContainer}>
          <Image
            resi0eMode="stretch"
            style={styles.ProfileImage}
            source={{uri: props.profileImage}}
          />
        </View>
        <View style={{width: '100%', paddingRight: 45}}>
          <View style={styles.nameContainer}>
            <Text style={styles.NameTextStyle}>{props.userName}</Text>
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.ProductContainer}>
              <Image
                resizeMode="stretch"
                style={styles.ProductImage}
                source={{uri: props.productImage}}
              />
              <Text numberOfLines={1} style={styles.productTextStyle}>
                {props.productName}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={props.onToRatePress}>
            <View style={styles.ToRateContainer}>
              <Text style={styles.NameTextStyle}>TO RATE {'>'}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  ToRateItem: {
    padding: 10,
    width: '100%',
  },
  ItemsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  ProfileImageContainer: {
    marginRight: 10,
  },
  ProfileImage: {
    borderRadius: 200,
    height: 30,
    width: 30,
  },
  nameContainer: {
    marginBottom: 15,
  },
  NameTextStyle: {
    color: 'black',
  },
  ProductContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  ProductImage: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  productTextStyle: {
    color: 'black',
    textAlignVertical: 'center',
  },
  ToRateContainer: {
    alignItems: 'flex-end',
  },
});
export default ToRateItem;
