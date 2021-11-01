import React, {useState,useContext, useEffect} from 'react';
import {AuthContext} from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import {format, isPast} from 'date-fns';

import {Background, Container, TextNome, TextSaldo, Textcabecalho, Lista} from './styles';

import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import { Alert } from 'react-native';

export default function Home() {
 
  const[historico, setHistorico] = useState([ ])
  const[saldo, setSaldo] = useState(0);
  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  useEffect(() => {
    //retorna o Saldo na tela
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      //retorna o historico de transações
      await firebase.database().ref('historico').child(uid).orderByChild('data')
      .equalTo(format(new Date, 'dd/MM/yy'))
      .limitToLast(10).on('value', (snapshot) => {
        setHistorico([]);
        
        snapshot.forEach( (childItem) => {
          let list = {
            key: childItem.key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor,
            data: childItem.val().data
          };
          setHistorico(oldArray => [...oldArray, list].reverse());
        })
      })
    }
    loadList();
  },[]);

  function deletar(data){
    if( !isPast( new Date(data.data))){
      alert('erro');
      return;
    }
    Alert.alert(
      'Atenção',
      `Deseja realmente deletar esta transação?           Valor: R$ ${data.valor} - data: ${data.data}`,
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Continuar', onPress: () => deletarRegistro(data)}
    ]
    )
  }

  async function deletarRegistro(data){
    await firebase.database().ref('historico').child(uid).child(data.key).remove()
    .then( async ()=> {
      let saldoAtual = saldo;
      data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

      await firebase.database().ref('historico').child(uid).child('saldo').set(saldoAtual);
      
    })
    .catch( (error) => {
      alert(error)
    })
  }


  return (
   <Background>
     <Header/>
      <Container>
        <TextNome> { user && user.nome} </TextNome>
        <TextSaldo> R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} </TextSaldo> 
      </Container>
      
      <Textcabecalho>Ultimas movimentações</Textcabecalho>
    
     
        <Lista data={historico} renderItem={ ({item}) => (<HistoricoList data={item} deleteItem={deletar }/>) } 
              keyExtractor={ item => item.id} showsVerticalScrollIndicator={false}/>
          
        
     
   </Background>
  );
}