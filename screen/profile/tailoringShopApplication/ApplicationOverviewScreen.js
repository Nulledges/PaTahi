import React, {useReducer, useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SecondButton from '../../../Components/UI/CustomButton/SecondButton';

import * as storeAppicationActions from '../../../store/actions/storeApplication';

const ApplicationOverviewScreen = props => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState();
  const [allUserApplication, setAllUserApplication] = useState();

  const userApplications = useSelector(
    state => state.application.userApplication,
  );

  useEffect(() => {
    let application;
    if (userApplications.length === 0) {
    } else {
      for (const data in userApplications) {
        application = userApplications[data];
      }
      setStatus(application.status);
      setAllUserApplication(application);
    }
  }, [userApplications]);

  useEffect(() => {
    try {
      dispatch(storeAppicationActions.fetchUserTailorApplication);
    } catch (error) {
      console.log('Error on ApplicationOverviewScreen: ' + error);
    }
  }, []);
  console.log(status);
  return (
    <View style={styles.applicationOverviewScreen}>
      <View style={styles.applicationOverviewScreenContainer}>
        <Text style={styles.outsideTextStyle}>Application Status</Text>
        <View style={styles.statusConatainer}>
          <Text style={styles.insideTextStyle}>{status}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <SecondButton
            label="Application FORM"
            onPress={() => {
              if (status == 'pending') {
                Alert.alert('Pending', 'Application is being reviewed.', [
                  {text: 'OK'},
                ]);
              } else if (status == 'approved') {
                Alert.alert('Approved', 'Application is approved', [
                  {text: 'OK'},
                ]);
              } else {
                props.navigation.navigate('APPLICATION FORM', {
                  hellno: allUserApplication,
                });
              }
            }}
          />
          <SecondButton
            label="Application History"
            onPress={() => {
              props.navigation.navigate('APPLICATION HISTORY', {
                hello: 'hello',
              });
            }}
          />
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
