import React from 'react';
import { ScrollView, Text, Image } from 'react-native';
import styles from './styles/stylesheet.js';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Loading } from './LoadingComponent';



var height= 50;

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 50,
        backgroundSize: 'contain',
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat'
    },
    media2: {
        height: 150,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
});



export default function SliderComp(props) {
    const classes = useStyles();
    var cards = [];
    if(props.list === "null") {
        props.fetchAll();
        for (let i = 0; i < 3; i++) {
            cards.push(
                <Loading />
            )
        }
    }
    else if(props.list === "ques") {
        for (let i = 0; i < 3; i++) {
            cards.push(
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={require('./images/img2.png')}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                How To Use App?
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                An employee within a company who promotes innovative product development and marketing. You can also refer to an
                                </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            View More
                                </Button>
                    </CardActions>
                </Card>
            )
        }
    }
    else {
        props.list.forEach(info => {
            cards.push(
                <Card className={classes.root}>
                    <CardActionArea
                    onClick= {()=> props.setMe(info)}>
                        <CardMedia
                            className={classes.media2}
                            image={info.images[0]}
                            title={info.topic}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {info.topic}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            View More
                        </Button>
                    </CardActions>
                </Card>
            )
        });
    }

    return(
        <div>
            <ScrollView 
                horizontal= "true"
                style= {styles.margT}
                // contentContainerStyle={{ width: `${100 * 2}%` }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
            >
                
                    {cards}
                
            </ScrollView>
        </div>
    )
}