import React, { useState, useContext } from "react";
import {ActivityIndicator} from 'react-native';
import { AuthContext } from "../../contexts/auth";
import { AreaInput, Background, Container, Input, SubmitButton, SubmitText } from "../SignIn/styles";

export default function SignUp(){

    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    
    //utilizando useContext e extraindo a função do Provider vindo de AuthContext
    const {signUp, carregamento} = useContext(AuthContext);

    function cadastrar(){
        //A função recebe os parametros de email, pass e nome (funcao está em contexts/auth.js)
        signUp(email, password, nome);
    }

    return (
        <Background>
            <Container>
                <AreaInput>
                    <Input placeholder='Nome' value={nome} onChangeText={ (texto)=> setNome(texto)}/>
                </AreaInput>
                <AreaInput>
                    <Input placeholder='Email' autoCorrect={false} autoCapitalize='none' value={email} onChangeText={ (texto) => setEmail(texto)}/>
                </AreaInput>
                <AreaInput> 
                    <Input placeholder='Senha' autoCorrect={false} autoCapitalize='none' value={password} onChangeText={ (texto) => setPassword(texto)} secureTextEntry={true}/>
                </AreaInput>

                <SubmitButton onPress={ cadastrar }>
                    {carregamento ? <ActivityIndicator size={20} color='#fff'/>
                                  : <SubmitText> Cadastrar </SubmitText>}                    
                </SubmitButton>
            </Container>
        </Background>
    );
}