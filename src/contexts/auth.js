import React, { useState,createContext, useEffect } from "react";
import {ActivityIndicator} from 'react-native';
import firebase from '../services/firebaseConnection';
import AsyncStorage  from '@react-native-async-storage/async-storage';

export const AuthContext = createContext( {} );

export default function AuthProvider( {children} ){

    const[user, setUser] = useState(null);
    const[loading,setLoading] = useState(true);
    const[carregamento, setCarregamento] = useState(false); // usar para criar o loading no botão de cadastrar e de login

    useEffect( () => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    }, []);

    //Logando usuario
    async function signIn(email, password){
        setCarregamento(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then( (snapshot) => {
                let data = {
                    uid : uid,
                    nome: snapshot.val().nome,
                    email: value.user.email,
                };
                setUser(data);
                storageUser(data);
                setCarregamento(false);
            })
        })
        .catch( (error) => {
            alert(error.code);
            setCarregamento(false);
        })
    }


    //cadastrar usuario no Firebase
    async function signUp(email, password, nome){
        setCarregamento(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) =>{
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome
            })
            .then( () => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                };
                setUser(data);
                storageUser(data);
                setCarregamento(false);
            })
        })
        .catch( (error) => {
            alert(error.code);
            setCarregamento(false);
        })

    }

    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    //deslogando usuario
    async function signOut(){
        await firebase.auth().signOut();
        await AsyncStorage.clear()
        .then( () => {
            setUser(null);
        })
    }

    return (
        //Via provider vamos passar um boleano (signed, um objeto e uma função que vai cadastrar o usuario no firebase)
        <AuthContext.Provider value ={ {signed: !!user, user, signUp, signIn, signOut, carregamento} }>
        {children}
        </AuthContext.Provider>
    );
}