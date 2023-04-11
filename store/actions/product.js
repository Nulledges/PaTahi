import product from '../../models/products';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

/* export const CREATE_NEW_PRODUCT = 'CREATE_NEW_PRODUCT'; */

export const SET_USER_PRODUCTS = 'SET_USER_PRODUCTS';
export const SET_STORE_PRODUCTS = 'SET_STORE_PRODUCTS';
export const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';
export const SET_CART_PRODUCTS = 'SET_CART_PRODUCT';
export const SET_SPECIFIC_PRODUCT = 'SET_SPECIFIC_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const createProduct = (
  storeId,
  productTitle,
  productImages,
  primaryImage,
  productCategory,
  bodyMeasurementNeeded,
  productDescription,
  productPrice,
  isActive,
) => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;

    let primaryImageFilename = '';
    let productFileName = [];
    primaryImage.map(value => {
      primaryImageFilename = value.imageFileName;
      storage()
        .ref(`products/primary/${value.imageFileName}`)
        .putFile(value.imageUri)
        .on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
    });

    productImages.map(value => {
      productFileName.push(value.imageFileName);
      storage()
        .ref(`products/${value.imageFileName}`)
        .putFile(value.imageUri)
        .on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
    });

    firestore()
      .collection('Products')
      .add({
        storeId: storeId,
        productTitle: productTitle,
        productImages: productFileName,
        productPrimaryImage: primaryImageFilename,
        productCategory: productCategory,
        bodyMeasurementNeeded: bodyMeasurementNeeded,
        productDescription: productDescription,
        productPrice: productPrice,
        isActive: isActive,
        storeStatus: 'approved',
      })
      .then(console.log('Product Added!'));
  };
};
export const publishProduct = productId => {
  return (dispatch, getState) => {
    firestore()
      .collection('Products')
      .doc(productId)
      .update({
        isActive: true,
      })
      .then(() => {
        console.log('Product  updated!');
      });
  };
};
export const delistProduct = productId => {
  return (dispatch, getState) => {
    firestore()
      .collection('Products')
      .doc(productId)
      .update({
        isActive: false,
      })
      .then(() => {
        console.log('Product updated!');
      });
  };
};
export const updateProduct = (
  productId,
  productTitle,
  initialImages,
  productImages,
  initialPrimaryImage,
  primaryImage,
  productCategory,
  bodyMeasurementNeeded,
  productDescription,
  productPrice,
  isActive,
) => {
  let productFileName = [];
  let primaryProductFilename = '';
  productImages.map(value => {
    productFileName.push(value.imageFileName);
  });
  primaryImage.map(value => {
    primaryProductFilename = value.imageFileName;
  });
  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    arr1.sort();
    arr2.sort();
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };
  if (arraysAreEqual(initialImages, productFileName)) {
    console.log(initialPrimaryImage);
    console.log(primaryProductFilename);

    if (primaryProductFilename === initialPrimaryImage) {
      firestore()
        .collection('Products')
        .doc(productId)
        .update({
          productTitle: productTitle,
          productCategory: productCategory,
          bodyMeasurementNeeded: bodyMeasurementNeeded,
          productDescription: productDescription,
          productPrice: productPrice,
          productPrimaryImage: primaryProductFilename,
          isActive: isActive,
        })
        .then(() => {
          console.log('Product updated!');
        });
    } else {
      primaryImage.map(value => {
        const task = storage()
          .ref(`products/primary/${value.imageFileName}`)
          .putFile(value.imageUri);

        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
        task.then(() => {
          firestore()
            .collection('Products')
            .doc(productId)
            .update({
              productTitle: productTitle,
              productCategory: productCategory,
              bodyMeasurementNeeded: bodyMeasurementNeeded,
              productDescription: productDescription,
              productPrice: productPrice,
              productPrimaryImage: primaryProductFilename,
              isActive: isActive,
            })
            .then(() => {
              console.log('Product updated/image uploaded!');
            });
          /*      if (productFileName[0] != initialImages[0]) {
        firestore()
          .collection('orders')
          .where('productId', 'array-contains', productId)
          .get()
          .then(product => {
            product.docs.forEach(doc => {
              console.log("doc ID FOR product on orders "+ doc.id);
            });
          });
      } */
        });
      });
      storage().ref(`products/primary/${initialPrimaryImage}`).delete();
    }
  } else {
    if (primaryProductFilename != initialPrimaryImage) {
      primaryImage.map(value => {
        const task = storage()
          .ref(`products/primary/${value.imageFileName}`)
          .putFile(value.imageUri);

        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
        task.then(() => {
          firestore()
            .collection('Products')
            .doc(productId)
            .update({
              productTitle: productTitle,
              productCategory: productCategory,
              bodyMeasurementNeeded: bodyMeasurementNeeded,
              productDescription: productDescription,
              productPrice: productPrice,
              productPrimaryImage: primaryProductFilename,
              isActive: isActive,
            })
            .then(() => {
              console.log('Product updated/image uploaded!');
            });
          /*      if (productFileName[0] != initialImages[0]) {
        firestore()
          .collection('orders')
          .where('productId', 'array-contains', productId)
          .get()
          .then(product => {
            product.docs.forEach(doc => {
              console.log("doc ID FOR product on orders "+ doc.id);
            });
          });
      } */
        });
      });
      storage().ref(`products/primary/${initialPrimaryImage}`).delete();
    }
    //upload image
    productImages.map(value => {
      const a = initialImages.find(prod => prod === value.imageFileName);
      if (a) {
      } else {
        const task = storage()
          .ref(`products/${value.imageFileName}`)
          .putFile(value.imageUri);

        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
        task.then(() => {
          firestore()
            .collection('Products')
            .doc(productId)
            .update({
              productTitle: productTitle,
              productImages: productFileName,
              productCategory: productCategory,
              bodyMeasurementNeeded: bodyMeasurementNeeded,
              productDescription: productDescription,
              productPrice: productPrice,
              isActive: isActive,
            })
            .then(() => {
              console.log('Product updated/image uploaded!');
            });
          /*      if (productFileName[0] != initialImages[0]) {
        firestore()
          .collection('orders')
          .where('productId', 'array-contains', productId)
          .get()
          .then(product => {
            product.docs.forEach(doc => {
              console.log("doc ID FOR product on orders "+ doc.id);
            });
          });
      } */
        });
        if (productFileName[0] != initialImages[0]) {
          console.log('not equal');
        }
        if (productFileName[0] != initialImages[0]) {
          console.log('equal');
        }
      }
    });

    /*   if (productFileName[0] === initialImages[0]) {
  console.log('product');
  const ordersRef = firestore().collection('orders');

  ordersRef
    .where('item', 'array-contains', productId)
    .get()
    .then(product => { */
    /*  let batch = firestore().batch(); */
    /*      product.docs.forEach(doc => {
        console.log(doc.id);
      });
    });
} */
    //delete image
    initialImages.map(value => {
      const a = productFileName.find(prod => prod === value);
      if (a) {
      } else {
        storage()
          .ref(`products/${value}`)
          .delete()
          .then(() => {
            firestore()
              .collection('Products')
              .doc(productId)
              .update({
                productTitle: productTitle,
                productImages: productFileName,
                productCategory: productCategory,
                bodyMeasurementNeeded: bodyMeasurementNeeded,
                productDescription: productDescription,
                productPrice: productPrice,
                isActive: isActive,
              })
              .then(() => {
                console.log('Product updated/image deleted!');
              });
          });
      }
    });
  }
};
export const fetchUserStoreProducts = storeId => {
  //FOR USER STORE
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    firestore()
      .collection('Products')
      .where('storeId', '==', storeId)
      .onSnapshot(documentSnapshot => {
        const storeProducts = [];
        documentSnapshot.docs.forEach(item => {
          const productData = item.data();
          storeProducts.push(
            new product(
              item.id,
              productData.storeId,
              productData.productTitle,
              productData.productImages,
              productData.productCategory,
              productData.bodyMeasurementNeeded,
              productData.productDescription,
              productData.productPrice,
              productData.productPrimaryImage,
              productData.isActive,
              productData.storeStatus,
            ),
          );
        });
        dispatch({
          type: SET_USER_PRODUCTS,
          userStoreProducts: storeProducts,
        });
      });
  };

  /*  const url = storage()
    .ref(
      'products/rn_image_picker_lib_temp_fbc49940-0e52-4119-aced-dfffe066919e.jpg',
    )
    .getDownloadURL();
  console.log(url); */
  /*   firestore()
    .collection('Products')
    .get()
    .then(documentSnapshot => {
      let data = [];
      documentSnapshot.docs.forEach(item => {
        for (let i = 0; i < item.data().uri.length; i++) {
          data.push({uri: item.data().uri[i]});
          console.log('data: ' + item.data().uri[i] + 'i: ' + i);
        }
      });
      console.log(data);
    }); */
};

