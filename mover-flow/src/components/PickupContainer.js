import React, {Fragment} from 'react'
import { FlatList, SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';
import { DateTime } from 'luxon';
import { Storage, API } from 'aws-amplify';

import { updateOrder } from '../graphql/mutations';

import url from './url';

export default class PickupContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boxList: [],
        }
    }

    // should be called on setStates AND when a Barcode is Scanned
    componentDidUpdate(prevProps, prevState, snapshot) {
        /*
         * Update state only in 2 cases:
         * 1. No boxes (so can safely assume we're not adding duplicate box)
         * 2. Last box.data in boxList !== new box.data (otherwise we'd be adding a duplicate and creating an infinte update loop)
         */ 
        if (this.state.boxList.length == 0 && this.props.route.params.data) {
            let newBoxList = [];
            let newCode = this.props.route.params.data; // extract the new box code from the route.params
            let imageUri = this.props.route.params.imageUri;    // extract the image uri from route.params
            console.log(newCode);
            this.uploadImage(imageUri, newCode)
            // finish by updating the state with a now nonempty boxlist!
            let newBox = {'id': newCode, 'uri': `${this.props.email}_${newCode}`};
            newBoxList.push(newBox);
            this.setState({ boxList: newBoxList});
        } else {
            let newCode = this.props.route.params.data;
            let imageUri = this.props.route.params.imageUri;

            // if scanned code does not exist yet in list, update!
            if (!this.findDuplicates(this.state.boxList, newCode)) {
                let newBoxList = this.state.boxList;
                this.uploadImage(imageUri, newCode);
                newBoxList.push({'id': newCode, 'uri': `${this.props.email}_${newCode}`});

                this.setState({ boxList: newBoxList});
            }
        }
    }

    findDuplicates = (boxList, newCode) => {
        for (let i = 0; i < boxList.length; i++) {
            if (boxList[i]['id'] === newCode) {
                return true;
            }
        }

        return false;
    }

    uploadImage = async (uri, box_id) => {
        const imageName = this.props.email + '_' + String(box_id);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            await Storage.put(imageName, blob, {
                contentType: 'image/jpeg'
            });
        } catch (err) {
            console.log('Error uploading file: ', err)
        }

        return imageName;
    }

    renderBoxItem = ({ item }) => {
        return (
            <ListItem>
                <Icon name='archive' />
                <ListItem.Content>
                    <ListItem.Title>Box ID: {item['id']}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        );
    }

    // to send mover to the AddBoxScreen
    addBox = () => {
        this.props.navigation.navigate('Add a Box');
    }

    finishJob = async () => {

        if (this.state.boxList.length === 0) {
            alert('Warning: No boxes added yet!');
            return;
        }

        const orderDetail = {id: this.props.orderID, status: "COMPLETED"}
        await API.graphql({query: updateOrder, variables: {input: orderDetail}});

        this.props.navigation.pop();
    }


    // to send box data to google sheet
    /*
    finishJob = async () => {

        if (this.state.boxList.length === 0) {
            alert('Warning: No boxes added yet!');
            return;
        }

        const startTime = this.props.startTime;
        const endTime = DateTime.now().setZone('America/Los_Angeles');
        
        await fetch(url + 'finishpickup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...this.state,
                start: startTime,
                end: endTime,
                tenantEmail: this.props.email,
            })
        })
        .catch(err => {console.log(err)})

        this.props.navigation.pop();
    }
    */
    keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <SafeAreaView>
                {this.state.boxList.length === 0 
                    ?   <Text style={styles.NoBoxText}>Boxes will show up here once added.</Text>
                    :   <FlatList
                            data={this.state.boxList}
                            renderItem={this.renderBoxItem}
                            extraData={this.state.boxList}
                            keyExtractor={this.keyExtractor}
                            style={styles.NoBoxText}
                        />
                }
                <View style={{marginVertical: 30}} />           
                <Button title='Add Box' onPress={this.addBox} />
                <View style={{marginVertical: 10}} />                   
                <Button title='Finish Job' onPress={this.finishJob} />   
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    NoBoxText: {
        fontWeight: 'bold',
        marginVertical: 15,
    }
});