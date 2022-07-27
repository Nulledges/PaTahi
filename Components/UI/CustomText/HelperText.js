import React from 'react';
import {Text, StyleSheet} from 'react-native';

const HelperText = props => {
  return (
    <Text style={{...styles.HelperText, ...props.style}}>
      {props.helperText}
    </Text>
  );
};
const styles = StyleSheet.create({
  HelperText: {
    fontWeight: 'normal',
    color: '#ddd9d3',
  },
});
export default HelperText;
