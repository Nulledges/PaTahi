import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Card from '../../../Components/UI/Card';
import SecondButton from '../../../Components/UI/CustomButton/SecondButton';
import TwoLabelButton from '../../../Components/UI/CustomButton/TwoLabelButton';
const MyStoreScreen = props => {
  return (
    <View style={styles.MyStoreScreen}>
      <Card style={styles.MyStoreContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Order Status</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('hello');
            }}>
            <Text style={styles.textStyle}>View Sales History </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.boxContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('hello');
            }}>
            <View style={styles.box}>
              <Text style={styles.boxText}>ON GOING</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('hello');
            }}>
            <View style={styles.box}>
              <Text style={styles.boxText}>CANCELLED</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('hello');
            }}>
            <View style={styles.box}>
              <Text style={styles.boxText}>REVIEW</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Card>
      <Text style={styles.textStyle}>PRODUCT</Text>
      <SecondButton
        onPress={() => {
          props.navigation.navigate('MY PRODUCT');
        }}
        label="MY Products"
      />
 {/*      <SecondButton
        onPress={() => {
          props.navigation.navigate('ADD PRODUCT');
        }}
        label="Add Product"
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  MyStoreScreen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  MyStoreContainer: {
    width: '100%',
    padding: 10,
  },
  textStyle: {
    color: 'black',
    textTransform: 'uppercase',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  box: {
    width: 80,
    height: 80,
    borderWidth: 1,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    textTransform: 'uppercase',
    color: 'black',
    fontSize: 10,
  },
});

export default MyStoreScreen;
