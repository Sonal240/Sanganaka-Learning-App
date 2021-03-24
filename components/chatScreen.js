import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { View, Text } from 'react-native';


export default class Homescreen extends React.Component {
    render() {
        return (
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text>
                        I am chatScreen
                    </Text>
                </View>
            );
        }
}