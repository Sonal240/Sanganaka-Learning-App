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
import Slider from './carousel';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import AddCircleIcon from '@material-ui/icons/AddCircle';



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

    const projectList = [
        {
            title: "Cutting Edge Project",
            image: "https://source.unsplash.com/collection/347317/",
            description: "Praesent quis congue nisi...",
        },
        {
            title: "Featured Artist 3D",
            image: "https://source.unsplash.com/collection/3573299/",
            description: "Duis at tellus vitae velit aliquet varius...",
        },
    ];


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
                        <Paper component="form" className={classes.root2}>
                            <InputBase
                                className={classes.input}
                                placeholder="Ask a question"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                                <AddCircleIcon />
                            </IconButton>
                        </Paper>
                        <Text style= {styles.fontBlue}>
                            Recent Questions
                        </Text>
                    <Slider list={projectList}></Slider>
                </ScrollView>
            );
}