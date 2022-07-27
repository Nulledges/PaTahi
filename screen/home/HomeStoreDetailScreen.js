import React from 'react';
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

const HomeStoreDetailScreen = props => {
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
          <Ionicons name="md-information-circle" size={24} />
        </View>
      </TouchableOpacity>
    ),
  };
};
export default HomeStoreDetailScreen;
