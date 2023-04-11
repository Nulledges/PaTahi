import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Image,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../Components/UI/Card';
import TwoLabelButton from '../../Components/UI/CustomButton/TwoLabelButton';
import * as measurementActions from '../../store/actions/measurement';

import MainButton from '../../Components/UI/CustomButton/MainButton';
const AddProductChooseMeasurementScreen = props => {
  const dispatch = useDispatch();
  const specificProduct = props.route.params?.specificProduct;
  const measurementInfo = useSelector(state => state.measure.myMeasurement);

  useEffect(() => {
    try {
      dispatch(measurementActions.fetchUserMeasurement);
    } catch (error) {
      console.log('Error on AddProductChooseMeasurementScreen: ' + error);
    }
  }, []);
  const renderItem = ({item}) => {
    return (
      <Card style={styles.cardContainer}>
        <TwoLabelButton
          firstLabel={item.name}
          secondLabel={'>'}
          onPress={() => {
            props.navigation.navigate('CONFIRM ORDER', {
              specificProduct: specificProduct,
              specificMeasurement: item,
            });
          }}
        />
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      {measurementInfo.length === 0 && (
        <Card style={styles.noItemContainer}>
          <Text style={styles.textStyle}>No body measurements</Text>
          <MainButton
            label={'Add measurement'}
            style={styles.noItemButton}
            textStyleProp={styles.textStyle}
            onPress={() => {
              props.navigation.navigate('MY MEASUREMENT');
            }}
          />
        </Card>
      )}
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={measurementInfo}
        renderItem={renderItem}
        keyExtractor={item => item.measurementId}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  cardContainer: {
    margin: 1,
    borderRadius: 10,
    borderWidth: 1,
  },
  noItemContainer: {
    width: '100%',
    height: 250,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'black',
  },
  noItemButton: {
    width: 175,
    height: 35,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
export default AddProductChooseMeasurementScreen;
