import styled from "styled-components/native";

export const Background = styled.View`
flex: 1;
background-color: #363636;

`;
// o KeyboardAvoidingView faz com que ao acionar o teclado, todos os elementos subam um pouco 
export const Container = styled.KeyboardAvoidingView`
flex: 1;
justify-content: center;
align-items: center;

`;

export const Logo = styled.Image`

`;

export const AreaInput = styled.View`
flex-direction: row;
margin-top: 15px;
`;

//acessando atributo do placeholder para trocar a cor
export const Input = styled.TextInput.attrs({

    placeholderTextColor: 'rgba(255,255,255,0.20)'
})`
background-color: rgba(0,0,0,0.50);
width: 90%;
font-size: 17px;
color: #fff;
padding: 15px;
border-radius: 9px;
`;

export const SubmitButton = styled.TouchableOpacity`
background-color: #00b94a;
width: 90%;
border-radius: 9px;
justify-content: center;
align-items: center;
margin-top: 15px;
height: 45px;
`;

export const SubmitText = styled.Text`
font-size: 23px;
`;



export const Link = styled.TouchableOpacity`
margin-top: 15px;
margin-bottom: 10px;


`;

export const LinkText = styled.Text`
font-size: 17px;
color: rgba(255,255,255,0.20);
`;