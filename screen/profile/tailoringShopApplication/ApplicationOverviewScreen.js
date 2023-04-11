import React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import SecondButton from '../../../Components/UI/CustomButton/SecondButton';

const ApplicationOverviewScreen = props => {
  const myStoreInformation = useSelector(state => state.store.myStore);
  console.log(myStoreInformation)
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.outsideTextStyle}>Store Status</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.insideTextStyle}>
            {myStoreInformation.status}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <SecondButton
            label="Verification FORM"
            onPress={() => {
              if (myStoreInformation.status == 'pending') {
                Alert.alert('Pending', 'Application is being reviewed.', [
                  {text: 'OK'},
                ]);
              } else if (myStoreInformation.status == 'approved') {
                Alert.alert('Approved', 'Application is approved', [
                  {text: 'OK'},
                ]);
              } else {
                props.navigation.navigate('APPLICATION FORM');
              }
            }}
          />
          <SecondButton
            label="Verification History"
            onPress={() => {
              props.navigation.navigate('APPLICATION HISTORY', {
                storeInfo: myStoreInformation,
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  itemContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  statusContainer: {
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
