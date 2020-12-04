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
    root2: {
        display: 'flex',
        borderRadius: 20,
        width: '75%',
        marginLeft: '15%',
        marginTop: 20
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));



export default function Topbar() {
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
                    <ListItem button key={text} selected={text === 'Home' ? true : false}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
    return (
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
                <IconButton edge="end" color="inherit" aria-label="menu" color="Default">
                    <NotificationsIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}