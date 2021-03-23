import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles/stylesheet.js';
import {View, Image} from 'react-native';
import { Icon } from 'react-native-elements';

import firebase from 'firebase';

import { Dimensions } from "react-native";


const screenWidth = Math.round(Dimensions.get('window').width);






export default function Topbar({options}) {

    const [state, setState] = React.useState({
        left: false,
    });


    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const signout = ()=> {
        firebase.auth().signOut();
        props.navigation.navigate('welcome');
    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Home', 'Profile', 'Chat', 'Your Questions', 'Contribute', 'Q&As', 'Contact Us', 'Logout'].map((text, index) => (
                        <ListItem button key={text} selected={text === 'Home' ? true : false} onClick= {text === 'Logout'? signout: console.log('hello')}>
                            <ListItemText primary={text} />
                        </ListItem>
                ))}
            </List>
        </div>
    );
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: screenWidth,
                marginTop: 20
            }}
        >
            <Icon 
                name="menu" 
                size= {30}
                onPress= {()=> options.navigation.openDrawer()} />
            <Image
                style={{ width: 50, height: 50, }}
                source={require('./images/logo1.png')}
                />
            <Icon 
                name="notifications"
                size= {30}
                 />
        </View>
    );
}