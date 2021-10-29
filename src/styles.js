import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const Container = styled.View`
  flex: 1;
  background-color: #dcdcdc;
  padding-top: ${ 0 + getStatusBarHeight()};
`;

export const Titulo = styled.Text`
font-size: 25px;
font-weight: bold;
text-align: center;
color: ${props => props.cor};
`;

export const Subtitulo = styled.Text`
    font-size: 20px;
    color: #FF0F00;
    text-align: center;
`;

export const Botao = styled.TouchableOpacity`
    width: 85%;
    height: 50px;
    background-color: #000;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    
`;

export const TextBotao = styled.Text`
    font-size: 18px;
    color: #fff;
`;