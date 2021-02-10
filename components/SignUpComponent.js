import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
  },
  imgSize: {
    width: 100,
    height: 100
  }
}));

function UploadButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={props.set}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" className={classes.Button} component="span">
        <IconButton fontSize='large' className={classes.IconButton} aria-label="upload picture" component="span">
          <img src={props.photo} className={classes.imgSize} />
        </IconButton>
        </Button>
      </label>
    </div>
  );
}

export default function SignUp(){
  const [levelOfLearning,setLol]= React.useState('');
  const [name,setName]= React.useState('');
  const [email,setEmail]= React.useState('');
  const [photo,setPic]= React.useState(require('./images/user.png'));
  const handleChange=(event) =>{setLol(event.target.value)}
  const picChange = (event) => {
    var src = URL.createObjectURL(event.target.files[0]);
    setPic(src);
  }
  const emailChange=(event) =>{setEmail(event.target.value)}
  const nameChange=(event) =>{setName(event.target.value)}
    return(
      <Box marginTop='2rem'>
        <View style={styles.container}>
            <UploadButtons photo={photo} set={picChange}/>
            <Text style={{marginTop:'1rem'}}>Upload Photo</Text>
            <TextField style={{marginTop:'3rem'}} variant='outlined' label='Name' onChange={nameChange} />
            <TextField style={{marginTop:'2rem'}} variant='outlined' label='Email' onChange={emailChange} />
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
