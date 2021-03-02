import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { DateTime } from 'luxon';

import url from './url';

/*
 * Returns button button which alerts the mover an item has been marked as delivered.
 *
 * @param {object} props The props to pass
 * @return The button nested in a view.
 */ 
export default function DeliveryContainer(props) {
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{item}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
    const [boxList, setBoxList] = useState([]);

    const getBoxes = async () => {
        await fetch(url + 'gettenantboxes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tenantEmail: props.email
            })
        })
        .then(res => res.json())
        .then(res => {
            // res is an object with key 'tenantItems' which gets an array of strings
            setBoxList(res['tenantItems'])
        })
    };

    const finishDelivery = async (data) => {
        // get ending time as soon as button is pressed to finish job
        const endTime = DateTime.now().setZone('America/Los_Angeles');

        await fetch(url + 'finishdelivery', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tenantEmail: props.email,
                address: props.streetAddress,
                start: props.startTime,
                end: endTime,
            })
        })
        .catch(err => {
            console.error('Error occurred finishing job', err);
        })

        props.navigation.pop();
    };

    // getBoxes in the beginning
    useEffect(() => {getBoxes()}, []);

    return (
        <View>
            <FlatList
                data={boxList}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                extraData={boxList}
            />
            <Button title='Mark as Delivered' onPress={finishDelivery} />
        </View>
    );
}