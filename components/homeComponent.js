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

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            classes= {{
                root: classes.root,
            }}
        >
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
            <BottomNavigationAction label="People" classes={{
                root: classes.icon_dis,
                selected: classes.icon
            }} icon={<PersonIcon />} />
        </BottomNavigation>
    );
}
