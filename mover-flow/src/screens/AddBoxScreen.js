import React from 'react';
import { Text, View } from 'react-native';

// custom component import
import ScannerHandler from '../components/ScannerHandler';

export default class AddBoxScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScannerHandler navigation={this.props.navigation}/>
        );
    }
}