import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ScrollView, Text, Image } from 'react-native';

import IconButton from '@material-ui/core/IconButton';

import styles from './styles/stylesheet.js';
import Slider from './carousel';
import Link from '@material-ui/core/Link';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Topbar from './topbar';


import { projectList } from './list'



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


export default function Homescreen(props) {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();

                return (
                    <div style={{paddingBottom: 100}}>
                        <Topbar />
                        <ScrollView>
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
                                <Slider list="null"></Slider>
                                <Text style={styles.fontBlue}>
                                    Latest Articles
                                </Text>
                                <Link href="#" onClick={preventDefault}>
                                    <Text style={styles.fontBlue2}>View All</Text>
                                </Link>
                                <Slider list={projectList} setMe={props.setScreenChild}></Slider>
                        </ScrollView>
                    </div>
            );
}