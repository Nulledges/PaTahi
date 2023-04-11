import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../../Components/UI/Card';

const HomeScreen = props => {
  const userToken = useSelector(state => state.auth.token);
  const cartItems = useSelector(state => state.cart.items);
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
            {cartItems.length > 0 && (
              <View style={styles.redDotContainer}></View>
            )}
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
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          margin: 15,
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('PRODUCT OVERVIEW');
          }}
          style={styles.containerItems}>
          <Text
            style={{
              color: 'black',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Products
          </Text>
          <Ionicons name="shirt-outline" size={150} color="#900D09" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('STORE OVERVIEW');
          }}
          style={styles.containerItems}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              alignSelf: 'center',
            }}>
            Stores
          </Text>
          <MaterialCommunityIcons
            name="store-outline"
            size={150}
            color="#000080"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  redDotContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 5,
    height: 5,
    zIndex: 100,
    alignSelf: 'flex-end',
    borderRadius: 50,
    padding: 5,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#E8E8E8',
  },
  containerItems: {
    width: '48%',
    height: '30%',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default HomeScreen;