export const fetchStoreProduct = storeId => {
  //FOR STORE DETAIL

  return (dispatch, getState) => {
    firestore()
      .collection('Products')
      .where('isActive', '==', true)
      .where('storeId', '==', storeId)
      .where('storeStatus', '==', 'approved')
      .onSnapshot(documentSnapshot => {
        const storeProducts = [];
        documentSnapshot.docs.forEach(item => {
          const productData = item.data();
          storeProducts.push(
            new product(
              item.id,
              productData.storeId,
              productData.productTitle,
              productData.productImages,
              productData.productCategory,
              productData.bodyMeasurementNeeded,
              productData.productDescription,
              productData.productPrice,
              productData.productPrimaryImage,
              productData.isActive,
              productData.storeStatus,
            ),
          );
        });
        dispatch({
          type: SET_STORE_PRODUCTS,
          storeProducts: storeProducts,
        });
      });
  };
};

export const fetchAllProducts = (dispatch, getState) => {
  //FOR PRODUCT OVERVIEWS
  firestore()
    .collection('Products')
    .where('isActive', '==', true)
    .where('storeStatus', '==', 'approved')
    .onSnapshot(documentSnapshot => {
      const allProducts = [];
      documentSnapshot.docs.forEach(item => {
        const productData = item.data();
        allProducts.push(
          new product(
            item.id,
            productData.storeId,
            productData.productTitle,
            productData.productImages,
            productData.productCategory,
            productData.bodyMeasurementNeeded,
            productData.productDescription,
            productData.productPrice,
            productData.productPrimaryImage,
            productData.isActive,
            productData.storeStatus,
          ),
        );
      });
      dispatch({
        type: SET_ALL_PRODUCTS,
        allStoreProduct: allProducts,
      });
    });
};
export const fetchSpecificProduct = productId => {
  return (dispatch, getState) => {
    firestore()
      .collection('Products')
      .doc(productId)
      .onSnapshot(documentSnapshot => {
        const specificId = documentSnapshot.id;
        let productData = documentSnapshot.data();
        productData.id = specificId;
        dispatch({
          type: SET_SPECIFIC_PRODUCT,
          specificProduct: productData,
        });
      });
  };
};
export const fetchCartProducts = storeId => {
  //FOR CART NOT TO ERROR WHILE ADDING NEW PRODUCT
  return (dispatch, getState) => {
    firestore()
      .collection('Products')
      .where('storeId', 'in', storeId)
      .onSnapshot(documentSnapshot => {
        const storeProducts = [];
        documentSnapshot.docs.forEach(item => {
          const productData = item.data();
          storeProducts.push(
            new product(
              item.id,
              productData.storeId,
              productData.productTitle,
              productData.productImages,
              productData.productCategory,
              productData.bodyMeasurementNeeded,
              productData.productDescription,
              productData.productPrice,
              productData.isActive,
              productData.storeStatus,
            ),
          );
        });
        dispatch({
          type: SET_CART_PRODUCTS,
          cartProducts: storeProducts,
        });
      });
  };
};
