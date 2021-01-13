import React from 'react';
import { View} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'Enter username here.',
            password: 'Enter password here.',
        };
    };

    render() {
        return (
            <View>
                <Input 
                    placeholder=' Enter username here' 
                    label='Username' 
                    leftIcon={<Icon name='user' size={24} color='black' />} 
                    onChangeText={text => this.setState({username: text})}
                />
                <Input 
                    placeholder=' Enter password here' 
                    label='Password' 
                    leftIcon={<Icon name='lock' size={24} color='black' />} 
                    onChangeText={text => this.setState({username: text})}
                />
                <Button title='Select a job' onPress={() => this.props.navigation.navigate('Select Job')} />
            </View>
        );
    };
}