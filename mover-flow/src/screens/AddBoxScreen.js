import React from 'react';
import { Text, View } from 'react-native';

// custom component import
import ScannerHandler from '../components/ScannerHandler';

export default function AddBoxScreen(props) {
    return (
        <ScannerHandler navigation={props.navigation} />
    );
}