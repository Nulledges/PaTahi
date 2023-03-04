import React, {useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../Components/UI/Card';
import NormalCustomInput from '../../Components/UI/Inputs/NormalCustomInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as chatActions from '../../store/actions/chat';
import {useState} from 'react';


const ChatScreen = props => {
  const chatList = useSelector(state => state.chat.chatList);
  const userId = useSelector(state => state.auth.userId);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const unsubcribe = dispatch(chatActions.fetchChatMembers);
      return unsubcribe;
    } catch (error) {
      console.log('Error at chat Screen: ' + error);
    }
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate('CHATROOM', {
              chatId: item.id,
            });
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
              {item.memberInfo.map(info => {
                if (userId != info.id) {
                  return info.name;
                }
              })}
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
        data={chatList}
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



/* const chat = [
  {id: '1', chatName: 'John Doe'},
  {id: '2', chatName: 'Jane Doe'},
  {id: '3', chatName: 'Bob Smith'},
]; */