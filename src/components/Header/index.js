import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Container, Link} from './styles';


export default function Header() {

    const navigation = useNavigation();

    return (
    <Container>
        <Link onPress={() => navigation.toggleDrawer()}>
                <Icon name='menu' color='#fff' size={30}/>
        </Link>
    </Container>
    );
}