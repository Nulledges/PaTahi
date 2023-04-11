import React, {useRef, useState, useEffect, useCallback} from 'react';
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
const ProductDetailStoreItem = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [productImage, setProductImage] = useState();
  const [sName, setSName] = useState('');

  useEffect(() => {
    if (props.storeIcon == '' || props.name == '') {
      return;
    }
    setSName(props.name);
    const downloadProductImage = async () => {
      setIsLoading(true);
      setTimeout(async () => {
        const fromStorage = await storage()
          .ref(`stores/icons/` + props.storeIcon)
          .getDownloadURL();
        setProductImage(fromStorage);
        setIsLoading(false);
      }, 100);
    };
    downloadProductImage();
  }, [props.storeIcon]);

  return (
    <View style={styles.container}>
      <View style={styles.storeContainer}>
        <Image
          resizeMode="stretch"
          style={styles.storeImage}
          source={{uri: productImage}}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}>
          {sName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 5},
  storeContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 10,
    flexDirection: 'row',
  },
  storeImage: {
    backgroundColor: 'black',
    borderRadius: 200,
    height: 55,
    width: 55,
  },
  text: {
    color: 'black',
  },
  /*  starContainer: {
    backgroundColor: '#FFFFFF',
  },
  starInfoContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  star: {
    flexDirection: 'row',
  },
  reviewNumbers: {
    color: 'black',
  },
  reviewContainer: {
    marginTop: 1,
    backgroundColor: '#FFFFFF',
  },
  reviewInfoContainer: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
  },
  reviewText: {
    color: 'black',
  },

  showMoreContainer: {
    marginTop: 1,
    backgroundColor: '#FFFFFF',
  },
  showMoreInfoContainer: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMoreText: {
    color: 'black',
  }, */
});

export default ProductDetailStoreItem;
