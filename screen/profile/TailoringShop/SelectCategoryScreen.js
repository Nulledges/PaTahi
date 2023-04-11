import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainButton from '../../../Components/UI/CustomButton/MainButton';
import SecondButton from '../../../Components/UI/CustomButton/SecondButton';
const SelectCategoryScreen = props => {
  const categories = ['t-shirt', 'pants', 'shorts', 'skirts'];
  return (
    <View>
      <Text style={{color: 'black', padding: 10, textTransform: 'uppercase'}}>
        All Categories
      </Text>
      {categories.map((value, index) => {
        return (
          <SecondButton
            key={index}
            label={value}
            onPress={() => {
              props.navigation.navigate('ADD PRODUCT', {
                category: value,
                productId: props.route.params.productId,
                storeId: props.route.params.storeId,
              });
            }}
          />
        );
      })}
    </View>
  );
};

export default SelectCategoryScreen;
