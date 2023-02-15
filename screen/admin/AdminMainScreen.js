import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../Components/UI/Card';
import SecondButton from '../../Components/UI/CustomButton/SecondButton';
import * as adminActions from '../../store/actions/admin';
const AdminMainScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const unsubcribe = dispatch(adminActions.fetchPendingTailorApplication);
      return unsubcribe;
    } catch (error) {
      console.log('Error on HomeStoreOverview: ' + error);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Card style={styles.itemContainer}>
        <SecondButton
          label="STORE APPLICATIONS"
          onPress={() => {
            props.navigation.navigate('STORE APPLICATIONS');
          }}
        />
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 5,
    backgroundColor: '#E8E8E8',
  },
  itemContainer: {
    width: '100%',
    maxHeight: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AdminMainScreen;
