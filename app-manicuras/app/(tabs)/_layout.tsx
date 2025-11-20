import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#f99dc6ff',
                tabBarInactiveTintColor:'#f99dc6ff',
                headerStyle:{
                    backgroundColor:'#f268a6ff',
                },
                headerShadowVisible:true,
                headerTintColor:'#fff',
                tabBarStyle:{
                    backgroundColor:'#f268a6ff',
                }
            }}>
            <Tabs.Screen name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    )
                }}
            />
            <Tabs.Screen name="conocenos"
                options={{
                    title: 'Conocenos',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
                    )
                }}
            />
        </Tabs>
    );
}