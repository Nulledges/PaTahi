import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const TwoLabelButton = props => {
  return (
    <TouchableOpacity
      style={{...styles.AccountInfoButton, ...props.touchableStyle}}
      onPress={props.onPress}>
      <View
        style={{
          ...styles.AccountInfoContainer,
          ...props.AccountInfoContainerStyle,
        }}>
        <Text style={{...styles.TextStyle, ...props.FirstTextStyle}}>
          {props.firstLabel}
        </Text>
        <Text style={{...styles.TextStyle, ...props.secondTextStyle}}>
          {props.secondLabel}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  AccountInfoButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  AccountInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  TextStyle: {
    fontSize: 15,
    color: 'black',
    textTransform: 'uppercase',
    padding: 10,
  },
});

export default TwoLabelButton;
