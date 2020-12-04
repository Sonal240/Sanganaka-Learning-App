import React from 'react';
import { ScrollView, Text, Image } from 'react-native';
import { projectList } from './list';
import Topbar from './topbar';
import styles from './styles/stylesheet.js';
import { style } from '@material-ui/system';



export default function Article(props) {
    return (
        <>
            <Topbar />
            <Image
                style={styles.articleImg}
                source={props.info.images[0]}
            />
            <Text
            style={styles.heading}
            >
                {props.info.topic}
            </Text>
            <Text
            style={styles.artText}>
                {props.info.content}
            </Text>
        </>
    );
}