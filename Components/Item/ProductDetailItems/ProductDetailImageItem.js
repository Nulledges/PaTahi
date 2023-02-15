import React, {useRef, useState, useEffect, useCallback} from 'react';
import {AirbnbRating} from 'react-native-ratings';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import ImageView from 'react-native-image-viewing';
const {width} = Dimensions.get('screen');
const height = width * 0.8;
const ProductDetailImageItem = props => {
  const flatlistRef = useRef(null);
  const [active, setActive] = useState(0);
  const [productImages, setProductImages] = useState([]);
  const [imageViewIsVisible, setImageViewIsVisible] = useState(false);
  const change = ({nativeEvent}) => {
    const slide =
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width;
    if (slide !== active) {
      setActive(slide);
    }
  };
  useEffect(() => {
    let arrayImages = [];

    props.images.map(async (image, index) => {
      setTimeout(async () => {
        const fromStorage = await storage()
          .ref(`products/` + image)
          .getDownloadURL();
        arrayImages.push({uri: fromStorage});
        setProductImages(arrayImages);
      });
    }, 3000);
  }, [props.images]);
  return (
    <View>
      <View style={styles.container}>
        <FlatList
          ref={flatlistRef}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={productImages}
          onScroll={change}
          pagingEnabled
          style={styles.imageScroll}
          renderItem={item => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  setImageViewIsVisible(true);
                }}>
                <Image
                  key={item.index}
                  source={{uri: item.item.uri}}
                  style={styles.imageContainer}
                />
              </TouchableWithoutFeedback>
            );
          }}
        />
        <View style={styles.pagination}>
          <Text style={styles.paginationActiveText}>
            {parseInt(active + 1)}/{' '}
            {props.images == undefined ? '' : props.images.length}
          </Text>
        </View>
      </View>
      <ImageView
        images={productImages}
        onImageIndexChange={index => {
          setActive(index);
        }}
        presentationStyle="formSheet"
        imageIndex={active}
        visible={imageViewIsVisible}
        onRequestClose={() => {
          flatlistRef.current.scrollToIndex({index: active});
          setImageViewIsVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  imageContainer: {
    width,
    height,
  },
  imageScroll: {
    width,
    height,
  },
  productImages: {
    width,
    height,
    resizeMode: 'stretch',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
  },
  paginationText: {
    fontSize: width / 30,
    color: '#888',
    margin: 5,
  },
  paginationActiveText: {
    fontSize: width / 30,
    color: '#FFF',
    margin: 5,
  },
});

export default ProductDetailImageItem;
