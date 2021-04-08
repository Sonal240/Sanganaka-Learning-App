import React from 'react';
import { View, Text, ScrollView, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';



export default function ProfileShow(props) {
    const data = props.route.params;
    if(data.dob) {
        if(data.dob.seconds) {
            data.dob = new Date(data.dob.seconds * 1000);
        }
    }

        return (
            <View>
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center'
                    }}
                >    
                        <Image
                            source={!data.photo?require('./images/user.png'):{uri: data.photo}}
                            style={{width: 200, marginTop: 40, height: 200, resizeMode: 'contain'}}
                        />
                    <Text style={{marginTop: 40}}>Phone Number:-</Text>
                    <TextInput 
                        style={{ height: 60, textAlign: 'center',
                        width: '60%', borderColor: 'gray', 
                        borderWidth: 1, fontSize: 20,
                        marginTop: 10,
                        borderColor: 'blue', color: 'blue'}} 
                        variant='outlined' 
                        // onChangeText={text=> setPhno(text)}
                        value= {data.mobile}
                        // autoCompleteType='tel'
                        editable= {false}
                    />
                    <Text>Name:-</Text>
                    <TextInput 
                        style={{ height: 60, textAlign: 'center',
                        width: '60%', borderColor: 'gray', 
                        borderWidth: 1, fontSize: 20,
                        marginTop: 10,
                        borderColor: 'blue', color: 'blue'}} 
                        variant='outlined' 
                        value= {data.name}
                        editable= {false}
                    />
                    <Text>Email:-</Text>
                    <TextInput 
                        style={{ height: 60, textAlign: 'center',
                        width: '60%', borderColor: 'gray', 
                        borderWidth: 1, fontSize: 20,
                        marginTop: 10,
                        borderColor: 'blue', color: 'blue'}} 
                        variant='outlined' 
                        value= {data.email}
                        editable= {false}
                    />
                    <Text>Date Of Birth:-</Text>
                        <TextInput 
                            style={{ 
                                height: 60, textAlign: 'center',
                                width: '60%', borderColor: 'gray', 
                                borderWidth: 1, fontSize: 20,
                                marginTop: 10,
                                borderColor: 'blue', color: 'blue', 
                                backgroundColor: '#99f'
                            }} 
                            variant='outlined' 
                            placeholder='No Date Selected' 
                            value= {data.dob?data.dob.getDate()+'/'+(data.dob.getMonth()+1)+'/'+data.dob.getFullYear():null}
                            editable= {false}
                        />
                    <Text>Gender:-</Text>
                    <Picker 
                        selectedValue={data.gender} 
                        style={{ height: 60, width: '60%' }}
                    >
                        <Picker.item label="Not Selected" value="not selected" />
                        <Picker.item label="Male" value="male" />
                        <Picker.item label='Female' value="female" />
                    </Picker>
                    <Text>Level Of Learning:-</Text>
                    <Picker 
                        selectedValue={data.lol} 
                        style={{ height: 60, width: '60%' }}
                    >
                        <Picker.item label="none" value="0" />
                        <Picker.item label='Beginner' value="1" />
                        <Picker.item label='Intermediate' value="2" />
                        <Picker.item label='Advanced' value="3" />
                    </Picker>
                </ScrollView>
            </View>
            );
    
}