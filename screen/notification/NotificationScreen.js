import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainButton from '../../Components/UI/CustomButton/MainButton';
import Card from '../../Components/UI/Card';
const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.noItemContainer}>
        <Text style={styles.textStyle}>No Notifications</Text>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#E8E8E8',
  },
  noItemContainer: {
    width: '100%',
    height: 250,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noItemButton: {
    width: 175,
    height: 35,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  textStyle: {
    color: 'black',
  },
});
export default NotificationScreen;
