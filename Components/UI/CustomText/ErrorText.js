import React from 'react';
import {Text, StyleSheet} from 'react-native';

const ErrorText = props => {
  return (
    <Text style={{...styles.ErrorText, ...props.style}}>{props.errorText}</Text>
  );
};
const styles = StyleSheet.create({
  ErrorText: {
    fontWeight: 'normal',
    color: 'red',
  },
});
export default ErrorText;
