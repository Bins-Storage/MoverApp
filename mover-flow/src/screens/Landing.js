import React, { Fragment } from 'react';
import { SignIn } from '../components/sign-in';
import { Button } from 'react-native-elements';

export function Landing(props) {
    return (
        <Fragment>
            <SignIn navigation={props.navigation}/>
        </Fragment>
    );
}