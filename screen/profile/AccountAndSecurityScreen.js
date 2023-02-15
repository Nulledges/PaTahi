import React from 'react';
import {View, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';

import TwoLabelButton from '../../Components/UI/CustomButton/TwoLabelButton';
import Card from '../../Components/UI/Card';

const AccountAndSecurityScreen = props => {
  const userInfo = useSelector(state => state.user.myInformation);

  return (
    <Card style={styles.container}>
      <TwoLabelButton
        firstLabel="My Profile"
        secondLabel={'>'}
        onPress={() => {
          props.navigation.navigate('EDITPROFILE', {
            userId: userInfo.userId,
            fullname: userInfo.name,
          });
        }}
      />
      <TwoLabelButton
        secondTextStyle={styles.secondTextTransformText}
        firstLabel="Username"
        secondLabel={
          userInfo === null
            ? '>'
            : userInfo.username === ''
            ? 'Set Now >'
            : userInfo.username + ' >'
        }
        onPress={() => {
          props.navigation.navigate('CHANGEUSERNAME', {
            userId: userInfo.userId,
            username: userInfo.username,
          });
        }}
      />
      <TwoLabelButton
        secondTextStyle={
          userInfo === null
            ? ''
            : userInfo.phoneNumber === ''
            ? styles.secondTextFalseColor
            : ''
        }
        firstLabel="Phone"
        secondLabel={
          userInfo === null
            ? '>'
            : userInfo.phoneNumber === ''
            ? 'Set Now >'
            : userInfo.phoneNumber + ' >'
        }
        onPress={() => {
          props.navigation.navigate('CHANGENUMBER', {
            userId: userInfo.userId,
            phoneNumber: userInfo.phoneNumber,
          });
        }}
      />
      <TwoLabelButton
        secondTextStyle={styles.secondTextTransformText}
        firstLabel="Email"
        secondLabel={
          userInfo === null
            ? '>'
            : userInfo.email === ''
            ? 'Set Now >'
            : userInfo.email + ' >'
        }
        onPress={() => {
          props.navigation.navigate('EMAILLOGINVERIFICATION', {
            userId: userInfo.userId,
            email: userInfo.email,
          });
        }}
      />
      <TwoLabelButton
        firstLabel="Change Password"
        secondLabel={'>'}
        onPress={() => {
          props.navigation.navigate('PASSWORDLOGINVERIFICATION');
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  secondTextFalseColor: {
    color: 'red',
  },
  secondTextTransformText: {
    textTransform: 'none',
  },
});

export default AccountAndSecurityScreen;
