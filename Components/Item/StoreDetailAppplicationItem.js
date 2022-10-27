import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Card from '../UI/Card';
const StoreDetailApplicationItem = props => {
  return (
    <Card>
      <TouchableOpacity></TouchableOpacity>
    </Card>
    /*     <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 5,
        backgroundColor: '#E8E8E8',
      }}>
      <Image />
      <Image />
      <Text></Text>
      <Text></Text>
    </ScrollView> */
  );
};

styles = StyleSheet.create({
  StoreApplicationScreen: {},
});

export default StoreDetailApplicationItem;
