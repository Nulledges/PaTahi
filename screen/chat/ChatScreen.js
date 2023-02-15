import React from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  Button,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Card from '../../Components/UI/Card';
import NormalCustomInput from '../../Components/UI/Inputs/NormalCustomInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
const chat = [
  {id: '1', chatName: 'John Doe'},
  {id: '2', chatName: 'Jane Doe'},
  {id: '3', chatName: 'Bob Smith'},
];

const ChatScreen = props => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate('CHATROOM');
            console.log(item.chatName);
          }}>
          <View style={styles.infoContainer}>
            <Image
              resizeMode="stretch"
              style={styles.ProfileImage}
              source={{uri: 'https://wallpaperaccess.com/full/317501.jpg'}}
            />
            <Text
              style={{
                color: 'black',
                justifyContent: 'center',
                alignSelf: 'center',
                marginLeft: 10,
                textTransform: 'capitalize',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {item.chatName}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={chat}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#E8E8E8',
  },
  itemContainer: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 5,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  ProfileImage: {
    backgroundColor: '#ffffff',
    borderRadius: 200,
    height: 55,
    width: 55,
  },
});
export default ChatScreen;
