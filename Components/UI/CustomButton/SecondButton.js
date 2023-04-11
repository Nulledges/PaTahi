import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const SecondButton = props => {
  return (
    <TouchableOpacity
      style={{...styles.SecondButton, ...props.containerStyle}}
      onPress={props.onPress}>
      <Text style={{...styles.TextStyle, ...props.customTextStyle}}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  SecondButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    maxHeight: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
  },
  TextStyle: {
    fontSize: 15,
    color: 'black',
    textTransform: 'uppercase',
    padding: 10,
  },
});

export default SecondButton;
