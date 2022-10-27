import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MoreInfomationScreen = () => {
  return (
    <View style={styles.MoreInfomationScreen}>
      <Text>MoreInfomationScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  MoreInfomationScreen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
});

export default MoreInfomationScreen;
