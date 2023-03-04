import chatMembers from '../../models/chatMembers';
import chatMessages from '../../models/chatMessages';
import firestore from '@react-native-firebase/firestore';
export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_CHAT_MEMBERS = 'SET_CHAT_MEMBERS';

export const createMessage = (message, chatId) => {
  return (dispatch, getState) => {
    const currentDate = new Date();
    const userId = getState().auth.userId;

    firestore()
      .collection('chat')
      .doc(chatId)
      .collection('messages')
      .add({dateCreated: currentDate, message: message, senderId: userId});
  };
};
export const fetchChatMembers = (dispatch, getState) => {
  const userId = getState().auth.userId;
  firestore()
    .collection('chat')
    .where('members', 'array-contains', userId)
    .onSnapshot(documentSnapshot => {
      const chatMembersInfo = [];
      documentSnapshot.docs.forEach(item => {
        const chatid = item.id;
        const chatMembersData = item.data();
        chatMembersInfo.push(
          new chatMembers(
            chatid,
            chatMembersData.members,
            chatMembersData.memberInfo,
          ),
        );
      });
      dispatch({
        type: SET_CHAT_MEMBERS,
        memberList: chatMembersInfo,
      });
    });
};
export const fetchChatMessages = chatId => {
  return (dispatch, getState) => {
    firestore()
      .collection('chat')
      .doc(chatId)
      .collection('messages')
      .orderBy('dateCreated', 'desc')
      .limit(5)
      .onSnapshot(documentSnapshot => {
        const messages = [];
        documentSnapshot.docs.forEach(item => {
          const messagedata = item.data();
          messages.push(
            new chatMessages(
              item.id,
              messagedata.senderId,
              messagedata.message,
              messagedata.dateCreated.toDate(),
            ),
          );
        });

        dispatch({
          type: SET_MESSAGES,
          messageList: messages,
        });
      });
  };
};
