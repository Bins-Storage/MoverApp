import React, { useEffect } from 'react';

// custom components
import JobList from '../components/JobList';

export function SelectJobScreen(props) {
    useEffect(
        () => {
            props.navigation.addListener('beforeRemove', (e) => {
                e.preventDefault(); // prevent going back to login screen
            });
        }, [props.navigation]
    );

    return(
        <JobList navigation={props.navigation} />
    );
}