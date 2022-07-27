import React, {useReducer, useCallback, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {Box, Text, Pressable, HStack, Modal, Button} from 'native-base';
import CustomInput from '../../components/UI/CustomInput';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import * as authenticationActions from '../../store/actions/authentication';
const UPDATE_NAME = 'UPDATE_NAME';
const nameReducer = (state, action) => {
  if (action.type === UPDATE_NAME) {
    const updatedValues = {
      ...state.nameValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.nameValidities,
      [action.input]: action.isValid,
    };
    let updatedNameIsValid = true;
    for (key in updatedValidities) {
      updatedNameIsValid = updatedNameIsValid && updatedValidities[key];
    }
    return {
      nameIsValid: updatedNameIsValid,
      nameValues: updatedValues,
      nameValidities: updatedValidities,
    };
  }
  return state;
};
const AccountInformationScreen = props => {
  const [showModalName, setShowModalName] = useState(false);
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [displayName, setDisplayName] = useState();
  /* const [showModal, setShowModalNumber] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false); */
  const [placement, setPlacement] = useState();
  const [inputError, setInputError] = useState(false);
  const dispatch = useDispatch();
  const userAuth = auth().currentUser;
  const [initializing, setInitializing] = useState(true);
  const userId = useSelector(state => state.auth.userId);
  const [nameState, dispatchNameState] = useReducer(nameReducer, {
    nameValues: {
      name: '',
    },
    nameValidities: {
      name: false,
    },
    nameIsValid: false,
  });
  console.log(userId);
  firestore()
    .collection('Users')
    .where('id', '==', userId)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        console.log(documentSnapshot.id);
        console.log(documentSnapshot.data() );
      });
    });

  /*   useEffect(() => {
    const unsubcribe = useCallback(() => {
      auth().onAuthStateChanged(user => {
        console.log(user.displayName);
        setDisplayName(user.displayName);
      });
          setEmail(userAuth.email);

      setNumber(userAuth.phoneNumber);
    }, []);
    return unsubcribe();
  }, []) */

  /*   useEffect(() => {
    const unsubcribe = () => {
      let initialize = false;
      auth().onAuthStateChanged(user => {
        if (user) {
          if (!initialize) {
            initialize = true;
            setDisplayName(user.displayName);
            console.log(user.displayName);
          }
        }
      });
    };
    return unsubcribe();
  }, []); */

  /* useEffect(
    useCallback(() => {
      const unsubsribe = () => {
        auth().onAuthStateChanged(user => {
          let mounted = false;
          if (user) {
            if (!mounted) {
              mounted = true;
              console.log(user);
              setEmail(user.email);
              setNumber(user.number);
            }
          }
        });
      };
      return unsubsribe();
    }),
  ),
    ; */

  const openModalName = placement => {
    setShowModalName(true);
    setPlacement(placement);
  };
  const authenticationHandler = async () => {
    Keyboard.dismiss();
    if (!nameState.nameIsValid) {
      setInputError(true);
      return;
    } else {
      dispatch(authenticationActions.changeName(nameState.nameValues.name));
      setShowModalName(false);
    }
  };
  const inputChangeHandler = useCallback(
    (id, nameValues, nameValidities) => {
      dispatchNameState({
        type: UPDATE_NAME,
        value: nameValues,
        isValid: nameValidities,
        input: id,
      });
    },
    [dispatchNameState],
  );
  return (
    <Box>
      <Modal
        isOpen={showModalName}
        onClose={() => setShowModalName(false)}
        avoidKeyboard
        w="100%">
        <Modal.Content maxWidth="400" width="100%" {...styles[placement]}>
          <Modal.CloseButton />
          <Modal.Header>Change Name</Modal.Header>
          <Modal.Body>
            <CustomInput
              //props send to customInput
              initialValue=""
              initiallyValid={false}
              required
              isRequired={true}
              errorOnClick={inputError}
              label="Name"
              pHolder="Enter your Name"
              errorMessage="Invalid Name"
              //props to add on custom input
              id="name"
              onInputChange={inputChangeHandler}
              returnKeyType="done"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModalName(false);
                }}>
                Cancel
              </Button>
              <Button onPress={authenticationHandler}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Pressable
        onPress={() => {
          openModalName('bottom');
        }}>
        {({isPressed}) => {
          return (
            <Box
              mt="4"
              maxWidth="500"
              w="100%"
              maxHeight="10"
              h="10"
              overflow="hidden"
              shadow="1"
              bg="gray.400">
              <HStack justifyContent="space-between">
                <Text padding="2">Change Name</Text>
                <Box width="40%" bg={isPressed ? 'gray.400' : 'white'}>
                  <Text
                    fontSize="20"
                    numberOfLines={1}
                    justifyContent="flex-end">
                    {displayName === null ? 'Not set' : displayName}
                  </Text>
                </Box>
              </HStack>
            </Box>
          );
        }}
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('CHANGE NUMBER')}>
        {({isPressed}) => {
          return (
            <Box
              mt="5"
              maxWidth="500"
              w="100%"
              maxHeight="10"
              h="10"
              overflow="hidden"
              shadow="1"
              bg="gray.400">
              <HStack justifyContent="space-between">
                <Text padding="2">Change Number</Text>
                <Box width="40%" bg={isPressed ? 'gray.400' : 'white'}>
                  <Text
                    fontSize="20"
                    numberOfLines={1}
                    justifyContent="flex-end">
                    {number === null ? 'Not set' : number}
                  </Text>
                </Box>
              </HStack>
            </Box>
          );
        }}
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('CHANGE EMAIL')}>
        {({isPressed}) => {
          return (
            <Box
              mt="1"
              maxWidth="500"
              w="100%"
              maxHeight="10"
              h="10"
              overflow="hidden"
              shadow="1"
              bg="gray.400">
              <HStack justifyContent="space-between">
                <Text padding="2">Email</Text>
                <Box width="40%" bg={isPressed ? 'gray.400' : 'white'}>
                  <Text
                    fontSize="20"
                    numberOfLines={1}
                    justifyContent="flex-end">
                    {email}
                  </Text>
                </Box>
              </HStack>
            </Box>
          );
        }}
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('CHANGE PASSWORD')}>
        {({isPressed}) => {
          return (
            <Box
              mt="1"
              maxWidth="500"
              w="100%"
              maxHeight="10"
              h="10"
              overflow="hidden"
              shadow="1"
              bg="gray.400">
              <HStack justifyContent="space-between">
                <Text padding="2">Change Password</Text>
                <Box width="40%" bg={isPressed ? 'gray.400' : 'white'}>
                  {/*   <Text
                    fontSize="20"
                    numberOfLines={1}
                    justifyContent="flex-end">
                    gfdsgdfgdfgfd
                  </Text> */}
                </Box>
              </HStack>
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
};

const styles = {
  top: {
    marginBottom: 'auto',
    marginTop: 0,
  },
  bottom: {
    marginBottom: 0,
    marginTop: 'auto',
  },
  left: {
    marginLeft: 0,
    marginRight: 'auto',
  },
  right: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  center: {},
};

export default AccountInformationScreen;
