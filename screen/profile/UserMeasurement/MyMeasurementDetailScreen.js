import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import Card from '../../../Components/UI/Card';
import TwoLabelButton from '../../../Components/UI/CustomButton/TwoLabelButton';
import * as measurementActions from '../../../store/actions/measurement';
const MyMeasurementDetailScreen = props => {
  const dispatch = useDispatch();
  const measurementId = props.route.params?.measurementId;
  const specificMeasurement = useSelector(
    state => state.measure.specificMeasurement,
  );

  useEffect(() => {
    const unsubcribe = dispatch(
      measurementActions.fetchSpecificMeasurement(measurementId),
    );
    return unsubcribe;
  }, []);

  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        <TwoLabelButton
          firstLabel="Name"
          secondLabel={specificMeasurement.name}
          onPress={() => {}}
        />
      </Card>
      <Card style={styles.cardContainer}>
        <Text
          style={{
            color: 'black',
            textTransform: 'uppercase',
            paddingHorizontal: 20,
            paddingVertical: 10,
            fontWeight: 'bold',
            borderBottomWidth: 1,
          }}>
          Measurements
        </Text>
        {specificMeasurement.measurement == undefined
          ? ''
          : Object.keys(specificMeasurement.measurement).map(item => {
            /*   console.log(specificMeasurement.measurement[item] == 30); */
              return (
                <TwoLabelButton
                  key={item}
                  FirstTextStyle={{paddingLeft: 25}}
                  firstLabel={item}
                  secondTextStyle={{paddingRight: 25}}
                  secondLabel={
                    specificMeasurement.measurement[item] + ' inches'
                  }
                />
              );
            })}
      </Card>
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
});
export default MyMeasurementDetailScreen;
