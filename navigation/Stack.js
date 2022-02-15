import react from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 
import {Text, View, TouchableOpacity} from "react-native"

const NativeStack = createNativeStackNavigator();

const ScreenOne = ({navigation : {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Two")}>
        <Text>One</Text>
    </TouchableOpacity>
)
const ScreenTwo = ({navigation : {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Three")}>
        <Text>Two</Text>
    </TouchableOpacity>
)
const ScreenThree = ({navigation: {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Tabs", {screen:"Search"})}>
        <Text>go to Search</Text>
    </TouchableOpacity>
)

const Stack = () => (
    <NativeStack.Navigator screenOptions={{headerBackTitleVisible:false}}>
        <NativeStack.Screen name="One" component={ScreenOne} />
        <NativeStack.Screen name="Two" component={ScreenTwo} options={{animation: "fade"}}/>
        <NativeStack.Screen name="Three" component={ScreenThree} options={{presentation: "modal"}}/>
    </NativeStack.Navigator>
)
export default Stack;