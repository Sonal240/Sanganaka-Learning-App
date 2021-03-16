import { StyleSheet, Dimensions} from 'react-native';
//const {windowWidth, windowHeight}= Dimensions.get('screen');
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img_c: {
        height: 200,
        width: 200
    },
    carouselImg:{
        height: 200,
        width: 200,
        marginTop: `40%`,
        marginRight:'auto',
        marginLeft:'auto',

    },
    tinyLogo: {
        width: 40,
        height: 40,
        marginLeft: '35%'
    },
    fontBlue: {
        color: '#044789',
        fontSize: 20,
        marginBottom: 50,
        marginLeft: 10
    },
    fontBlue2: {
        color: '#044789',
        fontSize: 15,
        marginLeft: 12
    },
    margT: {
        marginTop: 20,
    },
    extraBottom: {
        paddingBottom: 1000
    },
    articleImg: {
        height: 260,
        width: 260,
        marginLeft: '15%',
        marginTop: 10
    },
    heading: {
        fontSize: 25,
        color: '#044789',
        marginLeft: 15,
        marginTop: 12
    },
    artText: {
        marginLeft: 15,
        color: '#044789',
        fontSize: 15,
        marginTop: 15
    }

});