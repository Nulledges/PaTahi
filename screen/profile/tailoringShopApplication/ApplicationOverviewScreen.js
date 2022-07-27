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
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SecondButton from '../../../Components/UI/CustomButton/SecondButton';

import * as storeAppicationActions from '../../../store/actions/storeApplication';

const ApplicationOverviewScreen = props => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState();

  const userApplication = useSelector(
    state => state.application.userApplication,
  );
  /* 
  if (userApplication === null) {
  } else {
    console.log(userApplication);
  } */

  useEffect(() => {
    let user;
    if (userApplication === null) {
    } else {
      for (const data in userApplication) {
        user = userApplication[data].dateSubmitted;
      }
      console.log(user);
    }
  }, [userApplication]);

  useEffect(() => {
    try {
      dispatch(storeAppicationActions.fetchTailorApplication());
    } catch (error) {
      console.log('Error on ApplicationOverviewScreen: ' + error);
    }
  }, []);

  return (
    <View style={styles.applicationOverviewScreen}>
      <View style={styles.applicationOverviewScreenContainer}>
        <Text style={styles.outsideTextStyle}>Application Status</Text>
        <View style={styles.statusConatainer}>
          <Text style={styles.insideTextStyle}>status</Text>
        </View>
        <View style={styles.buttonContainer}>
          <SecondButton
            label="Application FORM"
            onPress={() => {
              props.navigation.navigate('APPLICATION FORM');
            }}
          />
          <SecondButton label="Application History" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  applicationOverviewScreen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  applicationOverviewScreenContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  statusConatainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: '100%',
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderWidth: 1,
  },
  outsideTextStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    marginLeft: '2%',
    color: 'black',
  },
  insideTextStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    alignSelf: 'center',
    color: 'black',
  },
  buttonContainer: {
    width: '100%',
  },
});

export default ApplicationOverviewScreen;
