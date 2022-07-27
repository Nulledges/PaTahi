import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const ImageWithLabel = props => {
  return (
    <View style={styles.imagePreview}>
      <Text style={styles.textStyle}>{props.label}</Text>
      <Image
        style={styles.image}
        resizeMode="stretch"
        source={{uri: props.uri}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
    marginLeft: '2%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageWithLabel;
