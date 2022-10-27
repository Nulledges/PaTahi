import React, {useReducer, useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Keyboard,
  useWindowDimensions,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SecondButton from '../../../Components/UI/CustomButton/SecondButton';
const ApplicationHistory = props => {
  const applicationInformation = props.route.params;
  console.log(applicationInformation);
 
  return (
    <View>
      <Text>ApplicationHistory</Text>
    </View>
  );
};

export default ApplicationHistory;
