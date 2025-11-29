import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#fbabcfff',
                tabBarInactiveTintColor:'#fbabcfff',
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
                    title: '¡Diseña tus uñas!',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'hand-right' : 'hand-right-outline'} color={color} size={24} />
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