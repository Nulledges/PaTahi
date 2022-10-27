import storeApplications from '../../models/storeApplications';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const SET_STORE_APPLICATION = 'SET_STORE_APPLICATION';
export const SET_PENDING_APPLICATION = 'SET_PENDING_APPLICATION';
export const SET_USERBYADMIN_APPLICATION = 'SET_USERBYADMIN_APPLICATION';
export const SET_USER_APPLICATION = 'SET_USER_APPLICATION';
export const SET_APPROVED_APPLICATION = 'SET_APPROVED_APPLICATION';
export const createTailorApplication = (
  storeImageUri,
  storeImageFilename,
  businessPermitImageUri,
  businessPermitImageFileName,
  storeName,
) => {
  return async (dispatch, getState) => {
    const currentDate = new Date();
    let initialize = false;
    const userId = getState().auth.userId;

    if (!initialize) {
      initialize = true;
      const storeImageUpload = storage()
        .ref(storeImageFilename)
        .putFile(storeImageUri);
      const businessPermitImageUpload = storage()
        .ref(businessPermitImageFileName)
        .putFile(businessPermitImageUri);
      storeImageUpload.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      businessPermitImageUpload.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      firestore().collection('TailorApplications').add({
        businessPermitImage: businessPermitImageFileName,
        dateSubmitted: currentDate,
        status: 'pending',
        storeAddress: '',
        storeImage: storeImageFilename,
        storeName: storeName,
        userId: userId,
      });
    }
  };
};
//for history
export const fetchAllTailorApplication = (dispatch, getState) => {
  firestore()
    .collection('TailorApplications')
    .orderBy('dateSubmitted')
    .get()
    .then(documentSnapshot => {
      const allStoreApplications = [];
      documentSnapshot.docs.forEach(item => {
        const applicationData = item.data();

        allStoreApplications.push(
          new storeApplications(
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
//get all pending user for admin
export const fetchPendingTailorApplication = (dispatch, getState) => {
  firestore()
    .collection('TailorApplications')
    .where('status', '==', 'pending')
    .orderBy('dateSubmitted')
    .get()
    .then(documentSnapshot => {
      const pendingStoreApplications = [];
      documentSnapshot.docs.forEach(item => {
        const applicationData = item.data();
        pendingStoreApplications.push(
          new storeApplications(
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
        type: SET_PENDING_APPLICATION,
        pendingStoreApplicationInfo: pendingStoreApplications,
      });
    });
  /*     return console.log("hello") */
};
//to get specific user for admin
export const fetchUserByAdminTailorApplication = (
  userId,
  dispatch,
  getState,
) => {
  firestore()
    .collection('TailorApplications')
    .where('userId', '==', userId)
    .orderBy('dateSubmitted')
    .get()
    .then(documentSnapshot => {
      const adminUserApplications = [];
      documentSnapshot.docs.forEach(item => {
        const applicationData = item.data();
        adminUserApplications.push(
          new storeApplications(
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
        type: SET_USERBYADMIN_APPLICATION,
        adminUserStoreApplicationInfo: adminUserApplications,
      });
    });
  /*     return console.log("hello") */
};
//for specific user
export const fetchUserTailorApplication = (dispatch, getState) => {
  const userId = getState().auth.userId;
  firestore()
    .collection('TailorApplications')
    .orderBy('dateSubmitted')
    .where('userId', '==', userId)
    .get()
    .then(documentSnapshot => {
      const UserApplications = [];
      documentSnapshot.docs.forEach(item => {
        const applicationData = item.data();
        UserApplications.push(
          new storeApplications(
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
    .collection('TailorApplications')
    .where('status', '==', 'approved')
    .orderBy('dateSubmitted')
    .get()
    .then(documentSnapshot => {
      const appprovedStoreApplications = [];
      documentSnapshot.docs.forEach(item => {
        const applicationData = item.data();
        appprovedStoreApplications.push(
          new storeApplications(
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
