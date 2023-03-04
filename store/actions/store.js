import stores from '../../models/stores';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const SET_USER_STORE = 'SET_USER_STORE';
export const SET_APPROVED_STORE = 'SET_APPROVED_STORE';
export const SET_APPROVED_CART_STORE = 'SET_APPROVED_CART_STORE';
export const SET_SPECIFIC_STORE = 'SET_SPECIFIC_STORE';

export const createStore = (
  storeName,
  storeOwner,
  storeImageUri,
  storeImageFilename,
  storeIconUri,
  storeIconFileName,
  email,
  phone,
  location,
) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    storage()
      .ref(`stores/${storeImageFilename}`)
      .putFile(storeImageUri)
      .on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });
    storage()
      .ref(`stores/${storeIconFileName}`)
      .putFile(storeIconUri)
      .on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });
    firestore().collection('stores').doc(userId).set({
      activeProduct: 0,
      email: email,
      inactiveProduct: 0,
      location: location,
      phoneNumber: phone,
      status: 'verification needed',
      storeImage: storeImageFilename,
      storeIcon: storeIconFileName,
      storeId: userId,
      storeName: storeName,
      storeOwner: storeOwner,
    }).then;
    firestore().collection('Users').doc(userId).update({isTailor: true});
  };
};
export const fetchUserStore = (dispatch, getState) => {
  const userId = getState().auth.userId;

  firestore()
    .collection('stores')
    .doc(userId)
    .onSnapshot(documentSnapshot => {
      const userId = documentSnapshot.id;
      let storeData = documentSnapshot.data();

      storeData.userId = userId;

      /* const myStore = [];
        documentSnapshot.docs.forEach(item => {
          const storeData = item.data();
          myStore.push(
            new tailors(
              item.id,
              storeData.activeProduct,
              storeData.email,
              storeData.inactiveProduct,
              storeData.location,
              storeData.phoneNumber,
              storeData.status,
              storeData.storeImage,
              storeData.storeName,
              storeData.storeOwner,
              storeData.userId,
            ),
          );
        }); */

      dispatch({
        type: SET_USER_STORE,
        myStoreInfo: storeData,
      });
    });
};
export const fetchAllApprovedStore = (dispatch, getState) => {
  firestore()
    .collection('stores')
    .where('status', '==', 'approved')
    .onSnapshot(documentSnapshot => {
      const allApprovedStores = [];
      documentSnapshot.docs.forEach(item => {
        const approvedStore = item.data();

        allApprovedStores.push(
          new stores(
            approvedStore.storeId,
            approvedStore.activeProduct,
            approvedStore.email,
            approvedStore.inactiveProduct,
            approvedStore.location,
            approvedStore.phoneNumber,
            approvedStore.status,
            approvedStore.storeIcon,
            approvedStore.storeImage,
            approvedStore.storeName,
            approvedStore.storeOwner,
            item.id,
          ),
        );
      });
      dispatch({
        type: 'SET_APPROVED_STORE',
        approvedStoreInfo: allApprovedStores,
      });
    });
};
export const fetchCartStore = storeId => {
  //FOR CART NOT TO ERROR WHILE ADDING NEW PRODUCT
  return (dispatch, getState) => {
    firestore()
      .collection('stores')
      .where('storeId', 'in', storeId)
      .onSnapshot(documentSnapshot => {
        const allCartApprovedStores = [];
        documentSnapshot.docs.forEach(item => {
          const approvedStore = item.data();
          allCartApprovedStores.push(
            new stores(
              approvedStore.storeId,
              approvedStore.activeProduct,
              approvedStore.email,
              approvedStore.inactiveProduct,
              approvedStore.location,
              approvedStore.phoneNumber,
              approvedStore.status,
              approvedStore.storeIcon,
              approvedStore.storeImage,
              approvedStore.storeName,
              approvedStore.storeOwner,
              item.id,
            ),
          );
        });
        dispatch({
          type: 'SET_APPROVED_CART_STORE',
          cartApprovedStoreInfo: allCartApprovedStores,
        });
      });
  };
};
export const fetchSpecificStore = storeId => {
  //FOR STORE
  return (dispatch, getState) => {
    firestore()
      .collection('stores')
      .where('storeId', '==', storeId)
      .onSnapshot(documentSnapshot => {
        const specificStore = [];
        documentSnapshot.docs.forEach(item => {
          const approvedStore = item.data();
          specificStore.push(
            new stores(
              approvedStore.storeId,
              approvedStore.activeProduct,
              approvedStore.email,
              approvedStore.inactiveProduct,
              approvedStore.location,
              approvedStore.phoneNumber,
              approvedStore.status,
              approvedStore.storeIcon,
              approvedStore.storeImage,
              approvedStore.storeName,
              approvedStore.storeOwner,
              item.id,
            ),
          );
        });
        dispatch({
          type: 'SET_SPECIFIC_STORE',
          specificStore: specificStore,
        });
      });
  };
};
export const updateStoreImages = (
  storeId,
  storeIconInitialFileName,
  storeIconUri,
  storeIconFileName,
  storeImageInitialFileName,
  storeImageUri,
  storeImageFileName,
) => {
  return (dispatch, getState) => {
    if (storeIconInitialFileName === storeIconFileName) {
    } else {
      //update storeIcon
      storage()
        .ref(`stores/${storeIconFileName}`)
        .putFile(storeIconUri)
        .on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
      //delete Prev icon
      storage().ref(`stores/${storeIconInitialFileName}`).delete();
      //update firestore
      if (storeIconFileName == '') {
      } else {
        firestore().collection('stores').doc(storeId).update({
          storeIcon: storeIconFileName,
        });
      }
    }

    if (storeImageInitialFileName === storeImageFileName) {
    } else {
      //update store image
      storage()
        .ref(`stores/${storeImageFileName}`)
        .putFile(storeImageUri)
        .on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
      storage().ref(`stores/${storeImageInitialFileName}`).delete();
      if (storeImageFileName === '') {
      } else {
        firestore().collection('stores').doc(storeId).update({
          storeImage: storeImageFileName,
        });
      }
    }
  };
};
export const updateStoreName = (storeId, storeName) => {
  return async (dispatch, getState) => {
    firestore()
      .collection('stores')
      .doc(storeId)
      .update({storeName: storeName});
  };
};
export const updateStoreOwner = (storeId, storeOwner) => {
  return async (dispatch, getState) => {
    firestore()
      .collection('stores')
      .doc(storeId)
      .update({storeOwner: storeOwner});
  };
};
