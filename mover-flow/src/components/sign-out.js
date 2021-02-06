import React from 'react';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { CommonActions } from '@react-navigation/native';

export function SignOutButton(props) {
    async function SignOut() {
        try {
            //await Auth.signOut().then(() => {props.navigation.popToTop();})
        } catch(error) {
            console.error(error);
        }
    }

    function debug() {
        console.log('props: ', props);
    }

    return (
        <Button title='Sign Out' onPress={SignOut} />
    );
}