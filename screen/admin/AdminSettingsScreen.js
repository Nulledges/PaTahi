import React, {useReducer, useState, useCallback} from 'react';
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
} from 'react-native';
import {useDispatch} from 'react-redux';

import * as authActions from '../../store/actions/authentication';
import Card from '../../Components/UI/Card';
import SecondButton from '../../Components/UI/CustomButton/SecondButton';
const AdminSettingsScreen = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logout());
  };
  return (
    <View style={styles.AdminSettingsScreen}>
      <Card style={styles.adminSettingScreenContainer}>
        <SecondButton
          style={styles.textStyle}
          label="LOGOUT"
          onPress={() => {
            logout();
          }}
        />
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  AdminSettingsScreen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 5,
    backgroundColor: '#E8E8E8',
  },
  adminSettingScreenContainer: {
    width: '100%',
    maxHeight: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'red',
  },
});

export default AdminSettingsScreen;
