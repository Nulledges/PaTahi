import React from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import Card from '../../Components/UI/Card';
import NormalCustomInput from '../../Components/UI/Inputs/NormalCustomInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
const users = [
  {id: '1', name: 'John Doe'},
  {id: '2', name: 'Jane Doe'},
  {id: '3', name: 'Bob Smith'},
];

const messages = [
  {id: '1', senderId: '1', text: 'Hello, how are you?'},
  {id: '2', senderId: '2', text: "I'm good, thanks for asking!"},
  {id: '3', senderId: '3', text: "What's up?"},
  {id: '4', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '5', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '6', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '7', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '8', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '11', senderId: '2', text: 'Not much, just chatting with you guys'},
  {id: '22', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '433', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '45444', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '4432344', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '4444', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '44324', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '44343', senderId: '1', text: 'Not much, just chatting with you guys'},

  {id: '65654', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '4645654', senderId: '1', text: 'Not much, just chatting with you guys'},
];
const renderItem = ({item}) => {
  const currentUser = users.find(user => user.id === '1');
  const isCurrentUser = item.senderId === currentUser.id;
  return (
    <View>
      <View
        style={
          isCurrentUser ? '' : {flexDirection: 'row', alignItems: 'center'}
        }>
        {isCurrentUser ? (
          ''
        ) : (
          <View
            style={{
              borderRadius: 50,
              width: 50,
              height: 50,
              backgroundColor: 'red',
            }}>
            <Text>Hello</Text>
          </View>
        )}
        <View
          style={
            isCurrentUser
              ? styles.messageContainer
              : styles.otherMessageContainer
          }>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </View>
    </View>
  );
};
const ChatRoomScreen = props => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}
        style={styles.itemContainer}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Card style={styles.CardContainer}>
        <View style={{width: '85%'}}>
          <NormalCustomInput
            placeHolder="Aa"
            id="message"
            returnKeyType="done"
          />
        </View>
        <View style={{width: '10%', marginLeft: '3%'}}>
          <Ionicons
            onPress={() => {
              console.log('hello');
            }}
            name="md-send-sharp"
            size={40}
            color="black"
          />
        </View>
      </Card>
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
    elevation: 2,
    height: '87%',
  },
  messageContainer: {
    maxWidth: '80%',
    margin: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
    alignSelf: 'flex-end',
  },

  otherMessageContainer: {
    maxWidth: '80%',
    margin: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  CardContainer: {
    borderRadius: 5,
    padding: 5,
    margin: 5,
    height: '10%',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default ChatRoomScreen;
