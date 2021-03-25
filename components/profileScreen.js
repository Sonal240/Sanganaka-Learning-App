import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { View, Text } from 'react-native';
import Topbar from './topbar';


export default function Profile(props) {
        return (
                <View>
                    <Topbar options={props} />    
                    <Text>
                        I am profileScreen
                    </Text>
                </View>
            );
}