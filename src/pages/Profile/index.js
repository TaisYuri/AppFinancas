import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native'
import {AuthContext} from '../../contexts/auth';

import {Container, Titulo, BtnRegistrar, BtnTexto, BtnSair} from './styles';

import Header from '../../components/Header';

export default function Profile() {

  const navigation = useNavigation();
  const {user, signOut} = useContext(AuthContext);

 return (
   <Container>
     <Header/>
       <Titulo> {user && user.nome }</Titulo>
       <BtnRegistrar>
         <BtnTexto onPress={ ()=> navigation.navigate('Registrar')}>Registrar Gastos</BtnTexto>
       </BtnRegistrar>
       <BtnSair onPress={() => signOut()}>
         <BtnTexto>Sair</BtnTexto>
       </BtnSair>
   </Container>
  );
}
