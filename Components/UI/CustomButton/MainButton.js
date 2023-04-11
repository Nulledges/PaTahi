import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MainButton = props => {
  return (
    <TouchableOpacity
      disabled={props.isDisabled}
      style={{...styles.MainButton, ...props.style}}
      onPress={props.onPress}>
      <Text style={{...styles.TextStyle, ...props.textStyleProp}}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  MainButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxHeight: 100,
    height: 50,
    padding: 5,
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
