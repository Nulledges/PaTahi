import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Text,
  StatusBar,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';

import Card from '../../Components/UI/Card';
import MainButton from '../../Components/UI/CustomButton/MainButton';
import CustomImagePicker from '../../Components/UI/CustomImagePicker/CustomImagePicker';
import CustomInputWithLabel from '../../Components/UI/Inputs/CustomInputWithLabel';
import TwoColProductItem from '../../Components/Item/TwoColProductItem';

const Item = ({title}) => (
  <TouchableOpacity style={styles.item} onPress={() => {}}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{uri: 'https://wallpaperaccess.com/full/317501.jpg'}}
      />
    </View>
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);
const HomeScreen = props => {
  const number = 200.1;
  const renderItem = ({item}) => (
    <TwoColProductItem title={item.title} price={number.toFixed(2)} />
  );
  const current = new Date();
  const abutton = <MainButton label="LOG IN" onPress={() => {}} />;
  const aninput = (
    <CustomInputWithLabel
      //props send to customInput
      initialValue=""
      initiallyValid={false}
      required
      mail
      isError={() => {}}
      placeHolder="Search"
      errorText="Invalid email!"
      //props to add on custom input
      id="email"
      onInputChange={() => {}}
      returnKeyType="done"
    />
  );

  // it adds 30 days to a current date
  /*  current.setDate(current.getDate() + 30);
  console.log(current.toDateString()); */
  return (
    <View style={styles.homeScreen}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('PRODUCT OVERVIEW');
        }}
        style={styles.homeScreenContainer}>
        <Card></Card>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('STORE OVERVIEW');
        }}
        style={styles.homeScreenContainer}>
        <Card></Card>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
  homeScreenContainer: {
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
