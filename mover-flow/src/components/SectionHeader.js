import React from 'react';
import { Text, View } from 'react-native';

export default SectionHeader = (props) => {
    return (
        <View style={{borderBottomWidth: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 25, textAlign: 'center'}}>{props.headerText}</Text>
        </View>
    );
}