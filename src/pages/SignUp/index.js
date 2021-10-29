import React, { useState } from "react";
import { AreaInput, Background, Container, Input, SubmitButton, SubmitText } from "../SignIn/styles";

export default function SignUp(){

    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    

    return (
        <Background>
            <Container>
                <AreaInput>
                    <Input placeholder='Nome' autoCorrect={false} autoCapitalize='none' value={nome} onChangeText={ (texto)=> setNome(texto)}/>
                </AreaInput>
                <AreaInput>
                    <Input placeholder='Email' autoCorrect={false} autoCapitalize='none' value={email} onChangeText={ (texto) => setEmail(texto)}/>
                </AreaInput>
                <AreaInput> 
                    <Input placeholder='Senha' autoCorrect={false} autoCapitalize='none' value={password} onChangeText={ (texto) => setPassword(password)}/>
                </AreaInput>

                <SubmitButton onPress={ () => alert(email)}>
                    <SubmitText> Cadastrar </SubmitText>
                </SubmitButton>
            </Container>
        </Background>
    );
}