import storeVerificationForm from '../../models/storeVerificationForm';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const SET_MY_VERIFICATION_HISTORY = 'SET_MY_VERIFICATION_HISTORY';

export const SET_STORE_APPLICATION = 'SET_STORE_APPLICATION';
export const SET_USERBYADMIN_APPLICATION = 'SET_USERBYADMIN_APPLICATION';
export const SET_USER_APPLICATION = 'SET_USER_APPLICATION';
export const SET_APPROVED_APPLICATION = 'SET_APPROVED_APPLICATION';

export const createStoreVerification = (
  storeId,
  storeName,
  storeOwner,
  businessPermitImageUri,
  businessPermitImageFileName,
) => {
  return async (dispatch, getState) => {
    const currentDate = new Date();
    /*     const userId = getState().auth.userId; */
    /*  console.log(storeIconUri);

    storage().d
      .ref(`storeApplications/${storeIconFileName}`)
      .put(storeIconUri.blob(), 'base64', {
        contentType: 'image/jpeg',
      })
      .on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      }); */
    /*    storage()
      .ref(`storeApplications/${storeImageFileName}`)
      .putFile(storeImageUri)
      .on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });
      */
    storage()
      .ref(`storeApplications/${businessPermitImageFileName}`)
      .putFile(businessPermitImageUri)
      .on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

    firestore().collection('storeApplications').add({
      businessPermitImage: businessPermitImageFileName,
      dateVerified: '',
      dateSubmitted: currentDate,
      status: 'pending',
      storeAddress: '',
      storeName: storeName,
      storeOwner: storeOwner,
      storeId: storeId,
    });
    firestore().collection('stores').doc(storeId).update({status: 'pending'});
  };
};

export const fetchVerificationHistory = storeId => {
  return (dispatch, getState) => {
    firestore()
      .collection('storeApplications')
      .where('storeId', '==', storeId)
      .orderBy('dateSubmitted')
      .get()
      .then(documentSnapshot => {
        const myVerificationHistory = [];
        documentSnapshot.docs.forEach(item => {
          const applicationData = item.data();
          if (applicationData.dateVerified == '') {
            myVerificationHistory.push(
              new storeVerificationForm(
                applicationData.businessPermitImage,
                applicationData.dateSubmitted.toDate().toDateString(),
                applicationData.dateVerified,
                applicationData.status,
                applicationData.storeAddress,
                applicationData.storeId,
                applicationData.storeName,
                applicationData.storeOwner,
                item.id,
              ),
            );
          } else {
            myVerificationHistory.push(
              new storeVerificationForm(
                applicationData.businessPermitImage,
                applicationData.dateSubmitted.toDate().toDateString(),
                applicationData.dateVerified.toDate().toDateString(),
                applicationData.status,
                applicationData.storeAddress,
                applicationData.storeId,
                applicationData.storeName,
                applicationData.storeOwner,
                item.id,
              ),
            );
          }
        });

        dispatch({
          type: SET_MY_VERIFICATION_HISTORY,
          myVerificationHistory: myVerificationHistory,
        });
      });
  };

  /*     return console.log("hello") */
};
//for history
export const fetchAllTailorApplication = (dispatch, getState) => {
  firestore()
    .collection('storeApplications')
    .orderBy('dateSubmitted')
    .get()
    .then(documentSnapshot => {
      const allStoreApplications = [];
      documentSnapshot.docs.forEach(item => {
        const applicationData = item.data();

        allStoreApplications.push(
          new storeVerificationForm(
            applicationData.businessPermitImage,
            applicationData.dateSubmitted.toDate().toDateString(),
            applicationData.status,
            applicationData.storeAdress,
            applicationData.storeImage,
            applicationData.storeName,
            applicationData.userId,
            item.id,
          ),
        );
      });

      dispatch({
        type: SET_STORE_APPLICATION,
        storeApplicationInfo: allStoreApplications,
      });
    });
  /*     return console.log("hello") */
};
//for specific user
export const fetchUserTailorApplication = (dispatch, getState) => {
  const userId = getState().auth.userId;
  firestore()
    .collection('storeApplications')
    .orderBy('dateSubmitted')
    .where('userId', '==', userId)
    .get()
    .then(documentSnapshot => {
      const UserApplications = [];
      documentSnapshot.docs.forEach(item => {
        const applicationData = item.data();
        UserApplications.push(
          new storeVerificationForm(
            applicationData.businessPermitImage,
            applicationData.dateSubmitted.toDate().toDateString(),
            applicationData.status,
            applicationData.storeAdress,
            applicationData.storeImage,
            applicationData.storeName,
            applicationData.userId,
            item.id,
          ),
        );
      });

      dispatch({
        type: SET_USER_APPLICATION,
        userApplicationInfo: UserApplications,
      });
    });
};
export const fetchAllApprovedTailorApplication = (dispatch, getState) => {
  firestore()
    .collection('storeApplications')
    .where('status', '==', 'approved')
    .orderBy('dateSubmitted')
    .get()
    .then(documentSnapshot => {
      const appprovedStoreApplications = [];
      documentSnapshot.docs.forEach(item => {
        const applicationData = item.data();
        appprovedStoreApplications.push(
          new storeVerificationForm(
            applicationData.businessPermitImage,
            applicationData.dateSubmitted.toDate().toDateString(),
            applicationData.status,
            applicationData.storeAdress,
            applicationData.storeImage,
            applicationData.storeName,
            applicationData.userId,
            item.id,
          ),
        );
      });
      dispatch({
        type: SET_APPROVED_APPLICATION,
        approvedApplicationInfo: appprovedStoreApplications,
      });
    });
  /*     return console.log("hello") */
};
/* .filter(
  storeApplication => storeApplication.userId === userId,
) */
/* 
.sort((a, b) => {
  return new Date(a.dateSubmitted) - new Date(b.dateSubmitted);
}), */
