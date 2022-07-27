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

const ApplicationScreen = () => {
  return (
    <View style={styles.ApplicationScreen}>
      <Text>ApplicationScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  ApplicationScreen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 5,
    backgroundColor: '#E8E8E8',
  },
});

export default ApplicationScreen;
