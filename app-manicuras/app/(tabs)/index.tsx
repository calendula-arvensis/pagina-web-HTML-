import {StyleSheet, Text, View } from "react-native";
import {Link} from 'expo-router';
import { Background } from "@react-navigation/elements";
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/fondo-mesa-manicura/mesa.png');
const color = require('@/assets/images/img2.jpg');

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={color}/>
        <ImageViewer imgSource={PlaceholderImage}/>
      </View>
      {/* <Text>Hello world!</Text>
      <Link href="/conocenos" style={styles.button} >
       Go to Conocenos screen
      </Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f790beff', 
  },
  text:{
    color:'#fff',
  },
  button:{
    fontSize: 20,
    textDecorationLine: 'underline', 
    color:'#fff',
  },
  imageContainer:{
    flex:1,
    alignSelf:'center',
    position:'relative',
    alignItems: 'center',
  },
});