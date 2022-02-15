import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import * as Font from "expo-font";
import { Text } from 'react-native';
import {Ionicons} from "@expo/vector-icons"
import {Asset} from 'expo-asset';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import Stack from './navigation/Stack';
import Root from './navigation/Root';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './navigation/styled';

const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(font))
const loadImages = (images) => images.map(image => {
  if(typeof image === "string"){
    return Image.prefetch(image)
  }else {
    return Asset.loadAsync(image)
  }
})

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () =>{
    const fonts = loadFonts([Ionicons.font])
    // const images = loadImages([require('./Local'),'url'])
    await Promise.all(...fonts, ...images)
  }; 
  const isDark = useColorScheme() === "dark" ;
  if(!ready){
    return (
    <AppLoading
      startAsync={startLoading}
      onFinish={onFinish}
      onError={console.log} />
    );
  }
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
        {/* <Tabs /> */}
        {/* <Stack /> */}
      </NavigationContainer>
    </ThemeProvider>
  )
}