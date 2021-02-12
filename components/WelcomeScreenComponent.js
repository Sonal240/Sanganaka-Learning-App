import React from 'react';
import Carousel from 'react-material-ui-carousel';
import {View, Image, Text} from 'react-native';
import styles from './styles/stylesheet';
import {Button, Typography,Box} from '@material-ui/core';


 export default function WelcomeScreen(props){
    const slide_image_detail=[
        {
            id:1,
            image: require('./images/img1.png'),
            description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsumLorem ipsum"
        },
        {
            id:2,
           image:require('./images/img2.png'),
           description: "Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
       },
       {
           id:3,
           image:require('./images/img3.png'),
           description: "Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum  Lorem ipsumLorem ipsum  Lorem ipsum Lorem ipsum "
       }
       ];

     return(
        <View style={styles.container}>
            <Carousel animation="slide" autoplay navButtonsAlwaysInvisible> 
            {
                slide_image_detail.map((slide_image_detail)=><Item key={slide_image_detail.id} img_src={slide_image_detail.image} descp={slide_image_detail.description}/>)
            }
            </Carousel>  
            <Box my='3rem'>
                 <Button variant="contained" size="medium" color="primary" style={{width:150}} onClick={() => props.navigation.navigate('login')}>Log In</Button>
                 <Button variant="outlined" size="medium" color="primary"style={{width:150}} onClick={() => props.navigation.navigate('login')}>Sign Up</Button>
            </Box>
            
        </View>
     );
     function Item(props){
        return(
            <View>
                <Image source={props.img_src} style={styles.carouselImg}/>
                <Typography variant="body2" style={{color: '#064789'},{fontSize: 16},{marginRight:'2rem'},{marginLeft:'2.5rem'},{textAlign:'center'},{padding: '1rem'}}>
                    {props.descp}</Typography>
            </View>
        )
    }
    
    
 }
