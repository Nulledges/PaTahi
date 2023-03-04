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
import * as productActions from '../../store/actions/product';
import * as storeActions from '../../store/actions/store';

const HomeStoreDetailScreen = props => {
  const dispatch = useDispatch();
  const storeId =
    props.route.params.storeId === undefined ? '' : props.route.params.storeId;
  const storeProducts = useSelector(state => state.products.storeProducts);
  const approvedStores = useSelector(state =>
    state.store.approvedSpecificStores.find(store => store.storeId === storeId),
  );
  console.log(storeProducts);
  useEffect(() => {
    try {
      dispatch(storeActions.fetchSpecificStore(storeId));
      dispatch(productActions.fetchStoreProduct(storeId));
    } catch (error) {
      console.log('Error on dsaddsad: ' + error);
    }
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: approvedStores == undefined ? '' : approvedStores.storeName,
      headerTintColor: 'black',
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('MORE INFO');
          }}>
          <View>
            <Ionicons name="md-information-circle" size={24} color="black" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [approvedStores]);

  const renderItem = ({item}) => (
    <TwoColProductItem
      title={item.productTitle}
      price={parseInt(item.productPrice).toFixed(2)}
      images={item.productPrimaryImage}
      onPress={() => {
        props.navigation.navigate('PRODUCT DETAIL', {
          productId: item.id,
          storeId: item.storeId,
        });
      }}
    />
  );
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <FlatList
          data={storeProducts}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
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
  itemContainer: {
    width: '100%',
  },
});

export default HomeStoreDetailScreen;
