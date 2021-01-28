import React from 'react';
import { Button, SectionList, StyleSheet, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

export default class JobList extends React.Component {
    constructor(props) {
        super(props);

        // an array of user data containing user objects 
        this.state = {
            userData: [],
        }
    };

    // pull randomly generated data from the RandomUserAPI to populate the JobList
    componentDidMount() {
        this.getRemoteData();
    }

    // helper func: randomly decides if a job is pickup
    isPickup = () => {
        let randValue = Math.floor(Math.random() * 2);
        
        if (randValue > 0)  { return true; }
        else { return false; }
    }

    /*
     * Processes the response array from the RandomUser api to extract only the following info:
     * email, name, phone, pictureUrl, streetAddress. A pickup/delivery job type is randomly generated.
     * 
     * @param {array} userArray An array of RandomUsers to parse
     * @return {array} Filtered RandomUser data
     */ 
    processUserArray = (userArray) => {
        let userData = [];

        for (let i = 0; i < userArray.length; i++) {
            let singleUser = {
                title: this.isPickup() ? 'pickup' : 'delivery',
                email: userArray[i].email,
                name: userArray[i].name.first + ' ' + userArray[i].name.last,
                phone: userArray[i].phone,
                pictureurl: userArray[i].picture.thumbnail,
                streetAddress: userArray[i].location.street.number + ' ' + userArray[i].location.street.name,
            };

            userData.push(singleUser);
        }

        return userData;
    }

    /*
     * Sorts input array by pickup + delivery, inputting all pickup/delivery jobs into respective
     * pickup/delivery list objects. Sets state to be an array of these two objects. This state is what is rendered
     * in the section list.
     * 
     * @param {array} userJobs A filtered array of user objects 
     * Side Effect: Sets userData in this.state
     */ 
    sortPickupsAndDeliveries = (userJobs) => {
        let pickupList = { title: 'Pickups', data: []};
        let deliveryList = { title: 'Deliveries', data: []};
        for (let i = 0; i < userJobs.length; i++) {
            if (userJobs[i].title === 'pickup') {
                pickupList.data.push(userJobs[i]);
            } else {
                deliveryList.data.push(userJobs[i]);
            }
        }

        this.setState({ userData: [pickupList, deliveryList] });
    }

    // extracts 10 random users for the SectionList
    // populates state data with User, Addres, Profile Pic, Email
    getRemoteData = () => {
        const url = 'https://randomuser.me/api/?inc=name,location,email,phone,picture&results=10&nat=us';
        fetch(url, {
            headers:{
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                // store the results array
                let resData = res.results;

                // create specific user JSON objects for each generated user
                let processedUsers = this.processUserArray(resData);
                this.sortPickupsAndDeliveries(processedUsers);  // SETS THE STATE!!
            })
            .catch(error => {
                console.log(error);
            })
    }

    keyExtractor = (item, index) => index.toString();

    /*
     * Creates a pressable list item for the JobList, including the following:
     * Profile Pic; Tenant Name; Tenant Address
     *
     * @param {object with item property} item An item which maps to a user object
     * @return ListItem with user object info nested inside
     */ 
    renderItem = ({ item }) => (
        <ListItem onPress={() => {
            this.props.navigation.navigate('Job Screen', {...item});
        }}>
            <Avatar source={{uri: item.pictureurl}} />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.streetAddress}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );

    renderSectionHeader = ({section}) => {
        return (
            <Text style={styles.sectionHeader}>{section.title}</Text>
        );
    }

    render() {
        return (
            <SectionList
                sections={this.state.userData}
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSectionHeader}
                keyExtractor={this.keyExtractor}
            />
        );
    }
}

const styles = StyleSheet.create({
    sectionHeader: {
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#F55145',
    },
});