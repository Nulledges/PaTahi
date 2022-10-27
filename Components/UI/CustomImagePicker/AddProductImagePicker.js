import React, {useEffect, useState, useReducer, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Modal,
  Button,
  Alert,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Card from '../Card';
import Feather from 'react-native-vector-icons/Feather';

const IMAGE_CHANGE = 'IMAGE_CHANGE';
const IMAGE_VISIBILITY_CHANGE = 'IMAGE_VISIBILITY_CHANGE';

const imagePickerReducer = (state, action) => {
  switch (action.type) {
    case IMAGE_CHANGE:
      return {
        ...state,
        uri: action.uri,
        fileName: action.fileName,
      };
    case IMAGE_VISIBILITY_CHANGE:
      return {
        ...state,
        isVisible: action.isVisible,
      };

    default:
      return state;
  }
};
const AddProductImagePicker = props => {
  const [imagePickerState, dispatch] = useReducer(imagePickerReducer, {
    uri: '',
    fileName: '',
    isVisible: false,
  });
  const {onImageChange} = props;
  useEffect(() => {
    if (imagePickerState.uri === '') {
    } else {
      onImageChange(imagePickerState.uri, imagePickerState.fileName);
      dispatch({
        type: IMAGE_CHANGE,
        uri: '',
        fileName: '',
      });
    }
  }, [onImageChange, imagePickerState]);

  const takeImageHandler = async () => {
    try {
      launchCamera((mediaType = 'photo'), response => {
        if (response.didCancel) {
          if (!imagePickerState.uri) {
          }
        } else {
          response.assets.forEach(item => {
            dispatch({type: IMAGE_VISIBILITY_CHANGE, isVisible: false});
            dispatch({
              type: IMAGE_CHANGE,
              uri: item.uri,
              fileName: item.fileName,
            });
          });
        }
      });
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const chooseImageHandler = async () => {
    try {
      launchImageLibrary((mediaType = 'photo'), response => {
        if (response.didCancel) {
          if (!imagePickerState.uri) {
          }
        } else {
          response.assets.forEach(item => {
            dispatch({type: IMAGE_VISIBILITY_CHANGE, isVisible: false});
            dispatch({
              type: IMAGE_CHANGE,
              uri: item.uri,
              fileName: item.fileName,
            });
          });
        }
      });
    } catch (err) {
      console.log(err);
      return;
    }
  };
  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          dispatch({type: IMAGE_VISIBILITY_CHANGE, isVisible: true});
        }}
        style={styles.dottedBorder}>
        <View style={styles.rowBorder}>
          <Feather name={'plus'} size={12} color="black" />
          <Text style={styles.textStyle}>Add Photos</Text>
        </View>
      </TouchableHighlight>
      <Modal
        animationType="slide"
        transparent={true}
        visible={imagePickerState.isVisible}
        onRequestClose={() => {
          dispatch({type: IMAGE_VISIBILITY_CHANGE, isVisible: false});
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Card style={styles.buttonModalContainer}>
              <View style={styles.buttonMargin}>
                <Button title="Take Image" onPress={takeImageHandler} />
              </View>

              <View style={styles.buttonMargin}>
                <Button title="Choose Image" onPress={chooseImageHandler} />
              </View>

              <View style={styles.buttonMargin}>
                <Button
                  title="Cancel"
                  onPress={() => {
                    dispatch({type: IMAGE_VISIBILITY_CHANGE, isVisible: false});
                  }}
                />
              </View>
            </Card>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    width: 100,
    backgroundColor: 'red',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dottedBorder: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dotted',
  },
  rowBorder: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    color: 'black',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 1,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
    width: '95%',
  },
  buttonModalContainer: {
    width: '95%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 5,
  },
  buttonMargin: {
    marginBottom: 10,
  },
});
export default AddProductImagePicker;
