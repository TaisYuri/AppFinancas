import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText} from './styles';


export default function SignIn() {

  const navigation = useNavigation();

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

 
  function exibeLogin(){
    
  }
 return (
   <Background>
       <Container> 
         <Logo source={require('../../assets/Logo.png')}/>

         <AreaInput>
          <Input placeholder='Email' autoCorrect={false} autoCapitalize='none' value={email} onChangeText={ (texto) => setEmail(texto)}/>
         </AreaInput>
         <AreaInput> 
          <Input placeholder='Senha' autoCorrect={false} autoCapitalize='none' value={password} onChangeText={ (texto) => setPassword(password)}/>
         </AreaInput>

         <SubmitButton onPress={ exibeLogin}>
           <SubmitText> Login </SubmitText>
         </SubmitButton>
         
         <Link onPress={() => navigation.navigate('SignUp')}>
           <LinkText> Criar conta </LinkText>
         </Link>

         </Container>
       
   </Background>
  );
}
