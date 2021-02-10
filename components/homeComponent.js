import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SmsIcon from '@material-ui/icons/Sms';
import PersonIcon from '@material-ui/icons/Person';
import { Dimensions } from "react-native";
import Fab from '@material-ui/core/Fab';
import Homescreen from './homeScreen';
import Profilescreen from './profileScreen';
import Qscreen  from './qaScreen';
import Chatscreen from './chatScreen';
import Articles from './articleDisplay';

const firebaseConfig = {
    apiKey: "AIzaSyAve9SFpbBZeS40BMYwD4KNzMoht1SyxnI",
    authDomain: "sanganaka-f8486.firebaseapp.com",
    databaseURL: "https://sanganaka-f8486.firebaseio.com",
    projectId: "sanganaka-f8486",
    storageBucket: "sanganaka-f8486.appspot.com",
    messagingSenderId: "891657383270",
    appId: "1:891657383270:web:8c5be227feed61ed8aeca7",
    measurementId: "G-VLFG4CWX78"
};



const screenWidth = Math.round(Dimensions.get('window').width);


const useStyles = makeStyles({
    root: {
        width: screenWidth,
        backgroundColor: '#00215B',
        position: "fixed",
        bottom: 0
    },
    icon_dis: {
        color: '#4B72B9'
    },
    icon: {
        color: '#fff',
    },
    fab: {
        position: 'absolute',
        bottom: 20
    },
    fab2: {
        backgroundColor: '#00215B',
        visibility: 'hidden'
    }
});





export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    function tryme(props) {
        setScreen(<Articles info= {props} />)
    }
    let [currentScreen, setScreen] = React.useState(<Homescreen setScreenChild={tryme} />);
    function displaySceen(val) {
        switch (val) {
            case 0:
                currentScreen = setScreen(<Homescreen setScreenChild={tryme}/>)
                break;
            case 1:
                currentScreen = setScreen(<Qscreen />)
                break;
            case 4:
                currentScreen = setScreen(<Chatscreen />)
                break;
            case 5:
                currentScreen = setScreen(<Profilescreen />)
                break;
        }
    }
    return (
        <>
        {currentScreen}
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                displaySceen(newValue);
            }}
            showLabels
            classes= {{
                root: classes.root,
            }}>

            <BottomNavigationAction label="Home" classes={{
                root: classes.icon_dis,
                selected: classes.icon
            }} icon={<HomeIcon />} />

            <BottomNavigationAction label="Q&A" classes={{
                root: classes.icon_dis,
                selected: classes.icon
            }} icon={<ContactSupportIcon />} />

            <Fab color="primary" className= {classes.fab} aria-label="add">
                <PostAddIcon />
            </Fab>
            <Fab color="primary" className= {classes.fab2} aria-label="add"></Fab>

            <BottomNavigationAction label="Chat" classes={{
                root: classes.icon_dis,
                selected: classes.icon
            }} icon={<SmsIcon />} />
            
            <BottomNavigationAction label="Profile" classes={{
                root: classes.icon_dis,
                selected: classes.icon
            }} icon={<PersonIcon />} />
        </BottomNavigation>
        </>
    );
}
