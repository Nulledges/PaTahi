import React from 'react';
import {View, Text,StyleSheet} from 'react-native';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>NotificationScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
});
export default NotificationScreen;
