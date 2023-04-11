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
import Feather from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../../Components/UI/Card';
import TwoLabelButton from '../../../Components/UI/CustomButton/TwoLabelButton';
import SecondButton from '../../../Components/UI/CustomButton/SecondButton';
import MainButton from '../../../Components/UI/CustomButton/MainButton';
import * as measurementActions from '../../../store/actions/measurement';
const MyMeasurementBookScreen = props => {
  const dispatch = useDispatch();
  const measurementInfo = useSelector(state => state.measure.myMeasurement);
  useEffect(() => {
    try {
      const unsubcribe = dispatch(measurementActions.fetchUserMeasurement);
      return unsubcribe;
    } catch (error) {
      console.log('Error at MyMeasurementBookScreen: ' + error);
    }
  }, []);

  const renderItem = ({item}) => {
    return (
      <Card style={styles.cardContainer}>
        <TwoLabelButton
          firstLabel={item.name}
          secondLabel={'>'}
          onPress={() => {
            props.navigation.navigate('MEASUREMENT DETAIL', {
              measurementId: item.measurementId,
            });
          }}
        />
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={measurementInfo}
        renderItem={renderItem}
        keyExtractor={item => item.measurementId}
      />
      <MainButton
        style={styles.circularButton}
        label={<Feather name={'plus'} size={50} color="white" />}
        onPress={() => {
          props.navigation.navigate('ADD MEASUREMENT');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#E8E8E8',
  },
  itemContainer: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 5,
  },
  cardContainer: {
    margin: 1,
    borderRadius: 10,
    borderWidth: 1,
  },
  circularButton: {
    alignSelf: 'flex-end',
    width: 75,
    height: 75,
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderColor: 'white',
    borderRadius: 50,
    borderWidth: 2,
  },
});

export default MyMeasurementBookScreen;
