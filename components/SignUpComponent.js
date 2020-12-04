import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {Box, TextField, FormControl, InputLabel,Select,MenuItem} from '@material-ui/core';
import {View, Text} from 'react-native';
import styles from './styles/stylesheet';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      mx:'auto',
    },
  },
  input: {
    display: 'none',
  },
  IconButton:{
      color: '#ffffff',
  },
  Button:{
      opacity: 0.7,
      width: '6rem',
      height: '6rem'
  },
  FormControl:{
    marginTop: '2rem'
  }
}));

function UploadButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" className={classes.Button} component="span">
        <IconButton fontSize='large' className={classes.IconButton} aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
        </Button>
      </label>
    </div>
  );
}

export default function SignUp(){
  const [levelOfLearning,setLol]= React.useState('');
const handleChange=(event) =>{setLol(event.target.value)}
    return(
      <Box marginTop='12rem'>
        <View style={styles.container}>
            <UploadButtons/>
            <Text style={{marginTop:'1rem'}}>Upload Photo</Text>
            <TextField style={{marginTop:'3rem'}} variant='outlined' label='Name'/>
            <TextField style={{marginTop:'2rem'}} variant='outlined' label='Email'/>
            <Box mt='2rem'>
              <FormControl style={{width: '14rem'}} variant='outlined'>
                <InputLabel id='level'>Level of Learning</InputLabel>
                  <Select labelId='level' id='level-id' value={levelOfLearning} onChange={handleChange}>
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={1}>Beginner</MenuItem>
                    <MenuItem value={2}>Intermediate</MenuItem>
                    <MenuItem value={3}>Advanced</MenuItem>
                  </Select>
              </FormControl>
            </Box>
            <Box mt='3rem'>
                <Button variant='contained' color='primary' style={{width:150}}>Submit</Button>
            </Box>
        </View>  
      </Box>
    );
}
