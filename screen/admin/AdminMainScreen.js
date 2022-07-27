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
import Card from '../../Components/UI/Card';
import SecondButton from '../../Components/UI/CustomButton/SecondButton';

const AdminMainScreen = props => {
  return (
    <View style={styles.adminMainScreen}>
      <Card style={styles.adminMainScreenContainer}>
        <SecondButton
          label="STORE APPLICATIONS"
          onPress={() => {
            props.navigation.navigate('STORE APPLICATIONS');
          }}
        />
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  adminMainScreen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 5,
    backgroundColor: '#E8E8E8',
  },
  adminMainScreenContainer: {
    width: '100%',
    maxHeight: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AdminMainScreen;
