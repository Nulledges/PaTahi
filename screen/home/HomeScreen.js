import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from '../../Components/UI/Card';

const HomeScreen = props => {

  const userToken = useSelector(state => state.auth.token);
 
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (!!userToken) {
              props.navigation.navigate('CART');
            } else {
              props.navigation.navigate('HOMESTACKLOGIN');
            }
          }}>
          <View>
            <Ionicons name="md-cart" size={24} color="black" />
          </View>
        </TouchableOpacity>
      ),
    });
  });

  // it adds 30 days to a current date
  /*  current.setDate(current.getDate() + 30);
  console.log(current.toDateString()); */
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('PRODUCT OVERVIEW');
        }}
        style={styles.containerItems}>
        <Card></Card>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('STORE OVERVIEW');
        }}
        style={styles.containerItems}>
        <Card></Card>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
  containerItems: {
    width: '75%',
    height: '35%',
    maxWidth: 400,
    maxHeight: 400,
    overflow: 'hidden',
    padding: 10,
    borderWidth: 1,
    shadow: 1,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  itemContainer: {
    marginVertical: 5,
  },
  homeScreenStyle: {
    flexDirection: 'column',
    marginBottom: 10,
  },
});

export default HomeScreen;
