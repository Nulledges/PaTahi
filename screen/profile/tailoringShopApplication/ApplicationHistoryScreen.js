import React, {useReducer, useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Keyboard,
  useWindowDimensions,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import SecondButton from '../../../Components/UI/CustomButton/SecondButton';
import ApplicationButton from '../../../Components/UI/CustomButton/ApplicationsButton';
import * as storeApplicationActions from '../../../store/actions/storeApplication';
const ApplicationHistoryScreen = props => {
  const dispatch = useDispatch();
  const myVerificationHistory = useSelector(
    state => state.application.userVerificationHistory,
  );
  const verificationHistory = props.route.params;
  console.log(myVerificationHistory);

  useEffect(() => {
    dispatch(
      storeApplicationActions.fetchVerificationHistory(
        verificationHistory.storeInfo.storeId,
      ),
    );
  }, []);
  const renderItem = ({item}) => (
    <SecondButton label={item.dateSubmitted} onPress={() => {}} />
  );
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.FlatListStyle}
        data={myVerificationHistory}
        keyExtractor={item => item.id}
        key={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 5,
    backgroundColor: '#E8E8E8',
  },
  FlatListStyle: {
    width: '100%',
  },
  Centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CenteredStyle: {
    color: 'black',
  },
});

export default ApplicationHistoryScreen;
