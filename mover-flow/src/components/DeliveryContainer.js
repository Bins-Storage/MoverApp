import React from 'react'
import { Button, View } from 'react-native';

/*
 * Returns button button which alerts the mover an item has been marked as delivered.
 *
 * @param {object} props The props to pass
 * @return The button nested in a view.
 */ 
export default function DeliveryContainer(props) {
    return (
        <View>
            <Button title='Mark as Delivered' onPress={() => {alert('marking as delivered...')}} />
        </View>
    );
}