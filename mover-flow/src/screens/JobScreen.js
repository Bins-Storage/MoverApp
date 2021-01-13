import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

// custom component imports
import PickupContainer from '../components/PickupContainer';
import DeliveryContainer from '../components/DeliveryContainer';

// TODO: Add a start Job Button that conditionally renders the job screen
export default class JobScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
        };
    };

    componentDidMount() {
        this.setState({ userInfo: {...this.props.route.params} })
    }

    checkJobType = () => {
        if (this.state.userInfo.title === 'pickup') {
            return <PickupContainer navigation={this.props.navigation} route={this.props.route} name={this.props.route.params.name} streetAddress={this.props.route.params.streetAddress}/>
        } else {
            return <DeliveryContainer navigation={this.props.navigation}/>
        }
    }

    render() {
        return (
            <View>
                <Text h4>Tenant: {this.state.userInfo.name}</Text>
                <Text h4>Address: {this.state.userInfo.streetAddress}</Text>
                {this.checkJobType()}
            </View>
        );
    };
}