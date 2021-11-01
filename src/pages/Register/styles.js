import styled from "styled-components";

export const Container = styled.View`
flex: 1;
background-color: #363636;
`;
export const InputValor = styled.TextInput.attrs({ placeholderTextColor: '#rgba(0,0,0,0.6)'})`
background-color: rgba(255,255,255,0.60);
width: 90%;
border-radius: 7px;
height: 50px;
font-size: 17px;
padding: 10px;
margin-top: 20px;
`;

export const BtnRegistrar = styled.TouchableOpacity`
background-color: #00b94a;
width: 90%;
height: 50px;
border-radius: 7px;
margin-top: 30px;
justify-content: center;
align-items: center;
`;
export const BtnTexto = styled.Text`
font-size: 20px;
color: rgba(0,0,0,0.70);
font-weight: bold;
`;