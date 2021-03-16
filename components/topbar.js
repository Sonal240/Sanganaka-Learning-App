import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles/stylesheet.js';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements'

import firebase from 'firebase';
import Homescreen from './homescreen.js';

import {
  createDrawerNavigator
} from '@react-navigation/drawer';





export default function Topbar(props) {

    const Drawer = createDrawerNavigator();

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
        <>
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={Homescreen} />
                <Drawer.Screen name="Profile" component={Homescreen} />
            </Drawer.Navigator>
            <Icon 
                name="menu" />
            <Image
                style={{ width: 50, height: 50 }}
                source={require('./images/logo1.png')}
                />
            <Icon 
                name="notifications" />
        </>
    );
}