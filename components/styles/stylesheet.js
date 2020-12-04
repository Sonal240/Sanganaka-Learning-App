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
        width: 200,
        marginTop: 256
    },
    appfont: {
        color: '#064789',
        fontSize: 24,
        position: 'fixed',
        bottom: 32
    },
    carouselImg:{
        height: '15rem',
        width: '21rem',
        marginTop: '12rem',
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
        marginTop: 20,
        marginLeft: 10
    }

});