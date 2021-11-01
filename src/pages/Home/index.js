import React, {useState,useContext, useEffect} from 'react';
import {AuthContext} from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import {format} from 'date-fns';

import {Background, Container, TextNome, TextSaldo, Textcabecalho, Lista} from './styles';

import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';

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
            key: childItem.val().key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor
          };
          setHistorico(oldArray => [...oldArray, list].reverse());
        })
      })
    }
    loadList();
  },[]);

  return (
   <Background>
     <Header/>
      <Container>
        <TextNome> { user && user.nome} </TextNome>
        <TextSaldo> R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} </TextSaldo> 
      </Container>
      
      <Textcabecalho>Ultimas movimentações</Textcabecalho>
    
     
        <Lista data={historico} renderItem={ ({item}) => (<HistoricoList data={item} />) } keyExtractor={ item => item.id} showsVerticalScrollIndicator={false}/>
          
        
     
   </Background>
  );
}