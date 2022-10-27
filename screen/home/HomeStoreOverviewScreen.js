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
import * as storeApplicationActions from '../../store/actions/storeApplication';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'store 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'store 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'store 3',
  },
  {
    id: '58694a0f-3da1-47f-bd96-145571e29d72',
    title: 'store 4',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455e29d72',
    title: 'store 5',
  },
  {
    id: '58694a0f-3da1-471f5571e29d72',
    title: 'store 6',
  },
  {
    id: '58694a0f-3da1-471f5571e9d72',
    title: 'store 7',
  },
];

const HomeStoreOverviewScreen = props => {
  const dispatch = useDispatch();
  const approveApplication = useSelector(
    state => state.application.allApprovedApplication,
  );
  console.log(approveApplication);
  useEffect(() => {
    try {
      dispatch(storeApplicationActions.fetchAllApprovedTailorApplication);
    } catch (error) {
      console.log('Error on HomeStoreOverview: ' + error);
    }
  }, []);
  const renderItem = ({item}) => (
    <StoreOverviewItem
      storeName={item.storeName}
      onPress={() => {
        props.navigation.navigate('STORE DETAIL', {
          storeName: item.storeName,
        });
      }}
    />
  );
  return (
    <View style={styles.storeOverviewScreen}>
      <View style={styles.storeContainer}>
        <FlatList
          data={approveApplication}
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
  storeContainer: {
    width: '100%',

  },
});

export default HomeStoreOverviewScreen;
