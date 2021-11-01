import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {Container, Tipo, IconView, TipoText, Valor} from './styles';

export default function HistoricoList( {data}) {
 return (
   <Container>
       <Tipo  >
           <IconView tipo ={data.tipo}>
               <Icon name={data.tipo == 'receita' ? 'arrow-up' : 'arrow-down'} color='#000' size={15}/>
               <TipoText> {data.tipo}</TipoText>
           </IconView>
       </Tipo>
       <Valor> R$ {data.valor}</Valor>
   </Container>
  );
}