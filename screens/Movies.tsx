import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {Text, View, ActivityIndicator, Dimensions, StyleSheet, ScrollView } from 'react-native';
import styled from "styled-components/native";
import Swiper from 'react-native-swiper'
import Slide from '../components/Slide';
import Poster from '../components/Poster';

const API_KEY = '3fd6a43f3ab1ddfbf4356b3785fbdca5';
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Container = styled.ScrollView`
  background-color: white;
  flex: 1;
`
const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const ListTitle = styled.Text`
  /* color: white; */
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
`

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;;
`
const Movie = styled.View`
  margin-right: 10px;
  align-items: center;
`
const Title = styled.Text`
margin-top: 7px;
margin-bottom: 5px;
`
const Votes = styled.Text`
  font-size: 11px;
`
const Movies:React.FC<NativeStackScreenProps<any,"Movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results)
  }
  const getUpComing = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setUpcoming(results)
  }
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    // console.log(results)
    setNowPlaying(results);
  };
  const getData = async() => {
    //wait for all them
    await Promise.all([getNowPlaying(), getUpComing(),getTrending()])
    setLoading(false);
  }
  useEffect(() => {
    getData();
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
      containerStyle={{marginBottom:30, width: "100%", height: SCREEN_HEIGHT/4}}>
        
        {nowPlaying.map((movie) => <Slide key={movie.id} 
            backdrop_path = {movie.backdrop_path}
            poster_path = {movie.poster_path} 
            original_title = {movie.original_title}
            overview = {movie.overview}
            vote_average = {movie.vote_average}
            />
        )}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll contentContainerStyle={{paddingLeft:20}} horizontal showsHorizontalScrollIndicator={false}>
        {trending.map((movie) => (
        <Movie key={movie.id}>
          <Poster path={movie.poster_path} />
          <Title>
            {movie.original_title.slice(0,13)}
            {movie.original_title.length > 13 ? "..." : null}
          </Title>
          <Votes>🌟 {movie.vote_average} / 10</Votes>
        </Movie>))}
      </TrendingScroll>
    </Container>
  ) 
}

export default Movies;
