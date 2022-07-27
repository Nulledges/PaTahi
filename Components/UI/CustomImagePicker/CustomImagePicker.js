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

const IMAGE_CHANGE = 'IMAGE_CHANGE';
const IMAGE_VALIDITY_CHANGE = 'IMAGE_VALIDITY_CHANGE';
const IMAGE_VISIBILITY_CHANGE = 'IMAGE_VISIBILITY_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const imagePickerReducer = (state, action) => {
  switch (action.type) {
    case IMAGE_CHANGE:
      return {
        ...state,
        uri: action.uri,
        fileName: action.fileName,
      };
    case IMAGE_VALIDITY_CHANGE:
      return {
        ...state,
        isValid: action.isValid,
      };
    case IMAGE_VISIBILITY_CHANGE:
      return {
        ...state,
        isVisible: action.isVisible,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const CustomImagePicker = props => {
  const [imagePickerState, dispatch] = useReducer(imagePickerReducer, {
    uri: '',
    fileName: '',
    isValid: false,
    isVisible: false,
    touched: false,
  });
  const {id, onImageChange} = props;
  useEffect(() => {
    onImageChange(
      id,
      imagePickerState.uri,
      imagePickerState.fileName,
      imagePickerState.isValid,
    );
  }, [id, onImageChange, imagePickerState]);

  /* const [modalImageVisibility, setModalImageVisibility] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageUri, setImageUri] = useState();
  const [imageFileName, setImageFileName] = useState();
 */

  const takeImageHandler = async () => {
    try {
      launchCamera((mediaType = 'photo'), response => {
        if (response.didCancel) {
          if (!imagePickerState.uri) {
            dispatch({type: IMAGE_VALIDITY_CHANGE, isValid: false});
          }
        } else {
          response.assets.forEach(item => {
            dispatch({type: IMAGE_VISIBILITY_CHANGE, isVisible: false});
            dispatch({
              type: IMAGE_CHANGE,
              uri: item.uri,
              fileName: item.fileName,
            });
            dispatch({type: IMAGE_VALIDITY_CHANGE, isValid: true});
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
            dispatch({type: IMAGE_VALIDITY_CHANGE, isValid: false});
          }
        } else {
          response.assets.forEach(item => {
            dispatch({type: IMAGE_VISIBILITY_CHANGE, isVisible: false});
            dispatch({
              type: IMAGE_CHANGE,
              uri: item.uri,
              fileName: item.fileName,
            });
            dispatch({type: IMAGE_VALIDITY_CHANGE, isValid: true});
          });
        }
      });
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <View style={styles.viewContainer}>
      <Text
        style={[
          styles.textStyle,
          imagePickerState.isValid ? {color: '#000'} : {color: '#FF0000'},
        ]}>
        {props.imagePickerLabel}
      </Text>
      <TouchableHighlight
        onPress={() => {
          dispatch({type: IMAGE_VISIBILITY_CHANGE, isVisible: true});
        }}>
        <View>
          <View
            style={[
              styles.imagePreview,
              imagePickerState.isValid
                ? {borderColor: '#000'}
                : {borderColor: '#FF0000'},
            ]}>
            {!imagePickerState.uri ? (
              <Text
                style={[
                  imagePickerState.isValid
                    ? {color: '#000'}
                    : {color: '#FF0000'},
                ]}>
                No image picked yet.
              </Text>
            ) : (
              <Image
                resizeMode="stretch"
                style={styles.image}
                source={{uri: imagePickerState.uri}}
              />
            )}
          </View>
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
    width: '100%',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
    marginLeft: '2%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
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
export default CustomImagePicker;
