import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import storage from '@react-native-firebase/storage';
import SkeletonPlaceHolder from 'react-native-skeleton-placeholder';
import {useDispatch} from 'react-redux';

import Card from '../../Components/UI/Card';
import TwoLabelButton from '../../Components/UI/CustomButton/TwoLabelButton';
import MainButton from '../../Components/UI/CustomButton/MainButton';
import * as adminActions from '../../store/actions/admin';
const VerificationFormDetailScreen = props => {
  const dispatch = useDispatch();
  const verificationFormInformation = props.route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [businessPermitImage, setbusinessPermitImage] = useState();
  const [permitVisible, setIsPermitVisible] = useState(false);

  useEffect(() => {
    const downloadBusinessPermitImage = async () => {
      setIsLoading(true);

      const fromStorage = await storage()
        .ref(
          `storeApplications/` +
            verificationFormInformation.pendingVerificationForms
              .businessPermitImage,
        )
        .getDownloadURL();
      setbusinessPermitImage(fromStorage);
      setIsLoading(false);
    };
    downloadBusinessPermitImage();
  }, [verificationFormInformation]);
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle:
        verificationFormInformation.pendingVerificationForms.storeName.toUpperCase() +
        ' VERIFICATION INFO',
      headerTintColor: 'black',
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
    });
  }, [verificationFormInformation]);
  const approvedHandler = async () => {
    dispatch(
      adminActions.approveStore(
        verificationFormInformation.pendingVerificationForms.id,
        verificationFormInformation.pendingVerificationForms.storeId,
      ),
    );
    props.navigation.goBack();
  };
  const rejectedHandler = async () => {
    dispatch(
      adminActions.rejectStore(
        verificationFormInformation.pendingVerificationForms.id,
        verificationFormInformation.pendingVerificationForms.storeId,
      ),
    );
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={styles.scrollViewContainer}>
        <Card style={styles.itemContainer}>
          <View style={styles.DateContainer}>
            <Text style={{color: 'black'}}>DATE SUBMITTED: </Text>
            <Text style={{color: 'black'}}>
              {
                verificationFormInformation.pendingVerificationForms
                  .dateSubmitted
              }
            </Text>
          </View>
          <Text style={{color: 'black'}}>BUSINESS PERMIT</Text>
          {isLoading ? (
            <SkeletonPlaceHolder backgroundColor="#a3a3a3">
              <SkeletonPlaceHolder.Item width={'100%'} height={200} />
            </SkeletonPlaceHolder>
          ) : (
            <View style={styles.imagePreview}>
              <TouchableWithoutFeedback
                onPress={() => {
                  isLoading ? '' : setIsPermitVisible(true);
                }}>
                <Image
                  resizeMode="stretch"
                  style={styles.image}
                  source={{
                    uri: businessPermitImage,
                  }}
                />
              </TouchableWithoutFeedback>
            </View>
          )}
          <ImageView
            images={[
              {
                uri: businessPermitImage,
              },
            ]}
            imageIndex={0}
            visible={permitVisible}
            onRequestClose={() => setIsPermitVisible(false)}
          />
        </Card>
        <Card style={styles.itemContainer}>
          <TwoLabelButton
            firstLabel="Store Name"
            secondLabel={
              verificationFormInformation.pendingVerificationForms.storeName
            }
            onPress={() => {}}
          />
          <TwoLabelButton
            firstLabel="Store Owner"
            secondLabel={
              verificationFormInformation.pendingVerificationForms.storeOwner
            }
            onPress={() => {}}
          />
        </Card>
      </ScrollView>

      <Card style={styles.buttonContainer}>
        <View style={styles.centered}>
          <View style={styles.buttonItemContainer}>
            <MainButton
              style={{backgroundColor: 'green'}}
              label="APPROVE"
              onPress={approvedHandler}
            />
          </View>
          <View style={styles.buttonItemContainer}>
            <MainButton
              style={{backgroundColor: 'red'}}
              label="REJECT"
              onPress={rejectedHandler}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  scrollViewContainer: {
    marginBottom: 50,
  },
  itemContainer: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  DateContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
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
  buttonContainer: {
    width: '100%',
    padding: 10,
    height: 70,
    bottom: 0,
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  centered: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonItemContainer: {
    width: '50%',
    marginHorizontal: 5,
  },
});
export default VerificationFormDetailScreen;
