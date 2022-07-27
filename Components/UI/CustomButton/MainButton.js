import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MainButton = props => {
  return (
    <TouchableOpacity
      style={{...styles.MainButton, ...props.style}}
      onPress={props.onPress}>
      <Text style={{...styles.TextStyle, ...props.style}}>{props.label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  MainButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxHeight: 50,
    height: 50,
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'black',
  },
  TextStyle: {
    fontWeight: 'bold',
    fontSize: 15,

    color: 'white',
  },
});

export default MainButton;
