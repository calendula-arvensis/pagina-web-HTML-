import {Image} from 'expo-image';
import {ImageSourcePropType, StyleSheet, Dimensions} from 'react-native'; 

const { width, height } = Dimensions.get('window');

type Props = {
    imgSource: ImageSourcePropType;
};

export default function ImageViewer({imgSource}:Props){
    return <Image source={imgSource} style={styles.image}  contentFit="cover"
      contentPosition="left center"/>
}

const styles = StyleSheet.create({
  image:{
    width: width * 0.9, 
    height:height * 0.44, 
    borderRadius:18, 
    position:'absolute',
    margin:width*0.05,
  },
});