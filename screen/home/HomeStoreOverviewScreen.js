import React, {useEffect} from 'react';
import {AirbnbRating} from 'react-native-ratings';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import StoreOverviewItem from '../../Components/Item/StoreOverviewItem';
import * as storeActions from '../../store/actions/store';
const HomeStoreOverviewScreen = props => {
  const dispatch = useDispatch();
  const approvedStores = useSelector(state => state.store.approvedStores);
  useEffect(() => {
    try {
      dispatch(storeActions.fetchAllApprovedStore);
    } catch (error) {
      console.log('Error on HomeStoreOverview: ' + error);
    }
  }, []);

  const renderItem = ({item}) => (
    <StoreOverviewItem
      storeName={item.storeName}
      storeImage={item.storeImage}
      onPress={() => {
        props.navigation.navigate('STORE DETAIL', {
          storeId: item.storeId,
        });
      }}
    />
  );
  return (
    <View style={styles.storeOverviewScreen}>
      <View style={styles.itemsContainer}>
        <FlatList
          data={approvedStores}
          renderItem={renderItem}
          keyExtractor={item => item.userId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  storeOverviewScreen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  itemsContainer: {
    width: '100%',
  },
});

export default HomeStoreOverviewScreen;
