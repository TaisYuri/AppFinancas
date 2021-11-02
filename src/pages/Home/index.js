import React, {useState,useContext, useEffect} from 'react';
import {AuthContext} from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import {format, isBefore} from 'date-fns';

import {Background, Container, TextNome, TextSaldo, Textcabecalho, Lista, Area} from './styles';

import HistoricoList from '../../components/HistoricoList';
import { Alert, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Header from '../../components/Header';
import DatePicker from '../../components/DatePicker';

export default function Home() {
 
  const[historico, setHistorico] = useState([ ])
  const[saldo, setSaldo] = useState(0);
  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  const[newDate, setNewDate] = useState(new Date());
  const[show,setShow] = useState(false);

  useEffect(() => {
    //retorna o Saldo na tela
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      //retorna o historico de transações
      await firebase.database().ref('historico').child(uid).orderByChild('data')
      .equalTo(format(newDate, 'dd/MM/yyyy'))
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
  },[newDate]);

  function deletar(data){

    //pegando data do item:
    const [diaItem, mesItem, anoItem] = data.data.split('/');
    const dataItem = new Date(`${anoItem}/ ${mesItem}/ ${diaItem}`);
    
    //pegando a data de hoje:
    const formatDiaHoje = format(new Date(),'dd/MM/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
    const dataHoje = new Date(`${anoHoje}/ ${mesHoje}/ ${diaHoje}`);
    
    //fazendo comparação das duas datas para deixar excluir apenas as transações com data de hoje
    if( isBefore(dataItem, dataHoje)){
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

  //Função de busca data com DatePicker
  function abreShowPicker(){
    setShow(true);
  }

  function fechaShowPicker(){
    setShow(false);
  }
  function onChange(date){
    setShow(Platform.OS === 'ios');
    setNewDate(date);
    console.log(date);
  }

  return (
   <Background>
     <Header/>
      <Container>
        <TextNome> { user && user.nome} </TextNome>
        <TextSaldo> R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} </TextSaldo> 
      </Container>
      
      <Area>
        <TouchableOpacity onPress={abreShowPicker}>
          <Icon name='event' color='#fff' size={30}/>
        </TouchableOpacity>
        <Textcabecalho>Ultimas movimentações</Textcabecalho>
      </Area>
     
        <Lista data={historico} renderItem={ ({item}) => (<HistoricoList data={item} deleteItem={deletar }/>) } 
              keyExtractor={ item => item.id} showsVerticalScrollIndicator={false}/>
          
        {show && (
          <DatePicker onClose={fechaShowPicker} date={newDate} onChange={onChange}/>
        )}
     
   </Background>
  );
}