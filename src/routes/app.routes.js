import React from "react";
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from "../pages/Home";
import Profile from '../pages/Profile';
import Register from '../pages/Register';

const AppDrawer = createDrawerNavigator();

export default function AppRoutes(){
    return (
        <AppDrawer.Navigator drawerStyle= {{backgroundColor: '#363636'}} 
                drawerContentOptions={{ labelStyle:{fontWeight: 'bold', fontSize: 16}, activeTintColor:'#fff', activeBackgroundColor:'#00b94a', inactiveTintColor: '#ddd', inactiveBackgroundColor: '#000' }}>
            <AppDrawer.Screen name='Home' component={Home} /> 
            <AppDrawer.Screen name='Registrar' component={Register} />
            <AppDrawer.Screen name='Profile' component={Profile}/>
        </AppDrawer.Navigator>
    );
}