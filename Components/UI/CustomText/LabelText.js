import React from 'react';
import {Text, StyleSheet} from 'react-native';

const LabelText = props => {
  return (
    <Text style={{...styles.LabelText, ...props.style}}>{props.labelText}</Text>
  );
};
const styles = StyleSheet.create({
  LabelText: {
    fontWeight: 'normal',
    color: 'white',
  },
});
export default LabelText;
