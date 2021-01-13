import React from 'react';
import { View} from 'react-native';

// custom components
import JobList from '../components/JobList';

export default class SelectJobScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    };

    // for some reason, navigation prop must be explicitly passed
    // otherwise the navigation in JobListItem is null
    render() {
        return (
            <View>
                <JobList navigation={this.props.navigation}/>
            </View>
        );
    };
}