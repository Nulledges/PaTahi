import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
});

export default Card;
