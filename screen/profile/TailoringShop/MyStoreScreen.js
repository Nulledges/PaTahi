import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../../Components/UI/Card';
import SecondButton from '../../../Components/UI/CustomButton/SecondButton';
import * as storeActions from '../../../store/actions/store';

const MyStoreScreen = props => {
  const dispatch = useDispatch();

  const myStoreInformation = useSelector(state => state.store.myStore);

  useEffect(() => {
    try {
      dispatch(storeActions.fetchUserStore);
    } catch (error) {
      console.log('Error on ApplicationOverviewScreen: ' + error);
    }
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('STORE SETTINGS');
          }}>
          <View>
            <Ionicons name={'md-settings-outline'} size={24} color="black" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Card style={styles.orderContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Order Status</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate('STORE ORDERS', {
                screen: 'STORECOLLECTED',
              });
            }}>
            <Text style={styles.textStyle}>View Sales History </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.boxContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate('STORE ORDERS', {
                screen: 'STOREONGOING',
              });
            }}>
            <View style={styles.box}>
              <Text style={styles.boxText}>ON GOING</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate('STORE ORDERS', {
                screen: 'STOREREFUNDED',
              });
            }}>
            <View style={styles.box}>
              <Text style={styles.boxText}>CANCELLED</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate('STORE ORDERS', {
                screen: 'STORECOLLECTED',
              });
            }}>
            <View style={styles.box}>
              <Text style={styles.boxText}>REVIEW</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Card>
      <Card style={styles.cardContainer}>
        <SecondButton
          onPress={() => {
            if (myStoreInformation.status == 'verification needed') {
              Alert.alert('Verification needed', 'Please check store status.', [
                {text: 'OK'},
              ]);
            } else if (myStoreInformation.status == 'pending') {
              Alert.alert('Verification pending', 'Store being verified.', [
                {text: 'OK'},
              ]);
            } else if (myStoreInformation.status == 'rejected') {
              Alert.alert(
                'Verification rejected',
                'Please resubmit your verification form.',
                [{text: 'OK'}],
              );
            } else {
              props.navigation.navigate('MY PRODUCT');
            }
          }}
          label="MY Products"
        />
      </Card>
      <Card style={styles.cardContainer}>
        <SecondButton
          onPress={() => {
            props.navigation.navigate('WALK IN CUSTOMER');
          }}
          label="Walk-in Customers"
        />
      </Card>
      <Card style={styles.cardContainer}>
        <SecondButton
          onPress={() => {
            props.navigation.navigate('APPLICATION OVERVIEW');
          }}
          label="Sales Report"
        />
      </Card>
      <Card style={styles.cardContainer}>
        <SecondButton
          onPress={() => {
            props.navigation.navigate('APPLICATION OVERVIEW');
          }}
          label="Store Status"
        />
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
  orderContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 2,
  },
  textStyle: {
    color: 'black',
    textTransform: 'uppercase',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },
  box: {
    width: 75,
    height: 75,
    borderWidth: 1,
    borderRadius: 75,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    textTransform: 'uppercase',
    color: 'black',
    fontSize: 10,
  },
  cardContainer: {
    margin: 1,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default MyStoreScreen;
