import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {Container, Tipo, IconView, TipoText, Valor, Data} from './styles';

export default function HistoricoList( {data, deleteItem}) {
 return (
    <TouchableWithoutFeedback onLongPress={ ()=> {deleteItem(data)}}>
        <Container>
            <Tipo >
                <IconView tipo ={data.tipo}>
                    <Icon name={data.tipo == 'receita' ? 'arrow-up' : 'arrow-down'} color='#000' size={15}/>
                    <TipoText> {data.tipo}</TipoText>
                    
                </IconView>
                <Data> {data.data}</Data>
            </Tipo>
            <Valor> R$ {data.valor}</Valor>
        </Container>
   </TouchableWithoutFeedback>
  );
}