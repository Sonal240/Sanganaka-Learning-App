import React from 'react';
// import { Dimensions } from "react-native";
import Homescreen from './homescreen';
import Profilescreen from './profileScreen';
import Qscreen  from './qaScreen';
import Chatscreen from './chatScreen';
import Articles from './articleDisplay';
import Contribute from './contributeComponent';

import {
  createDrawerNavigator
} from '@react-navigation/drawer';

import Tabs from './tabComponent';



const Drawer = createDrawerNavigator();

// const screenWidth = Math.round(Dimensions.get('window').width);


// const useStyles = makeStyles({
//     root: {
//         width: screenWidth,
//         backgroundColor: '#00215B',
//         position: "fixed",
//         bottom: 0
//     },
//     icon_dis: {
//         color: '#4B72B9'
//     },
//     icon: {
//         color: '#fff',
//     },
//     fab: {
//         position: 'absolute',
//         bottom: 20
//     },
//     fab2: {
//         backgroundColor: '#00215B',
//         visibility: 'hidden'
//     }
// });





export default function SimpleBottomNavigation(props) {
    const details = props.route.params;
    // console.log(details);
    const [value, setValue] = React.useState(0);
    const [userDetails, setDetails] = React.useState(details);
    function tryme(props) {
        setScreen(<Articles info= {props} />)
    }
    let [currentScreen, setScreen] = React.useState(<Homescreen setScreenChild={tryme} navigation={props.navigation}/>);
    function displaySceen(val) {
        switch (val) {
            case 0:
                currentScreen = setScreen(<Homescreen setScreenChild={tryme} navigation={props.navigation} />)
                break;
            case 1:
                currentScreen = setScreen(<Qscreen />)
                break;
            case 4:
                currentScreen = setScreen(<Chatscreen />)
                break;
            case 5:
                currentScreen = setScreen(<Profilescreen details={userDetails} set={setDetails} />)
                break;
        }
    }

    props.navigation.addListener('beforeRemove', (e)=> {
        e.preventDefault();
    })
    return (
        <>
            <Drawer.Navigator >
                <Drawer.Screen name="Home" component={Tabs} />
                <Drawer.Screen name="Profile" component={Tabs} />
                <Drawer.Screen name="Q&A" component={Tabs} />
                <Drawer.Screen name="Chat" component={Tabs} />
                <Drawer.Screen name="Contribute" component={Contribute} />
                <Drawer.Screen name="Contact Us" component={Homescreen} />
                <Drawer.Screen name="Logout" component={Homescreen} />
            </Drawer.Navigator>
            

            {/* <BottomNavigation
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
            </BottomNavigation> */}
        </>
    );
}
