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
import ApplicationButton from '../../Components/UI/CustomButton/ApplicationsButton';
import * as storeAppicationActions from '../../store/actions/storeApplication';
const ApplicationScreen = props => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const pendingApplications = useSelector(state => state.application);
  console.log(pendingApplications.allPendingApplication);

  useEffect(() => {
    try {
      dispatch(storeAppicationActions.fetchPendingTailorApplication);
      setIsLoading(false);
    } catch (error) {
      console.log('Error on ApplicationScreen: ' + error);
    }
  }, []);

  if (isLoading) {
    return (
      <View style={styles.Centered}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (!isLoading && pendingApplications.length === 0) {
    return (
      <View style={styles.Centered}>
        <Text style={styles.CenteredStyle}>No Pending Applications</Text>
      </View>
    );
  }
  const renderItem = ({item}) => (
    <ApplicationButton
      label={item.storeName}
      onPress={() => {
        props.navigation.navigate('APPLICATION DETAIL', {
          id: item.id,
          userId: item.userId,
          businessPermitImage: item.businessPermitImage,
          storeImage: item.storeImage,
          storeAddress: item.storeAddress,
          storeName: item.storeName,
          dateSubmitted: item.dateSubmitted,
          status: item.status,
        });
      }}
    />
  );
  return (
    <View style={styles.ApplicationScreen}>
      <FlatList
        style={styles.FlatListStyle}
        data={pendingApplications.allPendingApplication}
        keyExtractor={item => item.id}
        key={item => item.id}
        renderItem={renderItem}
      />
      {/*   <Text>Hello</Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  ApplicationScreen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 5,
    backgroundColor: '#E8E8E8',
  },
  FlatListStyle: {
    width: '100%',
  },
  Centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CenteredStyle: {
    color: 'black',
  },
});

export default ApplicationScreen;
