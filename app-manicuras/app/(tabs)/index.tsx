import {StyleSheet, Text, View } from "react-native";
import {Link} from 'expo-router';

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text>Hello world!</Text>
      <Link href="/conocenos" style={styles.button} >
       Go to Conocenos screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f790beff', 
    alignItems: 'center', 
    justifyContent:'center',
  },
  text:{
    color:'#fff',
  },
  button:{
    fontSize: 20,
    textDecorationLine: 'underline', 
    color:'#fff',
  },
});