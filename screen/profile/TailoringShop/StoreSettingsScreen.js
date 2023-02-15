import React from 'react';
import {View, StyleSheet} from 'react-native';

import SecondButton from '../../../Components/UI/CustomButton/SecondButton';

const StoreSettingScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.AccountSettingsScreenContainer}>
        <View style={styles.buttonContainer}>
          <SecondButton
            label="STORE PROFILE"
            onPress={() => {
              props.navigation.navigate('STORE EDIT');
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
  AccountSettingsScreenContainer: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
  },
  AccountSettingsLogoutTextStyle: {
    color: 'red',
  },
});

export default StoreSettingScreen;
