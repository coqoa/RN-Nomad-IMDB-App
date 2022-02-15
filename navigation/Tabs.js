import Recat from 'react';
import {BottomTabView, createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import {Ionicons} from "@expo/vector-icons"
import { useColorScheme } from "react-native"

const Tab = createBottomTabNavigator();
const Tabs = () => {
    const isDark = useColorScheme() === "dark" ;
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle:{ backgroundColor: isDark ? "black" : "white"},
            tabBarActiveTintColor: isDark ? "#feca57" : "#ff9f43",
            headerStyle:{ backgroundColor: isDark ? "black" : "white"},
            headerTitleStyle:{color: isDark ? "white" : "black"},
            tabBarLabelStyle:{
                fontSize: 12,
                fontWeight: "600"
            }
        }}>
            <Tab.Screen 
            name="Movies" 
            component={Movies} 
            options={{
                // headerShown: false,
                tabBarIcon:({focused, color, size}) => <Ionicons name={focused? "film" : "film-outline"} color={color} size={size} />
            }} />
            <Tab.Screen 
            name="TV" 
            component={Tv}
            options={{
                tabBarIcon:({focused, color, size}) => <Ionicons name={focused? "tv" : "tv-outline"} color={color} size={size} />
            }}/>
            <Tab.Screen 
            name="Search" 
            component={Search} 
            options={{
                tabBarIcon:({focused, color, size}) => <Ionicons name={focused? "search" : "search-outline"} color={color} size={size} />
            }}/>
        </Tab.Navigator>
    )
}
export default Tabs;