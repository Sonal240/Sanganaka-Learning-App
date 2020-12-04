import React from 'react';
import { render } from 'react-dom';
import {GiftedChat} from 'react-native-gifted-chat';

export default class ChatBot extends React.Component{
    state={
        messages:[],
    }
    componentDidMount(){
        this.setState({
            messages:[
                {
                    id:1,
                    text:'Hi there! How can I help you today?',
                    createdAt: new Date(),
                    user:{
                        id:2,
                        name:'Suvidha',
                        avatar:'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }

    onSend(messages=[]){
        this.setState(previousState =>({
            messages:
            GiftedChat.append(previousState.messages,messages),
        }))
    }

    render() {

        return(
            <GiftedChat messages={this.state.messages} onSend={messages => this.onSend(messages)} user={{id:1,}} />
        )}
}