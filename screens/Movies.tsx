import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {Text, View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import styled from "styled-components/native";
import Swiper from 'react-native-swiper'
import { makeImgPath } from '../utils';
import { BlurView } from 'expo-blur';
const API_KEY = '3fd6a43f3ab1ddfbf4356b3785fbdca5';


const Container = styled.ScrollView`
  background-color: white;
  flex: 1;
`
const Views = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const BgImg = styled.Image`
`
const Poster = styled.Image`
  width: 100px;
  height: 150px;
`

const SCREEN_HEIGHT = Dimensions.get('window').height;

const Movies:React.FC<NativeStackScreenProps<any,"Movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([])

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    // console.log(results)
    setNowPlaying(results);
    setLoading(false);
  };
  useEffect(() => {
    getNowPlaying();
  },[])

  return loading? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  )  : (
    <Container>
      <Swiper 
      horizontal
      loop 
      autoplay
      showsButtons={false}
      autoplayTimeout={3} 
      showsPagination={false} 
      containerStyle={{width: "100%", height: SCREEN_HEIGHT/4}}>
        
        {nowPlaying.map((movie) => 
        <Views key={movie.id}>
          <BgImg style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(movie.backdrop_path) }}/>
          <BlurView intensity={20} style={StyleSheet.absoluteFill}>
            <Poster source={{uri: makeImgPath(movie.poster_path)}}></Poster>
            <Text>{movie.original_title}</Text>
          </BlurView>
        </Views>)}
      </Swiper>
    </Container>
  ) 
}

export default Movies;
