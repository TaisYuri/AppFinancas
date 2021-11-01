import React from "react";
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";

const AuthStack = createStackNavigator();

export default function AuthRoutes(){
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name='SignIn' component={SignIn} options={{ headerShown: false}}/> 
            <AuthStack.Screen name='SignUp' component={SignUp} options={{ 
                headerStyle: { backgroundColor: '#151515', borderBottomWidth: 1, borderBottomColor: '#00b94a'},
                headerTintColor: '#fff', headerBackTitleVisible: false, headerTitle: 'Voltar' }}/>
            <AuthStack.Screen name='Profile' component={Profile} /> 
        </AuthStack.Navigator>
    );
}
