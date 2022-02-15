import react from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from './Tabs';
import Stack from './Stack';

const Nav = createNativeStackNavigator();

const Root = () => (
    <Nav.Navigator screenOptions={{presentation:"modal", headerShown:false}}>
        {/* 맨 윗라인의 Screen의 header만 표시하고 나머지는 없앤다 */}
        <Nav.Screen name="Tabs" component={Tabs} />
        <Nav.Screen name="Stack" component={Stack} />
    </Nav.Navigator>
)
export default Root;