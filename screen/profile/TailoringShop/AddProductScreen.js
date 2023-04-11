import React, {useReducer, useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Image,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';

import Card from '../../../Components/UI/Card';
import AddProductImagePicker from '../../../Components/UI/CustomImagePicker/AddProductImagePicker';
import ErrorText from '../../../Components/UI/CustomText/ErrorText';
import CustomInputWithLabelAndLength from '../../../Components/UI/Inputs/CustomInputWithLabelAndLength';
import CustomInputWithLabel from '../../../Components/UI/Inputs/CustomInputWithLabel';
import TwoLabelButton from '../../../Components/UI/CustomButton/TwoLabelButton';
import MainButton from '../../../Components/UI/CustomButton/MainButton';

import * as productActions from '../../../store/actions/product';

const IMAGE_PICKER_UPDATE = 'IMAGE_PICKER_UPDATE';
const IMAGE_PICKER_REMOVE = 'IMAGE_PICKER_REMOVE';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const imagePickerReducer = (state, action) => {
  if (action.type === IMAGE_PICKER_UPDATE) {
    const updatedUri = {
      ...state.images,
      [action.imageId]: [...state.images.productImages, action.imageValue],
    };

    let updatedIsValid = false;
    if (updatedUri.productImages.length > 0) {
      updatedIsValid = true;
    } else {
      updatedIsValid = false;
    }
    return {
      images: updatedUri,
      imageIsValid: updatedIsValid,
    };
  } else if (action.type === IMAGE_PICKER_REMOVE) {
    const updatedUri = {
      ...state.images,
      [action.imageId]: state.images.productImages.splice(action.value, 1),
    };
    const updatedUriWithoutUndefined = {
      productImages: updatedUri.productImages,
    };

    let updatedIsValid = false;
    if (updatedUriWithoutUndefined.productImages.length > 0) {
      updatedIsValid = true;
    } else {
      updatedIsValid = false;
    }
    return {
      images: updatedUriWithoutUndefined,
      imageIsValid: updatedIsValid,
    };
  }
};
const primaryImagePickerReducer = (state, action) => {
  if (action.type === IMAGE_PICKER_UPDATE) {
    const updatedUri = {
      ...state.images,
      [action.imageId]: [...state.images.primaryImages, action.imageValue],
    };

    let updatedIsValid = false;
    if (updatedUri.primaryImages.length > 0) {
      updatedIsValid = true;
    } else {
      updatedIsValid = false;
    }
    return {
      images: updatedUri,
      imageIsValid: updatedIsValid,
    };
  } else if (action.type === IMAGE_PICKER_REMOVE) {
    const updatedUri = {
      ...state.images,
      [action.imageId]: state.images.primaryImages.splice(action.value, 1),
    };
    const updatedUriWithoutUndefined = {
      primaryImages: updatedUri.primaryImages,
    };

    let updatedIsValid = false;
    if (updatedUriWithoutUndefined.primaryImages.length > 0) {
      updatedIsValid = true;
    } else {
      updatedIsValid = false;
    }
    return {
      images: updatedUriWithoutUndefined,
      imageIsValid: updatedIsValid,
    };
  }
};
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
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
const AddProductScreen = props => {
  const dispatch = useDispatch();
  const productId = props.route.params?.productId;
  const storeId = props.route.params?.storeId;
  const selectedProduct = useSelector(state =>
    state.products.userStoreProducts.find(prod => prod.id === productId),
  );
  const [inputError, setInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [bodyMeasurementState, setBodyMeasurementState] = useState([]);
  const [categoryState, setCategoryState] = useState();
  const [initialImages, setInitialImages] = useState([]);
  const [initialPrimaryImage, setInitialPrimaryImage] = useState();
  const [primaryImagePickerState, dispatchPrimaryImagePickerState] = useReducer(
    primaryImagePickerReducer,
    {
      images: {
        primaryImages: [],
      },
      imageIsValid: false,
    },
  );
  const [imagePickerState, dispatchImagePickerState] = useReducer(
    imagePickerReducer,
    {
      images: {
        productImages: [],
      },
      imageIsValid: false,
    },
  );
  const [inputState, dispatchInputState] = useReducer(formReducer, {
    inputValues: {
      productTitle: selectedProduct ? selectedProduct.productTitle : '',
      productDescription: selectedProduct
        ? selectedProduct.productDescription
        : '',
      price: selectedProduct ? selectedProduct.productPrice : '',
    },
    inputValidities: {
      productTitle: selectedProduct ? true : false,
      productDescription: selectedProduct ? true : false,
      price: selectedProduct ? true : false,
    },
    formIsValid: selectedProduct ? true : false,
  });
  console.log('storeId ' + storeId);
  console.log('productId ' + productId);
  //get images if wants to edit
  useEffect(() => {
    if (selectedProduct) {
      setInitialImages(selectedProduct.productImages);
      setInitialPrimaryImage(selectedProduct.productPrimaryImage);
      const primary = async () => {
        const fromStorage = await storage()
          .ref(`products/primary/` + selectedProduct.productPrimaryImage)
          .getDownloadURL();

        dispatchPrimaryImagePickerState({
          type: IMAGE_PICKER_UPDATE,
          imageValue: {
            imageUri: fromStorage,
            imageFileName: selectedProduct.productPrimaryImage,
          },
          imageId: 'primaryImages',
        });
      };
      primary();
      selectedProduct.productImages.map(async value => {
        /*   setTimeout(async () => { */
        const fromStorage = await storage()
          .ref(`products/` + value)
          .getDownloadURL();

        dispatchImagePickerState({
          type: IMAGE_PICKER_UPDATE,
          imageValue: {imageUri: fromStorage, imageFileName: value},
          imageId: 'productImages',
        });
        /*    }, 3000); */
      });
    }
  }, [selectedProduct]);
  //category
  useEffect(() => {
    switch (
      productId
        ? props.route.params?.category
          ? props.route.params?.category
          : selectedProduct.productCategory
        : props.route.params?.category
        ? props.route.params?.category
        : ''
    ) {
      case 't-shirt':
        setBodyMeasurementState(['Shoulder', 'Bust', 'Waist', 'Hip']);
        break;
      case 'shorts':
        setBodyMeasurementState(['Waist', 'Hip', 'Thigh']);
        break;
      default:
        setBodyMeasurementState([]);
    }
    if (props.route.params?.category === undefined) {
      if (selectedProduct) {
        setCategoryState(selectedProduct.productCategory);
      }
    } else {
      setCategoryState(props.route.params?.category);
    }
  }, [props.route.params?.category]);

  const inputChangeHandler = useCallback(
    (id, inputValue, inputValidity) => {
      dispatchInputState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: id,
      });
    },
    [dispatchInputState],
  );
  const imageChangeHandler = useCallback(
    (uri, fileName) => {
      dispatchImagePickerState({
        type: IMAGE_PICKER_UPDATE,
        imageValue: {imageUri: uri, imageFileName: fileName},
        imageId: 'productImages',
      });
    },
    [dispatchImagePickerState],
  );
  const primaryImageChangeHandler = useCallback(
    (uri, fileName) => {
      dispatchPrimaryImagePickerState({
        type: IMAGE_PICKER_UPDATE,
        imageValue: {imageUri: uri, imageFileName: fileName},
        imageId: 'primaryImages',
      });
    },
    [dispatchPrimaryImagePickerState],
  );
  const saveHandler = async () => {
    Keyboard.dismiss();
    if (
      !imagePickerState.imageIsValid ||
      !inputState.formIsValid ||
      bodyMeasurementState.length <= 0 ||
      categoryState === undefined
    ) {
      setInputError(true);
      return;
    }
    if (selectedProduct) {
      if (selectedProduct.isActive) {
        setIsButtonDisable(true);
        setIsLoading(true);
        productActions.updateProduct(
          productId,
          inputState.inputValues.productTitle,
          initialImages,
          imagePickerState.images.productImages,
          initialPrimaryImage,
          primaryImagePickerState.images.primaryImages,
          categoryState,
          bodyMeasurementState,
          inputState.inputValues.productDescription,
          inputState.inputValues.price,
          false,
        );
        setIsButtonDisable(false);
        props.navigation.goBack();
      } else {
        setIsButtonDisable(true);
        setIsLoading(true);

        productActions.updateProduct(
          productId,
          inputState.inputValues.productTitle,
          initialImages,
          imagePickerState.images.productImages,
          initialPrimaryImage,
          primaryImagePickerState.images.primaryImages,
          categoryState,
          bodyMeasurementState,
          inputState.inputValues.productDescription,
          inputState.inputValues.price,
          true,
        );
        setIsButtonDisable(false);
        props.navigation.goBack();
      }
    } else {
      setIsButtonDisable(true);
      dispatch(
        productActions.createProduct(
          storeId,
          inputState.inputValues.productTitle,
          imagePickerState.images.productImages,
          categoryState,
          bodyMeasurementState,
          inputState.inputValues.productDescription,
          inputState.inputValues.price,
          false,
        ),
      );
      setIsButtonDisable(false);
      props.navigation.goBack();
    }
  };
  const publishHandler = async () => {
    Keyboard.dismiss();
    if (
      !primaryImagePickerState.imageIsValid ||
      !imagePickerState.imageIsValid ||
      !inputState.formIsValid ||
      bodyMeasurementState.length <= 0 ||
      categoryState === undefined
    ) {
      setInputError(true);
      return;
    }
    if (selectedProduct) {
      setIsButtonDisable(true);
      setIsLoading(true);

      productActions.updateProduct(
        productId,
        inputState.inputValues.productTitle,
        initialImages,
        imagePickerState.images.productImages,
        initialPrimaryImage,
        primaryImagePickerState.images.primaryImages,
        categoryState,
        bodyMeasurementState,
        inputState.inputValues.productDescription,
        inputState.inputValues.price,
        selectedProduct.isActive,
      ),
        setIsLoading(false);
      setIsButtonDisable(false);
      props.navigation.goBack();
    } else {
      setIsButtonDisable(true);
      dispatch(
        productActions.createProduct(
          storeId,
          inputState.inputValues.productTitle,
          imagePickerState.images.productImages,
          primaryImagePickerState.images.primaryImages,
          categoryState,
          bodyMeasurementState,
          inputState.inputValues.productDescription,
          inputState.inputValues.price,
          true,
        ),
      );
      setIsButtonDisable(false);
      props.navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}

      <ScrollView
        style={{width: '100%', height: '90%', marginBottom: '19%'}}
        contentContainerStyle={{
          flexGrow: 1,
          marginHorizontal: '2%',
          marginTop: '1.5%',
        }}>
        <Card style={styles.CardContainer}>
          <View>
            <Text
              style={{
                marginLeft: 2.5,
                color: 'black',
                textTransform: 'uppercase',
              }}>
              Primary Image*
            </Text>
            <View style={styles.imagesList}>
              {primaryImagePickerState.images.primaryImages.map(
                (value, index) => {
                  return (
                    <TouchableHighlight
                      onPress={() => {
                        dispatchPrimaryImagePickerState({
                          type: IMAGE_PICKER_REMOVE,
                          value: index,
                        });
                      }}
                      style={styles.imageBorder}
                      key={index}>
                      <Image
                        resizeMode="stretch"
                        style={styles.image}
                        source={{
                          uri: value.imageUri,
                        }}
                      />
                    </TouchableHighlight>
                  );
                },
              )}
              {primaryImagePickerState.images.primaryImages.length >= 1 ? (
                ''
              ) : (
                <AddProductImagePicker
                  onImageChange={primaryImageChangeHandler}
                />
              )}
            </View>
            {!primaryImagePickerState.imageIsValid && inputError && (
              <ErrorText errorText="Please upload minimum (1) image of product" />
            )}
          </View>
        </Card>
        <Card style={styles.CardContainer}>
          <View>
            <Text
              style={{
                marginLeft: 2.5,
                color: 'black',
                textTransform: 'uppercase',
              }}>
              Secondary Image*
            </Text>
            <View style={styles.imagesList}>
              {imagePickerState.images.productImages.map((value, index) => {
                return (
                  <TouchableHighlight
                    onPress={() => {
                      dispatchImagePickerState({
                        type: IMAGE_PICKER_REMOVE,
                        value: index,
                      });
                    }}
                    style={styles.imageBorder}
                    key={index}>
                    <Image
                      resizeMode="stretch"
                      style={styles.image}
                      source={{
                        uri: value.imageUri,
                      }}
                    />
                  </TouchableHighlight>
                );
              })}
              {imagePickerState.images.productImages.length > 2 ? (
                ''
              ) : (
                <AddProductImagePicker onImageChange={imageChangeHandler} />
              )}
            </View>
            {!imagePickerState.imageIsValid && inputError && (
              <ErrorText errorText="Please upload minimum (1) image of product" />
            )}
          </View>
        </Card>
        <Card style={styles.CardContainer}>
          <View>
            <CustomInputWithLabelAndLength
              //props send to customInput
              initialValue={selectedProduct ? selectedProduct.productTitle : ''}
              initiallyValid={!!selectedProduct}
              textLength={
                selectedProduct ? selectedProduct.productTitle.length : 0
              }
              required
              isError={inputError}
              labelText="Product Name*"
              placeHolder="Enter Product Name"
              errorText="Please enter product Name"
              maxLength={100}
              isMultiLine={false}
              //props to add on custom input
              id="productTitle"
              onInputChange={inputChangeHandler}
              returnKeyType="done"
            />
          </View>
          <View>
            <CustomInputWithLabelAndLength
              //props send to customInput
              initialValue={
                selectedProduct ? selectedProduct.productDescription : ''
              }
              initiallyValid={!!selectedProduct}
              textLength={
                selectedProduct ? selectedProduct.productDescription.length : 0
              }
              required
              isError={inputError}
              labelText="Product Description*"
              placeHolder="Enter Product Description"
              errorText="Please enter Product Description"
              maxLength={200}
              isMultiLine={true}
              //props to add on custom input
              id="productDescription"
              onInputChange={inputChangeHandler}
              returnKeyType="done"
            />
          </View>
          <View>
            <CustomInputWithLabel
              //props send to customInput
              initialValue={selectedProduct ? selectedProduct.productPrice : ''}
              initiallyValid={!!selectedProduct}
              required
              onlyNumbers
              isError={inputError}
              labelText="Price*"
              placeHolder="Enter Price"
              errorText="Please enterPrice"
              maxLength={5}
              isMultiLine={true}
              //props to add on custom input
              id="price"
              onInputChange={inputChangeHandler}
              returnKeyType="done"
              keyboardType="number-pad"
            />
          </View>
        </Card>
        <Card style={styles.CardContainer}>
          <TwoLabelButton
            firstLabel="Category"
            secondLabel={`${
              productId
                ? props.route.params?.category
                  ? props.route.params?.category
                  : selectedProduct.productCategory
                : props.route.params?.category
                ? props.route.params?.category
                : ''
            } >`}
            onPress={() => {
              props.navigation.navigate('SELECT CATEGORY', {
                productId: productId,
                storeId: storeId,
              });
            }}
          />
          {bodyMeasurementState.length > 1 && (
            <Text
              style={{
                color: 'black',
                padding: 10,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              Body Measurements Needed
            </Text>
          )}
          {bodyMeasurementState.map((value, index) => {
            return (
              <TwoLabelButton
                key={index}
                firstLabel={value}
                onPress={() => {}}
              />
            );
          })}
          {!categoryState && inputError && (
            <ErrorText
              style={{marginTop: 5}}
              errorText="Please select a category"
            />
          )}
        </Card>
      </ScrollView>
      <ScrollView
        style={styles.buttonContainer}
        contentContainerStyle={{
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flexGrow: 1,
          marginVertical: '1%',
        }}>
        <MainButton
          textStyleProp={{
            color: 'black',
          }}
          style={styles.saveButton}
          label={
            selectedProduct
              ? selectedProduct.isActive
                ? 'DELIST'
                : 'PUBLISH'
              : 'SAVE'
          }
          onPress={saveHandler}
          isDisabled={isButtonDisable}
        />
        <MainButton
          style={styles.publishButton}
          label={selectedProduct ? 'UPDATE' : 'PUBLISH'}
          onPress={publishHandler}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    position: 'absolute',
    zIndex: 1000,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
  itemsContainer: {
    width: '100%',
    height: '100%',
    marginHorizontal: 5,
  },
  CardContainer: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  imagesList: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageBorder: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonContainer: {
    width: '100%',
    height: '10%',
    bottom: 0,
    position: 'absolute',
  },
  saveButton: {
    width: '45%',
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
  },
  publishButton: {
    width: '45%',
    margin: 5,
    borderRadius: 10,
  },
});

export default AddProductScreen;
