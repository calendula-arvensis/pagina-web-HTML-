import {Text, View, StyleSheet} from 'react-native';

export default function ConocenosScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}> Conocenos! screen </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor:'#f790beff',
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    text:{
        color: '#fff',
    },
});