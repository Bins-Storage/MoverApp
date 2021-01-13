import React from 'react'
import { FlatList, View } from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';

export default class PickupContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boxList: [],
            name: this.props.name,
            streetAddress: this.props.streetAddress,
        }
    }

    // should be called on setStates AND when a Barcode is Scanned
    componentDidUpdate() {
        /*
         * Update state only in 2 cases:
         * 1. No boxes (so can safely assume we're not adding duplicate box)
         * 2. Last box.data in boxList !== new box.data (otherwise we'd be adding a duplicate and creating an infinte update loop)
         */ 
        if (this.state.boxList.length == 0) {
            let newBoxList = [];
            let newCode = this.props.route.params.data; // extract the new box code from the route.params

            // finish by updating the state with a now nonempty boxlist!
            newBoxList.push(newCode);
            this.setState({ boxList: newBoxList});
        } else {
            let lastAddedCode = this.state.boxList[this.state.boxList.length - 1];
            let newCode = this.props.route.params.data;

            // if scanned codes are different, update state!
            if (newCode !== lastAddedCode) {
                let newBoxList = this.state.boxList;
                newBoxList.push(newCode);

                this.setState({ boxList: newBoxList});
            }
        }
    }

    // should be own component
    // idea: use rn elements listitem
    renderBoxItem = ({ item }) => {
        return (
            <ListItem>
                <Icon name='archive' />
                <ListItem.Content>
                    <ListItem.Title>Box ID: {item}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        );
    }

    // to send mover to the AddBoxScreen
    addBox = () => {
        this.props.navigation.navigate('Add a Box');
    }

    // to send box data to google sheet
    finishJob = () => {
        if (this.state.boxList.length === 0) {
            alert('Warning: No boxes added yet!');
            return;
        }
        
        const flask_url = 'http://192.168.1.79:5000/finishpickup';
        fetch(flask_url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            //.catch(err => {console.log(err)})

        // send the box data to the google sheet
        //UNCOMMENT TO LOOK AT ROUTE.PARAMS DATA console.log(this.props.route.params)
        // NOTE: ALSO GOING TO NEED TO COMMENT OUT RETURN STATEMENT
    }

    keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.boxList}
                    renderItem={this.renderBoxItem}
                    extraData={this.state.boxList}
                    keyExtractor={this.keyExtractor}
                />
                <Button title='Add Box' onPress={this.addBox} />
                <View style={{marginVertical: 10}} />
                <Button title='Finish Job' onPress={this.finishJob} />
            </View>
        );
    }
}