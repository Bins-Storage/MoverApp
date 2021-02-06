import React from 'react';
import { SignIn } from '../components/sign-in';

export function Landing(props) {
    return (
        <SignIn navigation={props.navigation}/>
    );
}