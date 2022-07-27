import React from 'react';
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
import StoreOverviewItem from '../../Components/Item/StoreOverviewItem';
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
  const number = 200.1;
  const renderItem = ({item}) => (
    <StoreOverviewItem
      storeName={item.title}
      onPress={() => {
        props.navigation.navigate('STORE DETAIL', {
          storeName: item.title,
        });
      }}
    />
  );
  return (
    <View style={styles.storeOverviewScreen}>
      <View style={styles.storeContainer}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  storeOverviewScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
  storeContainer: {
    width: '100%',
    marginVertical: 5,
  },
});

export default HomeStoreOverviewScreen;
