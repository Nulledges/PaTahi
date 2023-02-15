import storeVerificationForm from '../../models/storeVerificationForm';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const SET_PENDING_VERIFICATION_FORM = 'SET_PENDING_VERIFICATION_FORM';

export const fetchPendingTailorApplication = (dispatch, getState) => {
  firestore()
    .collection('storeApplications')
    .where('status', '==', 'pending')
    .orderBy('dateSubmitted')
    .onSnapshot(querySnapshot => {
      const pendingStoreVerificationForm = [];
      querySnapshot.docs.forEach(item => {
        const applicationData = item.data();
        pendingStoreVerificationForm.push(
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
      });

      dispatch({
        type: SET_PENDING_VERIFICATION_FORM,
        pendingStoreVerificationFormInfo: pendingStoreVerificationForm,
      });
    });
};

export const approveStore = (id, storeId) => {
  return async (dispatch, getState) => {
    const currentDate = new Date();
    firestore()
      .collection('storeApplications')
      .doc(id)
      .update({status: 'approved', dateVerified: currentDate});
    firestore().collection('stores').doc(storeId).update({status: 'approved'});
  };
};
export const rejectStore = (id, storeId) => {
  return async (dispatch, getState) => {
    const currentDate = new Date();
    firestore()
      .collection('storeApplications')
      .doc(id)
      .update({status: 'rejected', dateVerified: currentDate});
    firestore().collection('stores').doc(storeId).update({status: 'rejected'});
  };
};
