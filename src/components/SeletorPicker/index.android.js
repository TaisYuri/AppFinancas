import React from 'react';
import {Picker} from '@react-native-picker/picker';

import {PickerView} from './styles';

export default function SeletorPicker({tipo, onChange}){
    return(
        <PickerView>
            <Picker onValueChange={ (valor)=> onChange(valor)} selectedValue={tipo} style={{width: '100%'}}>
                <Picker.Item  label='selecione um tipo' />
                <Picker.Item value='despesa' label='Despesa' />
                <Picker.Item value='receita' label='Receita' />
            </Picker>
        </PickerView>
    );
}