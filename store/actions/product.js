import product from '../../models/products';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

/* export const CREATE_NEW_PRODUCT = 'CREATE_NEW_PRODUCT'; */

export const SET_USER_PRODUCTS = 'SET_USER_PRODUCTS';
export const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const createProduct = (
  productTitle,
  productImages,
  productCategory,
  bodyMeasurementNeeded,
  productDescription,
  productPrice,
  isActive,
) => {
  return (dispatch, getState) => {
    let productFileName = [];
    const userId = getState().auth.userId;
    productImages.map(value => {
      productFileName.push(value.imageFileName);
    });
    productImages.map(value => {
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
        storeId: userId,
        productTitle: productTitle,
        productImages: productFileName,
        productCategory: productCategory,
        bodyMeasurementNeeded: bodyMeasurementNeeded,
        productDescription: productDescription,
        productPrice: productPrice,
        isActive: isActive,
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
  productCategory,
  bodyMeasurementNeeded,
  productDescription,
  productPrice,
  isActive,
) => {
  let productFileName = [];
  productImages.map(value => {
    productFileName.push(value.imageFileName);
  });
  //delete image

  initialImages.map(value => {
    const a = productFileName.find(prod => prod === value);
    if (a) {
    } else {
      storage().ref(`products/${value}`).delete();
    }
  });
  //upload image
  productImages.map(value => {
    const a = initialImages.find(prod => prod === value.imageFileName);
    if (a) {
    } else {
      storage()
        .ref(`products/${value.imageFileName}`)
        .putFile(value.imageUri)
        .on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
    }
  });

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
      console.log('Product updated!');
    });
};
export const fetchStoreProducts = (dispatch, getState) => {
  const userId = getState().auth.userId;

  firestore()
    .collection('Products')
    .where('storeId', '==', userId)
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
          ),
        );
      });
      dispatch({
        type: SET_USER_PRODUCTS,
        storeProducts: storeProducts,
      });
    });

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
export const fetchAllProducts = (dispatch, getState) => {
  firestore()
    .collection('Products')
    .where('isActive', '==', true)
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
            productData.isActive,
          ),
        );
      });
      dispatch({
        type: SET_ALL_PRODUCTS,
        allStoreProduct: allProducts,
      });
    });
};
