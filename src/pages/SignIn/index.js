import React, {useContext, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText} from './styles';
import {AuthContext} from '../../contexts/auth';

export default function SignIn() {

  const navigation = useNavigation();

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const{signIn, carregamento} = useContext(AuthContext);
 
  function exibeLogin(){
    signIn(email, password);
  }
 return (
   <Background>
       <Container> 
         <Logo source={require('../../assets/Logo.png')}/>

         <AreaInput>
          <Input placeholder='Email' autoCorrect={false} autoCapitalize='none' value={email} onChangeText={ (texto) => setEmail(texto)}/>
         </AreaInput>
         <AreaInput> 
          <Input placeholder='Senha' autoCorrect={false} autoCapitalize='none' value={password} onChangeText={ (texto) => setPassword(texto)} secureTextEntry={true}/>
         </AreaInput>

         <SubmitButton onPress={ exibeLogin}>
           {carregamento ? <ActivityIndicator size={20} color='#fff' /> 
                         :(<SubmitText> Login </SubmitText>)  }
         </SubmitButton>
         
         <Link onPress={() => navigation.navigate('SignUp')}>
           <LinkText> Criar conta </LinkText>
         </Link>

         </Container>
       
   </Background>
  );
}
