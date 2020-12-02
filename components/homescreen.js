import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ScrollView, Text, Image } from 'react-native';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import styles from './styles/stylesheet.js';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: '#000'
    },
    notiButton: {
        marginRight: theme.spacing(1),
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));


export default function Homescreen() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });


    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


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
                {['Home', 'Profile', 'Chat', 'Your Questions', 'Contribute', 'Q&As', 'Contact Us'].map((text, index) => (
                    <ListItem button key={text} selected= {text==='Home'? true: false}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );


                return (
                <ScrollView>
                        <div className={classes.root}>
                            <AppBar position="static" color="transparent">
                                <Toolbar>
                                    <IconButton edge="start" className={classes.menuButton}
                                     color="default" aria-label="menu"
                                        onClick={toggleDrawer('left', true)}
                                     >
                                        <MenuIcon />
                                    </IconButton>
                                    <Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
                                        {list('left')}
                                    </Drawer>
                                    <Typography variant="h6" className={classes.title}>
                                        <Image
                                            style={styles.tinyLogo}
                                            source={require('./images/logo1.png')}
                                        />
                                    </Typography>
                                    <IconButton edge="end"  color="inherit" aria-label="menu" color="Default">
                                        <NotificationsIcon />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                        </div>
                    <Text>
                        I am homescreen
                    </Text>
                </ScrollView>
            );
}