import React, {
  useState,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import {AirbnbRating} from 'react-native-ratings';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import Card from '../UI/Card';
import SkeletonPlaceHolder from 'react-native-skeleton-placeholder';
const StoreOverviewItem = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [productImage, setProductImage] = useState();
  useEffect(() => {
    const downloadStoreImage = async () => {
      setIsLoading(true);
      setTimeout(async () => {
        const fromStorage = await storage()
          .ref('stores/' + props.storeImage)
          .getDownloadURL();

        setProductImage(fromStorage);
        setIsLoading(false);
      }, 200);
    };
    downloadStoreImage();
  }, [props.storeImage]);
  return (
    <Card style={styles.store}>
      <View style={styles.storeContainer}>
        <TouchableWithoutFeedback onPress={props.onPress}>
          <View>
            {isLoading ? (
              <SkeletonPlaceHolder backgroundColor="#a3a3a3">
                <SkeletonPlaceHolder.Item width={'100%'} height={200} />
              </SkeletonPlaceHolder>
            ) : (
              <View style={styles.imageContainer}>
                <Image
                  resizeMode="stretch"
                  style={styles.image}
                  source={{uri: productImage}}
                />
              </View>
            )}
            <View style={styles.infoContainer}>
              <Text style={styles.storeName}>{props.storeName}</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.reviewContainer}>
                <View style={styles.review}>
                  <AirbnbRating
                    defaultRating={4}
                    size={15}
                    showRating={false}
                    isDisabled={true}
                    count={5}
                  />
                  <Text>`({12})`</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  store: {
    flex: 1,

    marginVertical: 5,
  },
  storeContainer: {
    height: 330,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    height: 105,
  },
  infoBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: '45%',
  },
  storeName: {
    fontSize: 20,
    marginVertical: 2,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'black',
  },
  reviewContainer: {
    justifyContent: 'flex-start',
    height: 30,
    borderTopWidth: 1,
  },
  review: {
    flexDirection: 'row',
  },
});

export default StoreOverviewItem;
