import React from 'react';
import {Text, StyleSheet} from 'react-native';

const ErrorText = props => {
  return (
    <Text style={{...styles.ErrorText, ...props.style}}>{props.errorText}</Text>
  );
};
const styles = StyleSheet.create({
  ErrorText: {
    width: '100%',
    fontWeight: 'normal',
    color: 'red',
    backgroundColor: '#ffcccb',
    textAlignVertical: 'center',
  },
});
export default ErrorText;
