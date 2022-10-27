import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ApplicationButton = props => {
  return (
    <TouchableOpacity
      style={{...styles.ApplicationButton, ...props.style}}
      onPress={props.onPress}>
      <Text style={{...styles.TextStyle, ...props.style}}>{props.label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  ApplicationButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    maxHeight: 50,
    height: 50,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  TextStyle: {
    fontSize: 15,
    color: 'black',
    textTransform: 'uppercase',
    padding: 10,
  },
});

export default ApplicationButton;
