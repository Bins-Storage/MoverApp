import React from 'react'
import { Button, Text, View } from 'react-native';

export default class DeliveryContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Button title='Mark as Delivered' onPress={() => {alert('marking as delivered...')}}/>
            </View>
        );
    }
}