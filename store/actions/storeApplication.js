import storeApplications from '../../models/storeApplications';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const SET_STORE_APPLICATION = 'SET_STORE_APPLICATION';
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
    console.log(storeName);

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

export const fetchTailorApplication = () => {
  return async (dispatch, getState) => {
    let initialize = false;
    const userId = getState().auth.userId;
    if (!initialize) {
      initialize = true;
      firestore()
        .collection('TailorApplications')
        .get()
        .then(documentSnapshot => {
          const allStoreApplications = [];
          documentSnapshot.docs.forEach(item => {
            const applicationData = item.data();

            allStoreApplications.push(
              new storeApplications(
                applicationData.businessPermitImage,
                applicationData.dateSubmitted.toDate(),
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
            userApplicationInfo: allStoreApplications
              .filter(storeApplication => storeApplication.userId === userId)
              .sort((a, b) => {
                return new Date(a.dateSubmitted) - new Date(b.dateSubmitted);
              }),
          });
        });
    }
  };
};
