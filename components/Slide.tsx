import React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from 'expo-blur';
import Poster from "./Poster";

const Views = styled.View`
  flex: 1;
`;

const BgImg = styled.Image`
`

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: center;
`
const Title = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: white;
`
const Column = styled.View`
  width: 60%;
  margin-left: 15px;
`
const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  margin-top: 10px;
`
const Votes = styled(Overview)`
// +마음껐 작성
`

interface SlideProps{
    backdrop_path: string; 
    poster_path: string;
    original_title: string; 
    overview: string;
    vote_average: number;

}

const Slide:React.FC<SlideProps> = ({
    backdrop_path, 
    poster_path, 
    original_title, 
    overview, 
    vote_average
}) => {
    return (
    <Views>
        <BgImg style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(backdrop_path) }} />
        <BlurView intensity={20} style={StyleSheet.absoluteFill}>
            <Wrapper>
                <Poster path={poster_path} />
                <Column>
                    <Title>{original_title}</Title>
                    <Overview>{overview.slice(0, 78)}...</Overview>
                    <Votes>🌟 {vote_average} / 10</Votes>
                </Column>
            </Wrapper>
        </BlurView>
    </Views>
    )
}
export default Slide;