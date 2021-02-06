import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Auth } from 'aws-amplify';

function processError(error) {
    // if no error code, exit early
    if (!error.code) {
        alert('Error - Contact an Administator');
        return;
    }

    switch (error.code) {
        case 'UserNotFoundException':
            alert('User does not exist!');
            break;
        case 'NotAuthorizedException':
            alert('Invalid username or password!');
            break;
    }
}

export function SignIn(props) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [signInError, setSignInError] = useState(null);

    // might set signInError to display invalid creds message in UI
    async function signIn() {
        try {
            // make sure text input into text fields
            if (username === null || password === null) return;

            // try signing in
            const user = await Auth.signIn(username, password);
            setSignInError(false);
            props.navigation.navigate('Select Job');
        } catch (error) {
            setSignInError(true);
            processError(error);
            console.error('Error signing in', error);
        }
    };

    return (
        <View>
            <Input 
                placeholder=' Enter username here' 
                label='Username' 
                leftIcon={<Icon name='user' size={24} color='black' />} 
                onChangeText={text => setUsername(text)}
            />
            <Input 
                placeholder=' Enter password here' 
                label='Password' 
                leftIcon={<Icon name='lock' size={24} color='black' />} 
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Button title='Select a job' onPress={signIn}/>
        </View>
    );
}