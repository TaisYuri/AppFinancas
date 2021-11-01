import React, {useState, useContext} from 'react';
import {SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';
import firebase from '../../services/firebaseConnection';
import {Container, InputValor,BtnRegistrar, BtnTexto } from './styles';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';

import {AuthContext} from '../../contexts/auth';
import Header from '../../components/Header';
import SeletorPicker from '../../components/SeletorPicker';

export default function Register() {
  
  const[valor, setValor] = useState('');
  const[tipo, setTipo] = useState(null);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation()
  
  function Registrar(){
    Keyboard.dismiss();
    if (isNaN( parseFloat(valor) ) || tipo == null ){
      alert('Preencha todos os campos');
      return;
    }
    Alert.alert(
      'Confirmando dados',
      `Tipo ${tipo} - Valor: RS ${parseFloat( valor) }`,
      [{ text: 'Cancelar', style: 'cancel'}, { text: 'Confirmar', onPress: () => AdicionarRegistro()}]
      
    )
  }

  async function AdicionarRegistro(){
      let uid = user.uid;

      let key = await firebase.database().ref('historico').child(uid).push().key;
      await firebase.database().ref('historico').child(uid).child(key).set({
        tipo: tipo,
        valor: parseFloat(valor),
        data: format(new Date(), 'dd/MM/yy')
      })

      //Atualiza o saldo do usuario
      let usuario = firebase.database().ref('users').child(uid);
      await usuario.once('value').
      then( (snapshot) => {
        let saldo = parseFloat(snapshot.val().saldo);

        tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

        usuario.child('saldo').set(saldo);
      })

      Keyboard.dismiss();
      setValor('');
      navigation.navigate('Home');
  }

  return (
    
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
      <Container>
        <SafeAreaView style={{alignItems: 'center'}}>
          <Header/>
            <InputValor placeholder='Valor desejado' value={valor} onChangeText={ (texto) => setValor(texto)}
              keyboardType='numeric' onSubmitEditing= { () => Keyboard.dismiss() } />
            
            <SeletorPicker tipo={tipo} onChange={ setTipo } />          
        
            <BtnRegistrar onPress={Registrar}>
              <BtnTexto>Registrar</BtnTexto>
            </BtnRegistrar>
          </SafeAreaView>
      </Container>
    </TouchableWithoutFeedback>
    );
}