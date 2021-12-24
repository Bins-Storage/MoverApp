import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { DateTime } from 'luxon';

// custom component imports
import PickupContainer from '../components/PickupContainer';
import DeliveryContainer from '../components/DeliveryContainer';

// TODO: Add a start Job Button that conditionally renders the job screen
export default class JobScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
            jobStarted: false,
            jobStartTime: null,
        };
    };

    /*
     * Receives the tenant's info from the JobList ListItem.
     */
    componentDidMount() {
        this.setState({ userInfo: {...this.props.route.params} })
    }

    /*
     * Returns a component which acts as a container for the associated Pickup/Delivery job
     */
    checkJobType = () => {
        if (this.state.userInfo.jobType === 'PICKUP') {
            return <PickupContainer navigation={this.props.navigation} orderID={this.state.userInfo.id} route={this.props.route} email={this.state.userInfo.email} streetAddress={this.props.route.params.streetAddress} startTime={this.state.jobStartTime}/>
        } else {
            return <DeliveryContainer navigation={this.props.navigation} orderID={this.state.userInfo.id} startTime={this.state.jobStartTime} email={this.state.userInfo.email} streetAddress={this.state.userInfo.address}/>
        }
    }

    startJob = () => {
        this.setState({ jobStarted: true, jobStartTime: DateTime.now().setZone('America/Los_Angeles') });
        alert('The job has started! If this was done by mistake, please contact an administrator.');
    }

    /*
     * Renders a header with the user's name and the user's address, and the appropriate job-type container
     * The container will re-render when scanning is done since ScannerHandler will pass a new route.params to JobScreen.
     * This has the side-effect of changing the container component's props, forcing a re-render
     */

     // idea: use context to make it easier to globally store job info - like job start, end, etc.
    render() {
        return (
            <View>
                <Text h4>Tenant: {this.state.userInfo.email}</Text>
                <Text h4>Address: {this.state.userInfo.address}</Text>
                {this.state.jobStarted
                    ?   this.checkJobType()
                    :   <Button title='Start Job' onPress={this.startJob} />
                }
            </View>
        );
    };
}