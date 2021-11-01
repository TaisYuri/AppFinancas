import styled from "styled-components";

export const Container = styled.View`
padding: 10px;
margin-bottom: 15px;
box-shadow: 2px 2px rgba(0,0,0,0.40);
background-color: rgba(0,0,0,0.02);
`;

export const Tipo = styled.View`
flex-direction: row;
justify-content: space-between;
`;
export const IconView = styled.View`
flex-direction: row;
background-color: ${props => props.tipo == 'receita'  ? '#049301' : '#c62c36' };
padding: 3px 9px;
border-radius: 7px;
margin-bottom: 10px;

`;

export const TipoText = styled.Text`
font-size: 16px;
color: #fff;
font-style: italic;
`;

export const Valor = styled.Text`
font-size: 20px;
font-weight: bold;
`;

export const Data = styled.Text`
font-size: 15px;
`;