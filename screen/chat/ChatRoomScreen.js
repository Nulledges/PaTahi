import React, {useEffect, useReducer, useCallback} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  Keyboard,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as chatActions from '../../store/actions/chat';
import Card from '../../Components/UI/Card';
import NormalCustomInput from '../../Components/UI/Inputs/NormalCustomInput';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UPDATE_TEXT = 'UPDATE_TEXT';
const chatReducer = (state, action) => {
  if (action.type === UPDATE_TEXT) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};
const ChatRoomScreen = props => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.auth.userId);
  const messageList = useSelector(state => state.chat.messages);

  const [inputState, dispatchInputState] = useReducer(chatReducer, {
    inputValues: {
      sendMessage: '',
    },
    inputValidities: {
      sendMessage: false,
    },
    formIsValid: false,
  });

  const messageHandler = async () => {
    if (inputState.inputValues.sendMessage != '') {
      dispatch(
        chatActions.createMessage(
          inputState.inputValues.sendMessage,
          props.route.params.chatId,
        ),
      );
    }
  };
  //fetch messages
  useEffect(() => {
    try {
      const unsubcribe = dispatch(
        chatActions.fetchChatMessages(props.route.params.chatId),
      );
      return unsubcribe;
    } catch (error) {
      console.log('Error at chat Screen: ' + error);
    }
  }, []);
  const renderItem = ({item}) => {
    const currentUser = userId;
    const isCurrentUser = item.senderId === currentUser;
    return (
      <View>
        <View
          style={
            isCurrentUser ? '' : {flexDirection: 'row', alignItems: 'center'}
          }>
          {isCurrentUser ? (
            ''
          ) : (
            <Image
              resizeMode="stretch"
              style={{
                borderRadius: 50,
                width: 50,
                height: 50,
                backgroundColor: 'red',
              }}
              source={{uri: 'https://wallpaperaccess.com/full/317501.jpg'}}
            />
          )}
          <View
            style={
              isCurrentUser
                ? styles.messageContainer
                : styles.otherMessageContainer
            }>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        </View>
      </View>
    );
  };
  const inputChangeHandler = useCallback(
    (id, chatTextValue, chatTextValidity) => {
      dispatchInputState({
        type: UPDATE_TEXT,
        value: chatTextValue,
        isValid: chatTextValidity,
        input: id,
      });
    },
    [dispatchInputState],
  );
  return (
    <View style={styles.container}>
      <FlatList
        inverted
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
        }}
        style={styles.itemContainer}
        data={messageList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Card style={styles.CardContainer}>
        <View style={{width: '85%'}}>
          <NormalCustomInput
            //props from customInput
            placeHolder="Aa"
            //props to add on custom input
            id="sendMessage"
            onInputChange={inputChangeHandler}
            returnKeyType="done"
          />
        </View>
        <View style={{width: '10%', marginLeft: '3%'}}>
          <Ionicons
            onPress={messageHandler}
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

/* const users = [
  {id: '1', name: 'John Doe'},
  {id: '2', name: 'Jane Doe'},
  {id: '3', name: 'Bob Smith'},
];

const messages = [
  {id: '1', senderId: '1', text: 'Hello, how are you?'},
  {id: '2', senderId: '2', text: "I'm good, thanks for asking!"},
  {id: '3', senderId: '2', text: "What's up?"},
  {id: '4', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '5', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '6', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '7', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '8', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '11', senderId: '2', text: 'Not much, jting with you guys'},
  {id: '22', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '433', senderId: '1', text: 'Not much, just ch you guys'},
  {id: '45444', senderId: '1', text: 'Not much, just chatting with you guys'},
  {id: '4432344', senderId: '1', text: 'Not much, justing with you guys'},
  {id: '4444', senderId: '1', text: 'Not much, jtting with you guys'},
]; */
