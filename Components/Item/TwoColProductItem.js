import React, {useState, useEffect} from 'react';
import {AirbnbRating} from 'react-native-ratings';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import SkeletonPlaceHolder from 'react-native-skeleton-placeholder';
const TwoColProductItem = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [productImage, setProductImage] = useState();
  useEffect(() => {
    const downloadProductImage = async () => {
      setIsLoading(true);
      setTimeout(async () => {
        const fromStorage = await storage()
          .ref(`products/primary/` + props.images)
          .getDownloadURL();
        setProductImage(fromStorage);
        setIsLoading(false);
      }, 100);
    };
    downloadProductImage();
  }, [props.images]);

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={props.onPress}>
      {isLoading ? (
        <SkeletonPlaceHolder backgroundColor="#a3a3a3">
          <SkeletonPlaceHolder.Item width={'100%'} height={200} />
        </SkeletonPlaceHolder>
      ) : (
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={{uri: productImage}} />
        </View>
      )}

      <View style={styles.infoContainer}>
        {isLoading ? (
          <SkeletonPlaceHolder backgroundColor="#a3a3a3">
            <SkeletonPlaceHolder.Item
              marginBottom={10}
              width={'25%'}
              height={14}
            />
          </SkeletonPlaceHolder>
        ) : (
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {props.title}
            </Text>
          </View>
        )}
        {isLoading ? (
          <SkeletonPlaceHolder backgroundColor="#a3a3a3">
            <SkeletonPlaceHolder.Item padding={5} width={'50%'} height={20} />
          </SkeletonPlaceHolder>
        ) : (
          <View style={styles.priceContainer}>
            <Text numberOfLines={1} style={styles.price}>
              ₱ {props.price}
            </Text>
          </View>
        )}
     {/*    <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.reviewContainer}>
            <View style={styles.review}>
              <AirbnbRating
                starContainerStyle={{borderColor: 'red'}}
                defaultRating={4}
                size={13}
                showRating={false}
                isDisabled={true}
                count={5}
              />
              <Text style={styles.reviewTextStyle}>({12})</Text>
            </View>
          </View>
        </TouchableWithoutFeedback> */}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  twoColProductItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '49%',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 350,
    margin: 2,
    marginTop: 8,
  },
  imageContainer: {
    width: '100%',
    height: 200,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  infoContainer: {
    width: '100%',
    height: 150,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    flexShrink: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  price: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  reviewContainer: {
    justifyContent: 'flex-start',
  },
  review: {
    flexDirection: 'row',
  },
  reviewTextStyle: {
    color: 'black',
  },
});

export default TwoColProductItem;
