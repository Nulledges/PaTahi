import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ApplicationButton from '../../Components/UI/CustomButton/ApplicationsButton';

const VerificationFormsScreen = props => {
  const dispatch = useDispatch();
  const pendingVerificationForms = useSelector(
    state => state.admin.allPendingVerificationForms,
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [pendingVerificationForms]);
  if (isLoading) {
    return (
      <View style={styles.Centered}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (!isLoading && pendingVerificationForms.length === 0) {
    return (
      <View style={styles.Centered}>
        <Text style={styles.CenteredStyle}>No pending verification forms</Text>
      </View>
    );
  }

  const renderItem = ({item}) => (
    <ApplicationButton
      label={item.storeName}
      onPress={() => {
        props.navigation.navigate('VERIFICATION DETAIL', {
          pendingVerificationForms: item,
        });
      }}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.FlatListStyle}
        data={pendingVerificationForms}
        keyExtractor={item => item.id}
        key={item => item.id}
        renderItem={renderItem}
      />
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

export default VerificationFormsScreen;
