import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import TwoColProductItem from '../../Components/Item/TwoColProductItem';
import * as AllProductAction from '../../store/actions/product';

const HomeStoreDetailScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(AllProductAction.fetchStoreProducts);
    } catch (error) {
      console.log('Error on HomeStoreDetailScreen: ' + error);
    }
  }, []);
  const renderItem = ({item}) => (
    <TwoColProductItem title={item.title} price={number.toFixed(2)} />
  );
  return (
    <View style={styles.HomeStoreDetailScreen}>
      <Text>HomeStoreDetailScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  HomeStoreDetailScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
});
export const screenOptions = navigationData => {
  const storeName = navigationData.route.params
    ? navigationData.route.params.storeName
    : null;
  return {
    headerTitle: storeName.toUpperCase(),
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigationData.navigation.navigate('MORE INFO');
        }}>
        <View>
          <Ionicons name="md-information-circle" size={24} color="black" />
        </View>
      </TouchableOpacity>
    ),
  };
};
export default HomeStoreDetailScreen;
