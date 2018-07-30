import React, { Component } from 'react';
import * as firebase from 'firebase';


export class MessageList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: "",
            content: "",
            sentAt: "",
            roomId: "",
            messages: []
        };
        
        this.messagesRef = this.props.firebase.database().ref("messages");
        this.createMessage = this.createMessage.bind(this);
        this.messageContent = this.messageContent.bind(this);
            
    }

    messageContent(e) {
        e.preventDefault();
        this.setState({
            username: this.props.user,
            content: e.target.value,
            sentAt: firebase.database.ServerValue.TIMESTAMP,
            roomId: this.props.activeRoom
        });
    }

    createMessage(e) {
        e.preventDefault();
        this.messagesRef.push({
            username: this.state.username,
            content: this.state.content,
            sentAt: this.state.sentAt,
            roomId: this.state.roomId
            });

        this.setState({ 
            username: "",
            content: "",
            sentAt: "",
            roomId: ""
        });
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat(message) })
     });
   }
    
    render() {
        const activeRoom = this.props.activeRoom
        
        const messageBox = (
            <form onSubmit = {this.createMessage}>
                <input type= "text" value={this.state.content} placeholder= "Enter message here" onChange={this.messageContent}/>
                <input type="submit" value="Send"/>
            </form>
        )
        const currentMessages = (
            this.state.messages.map((message) => {
                if(message.roomId === activeRoom) {
                    return <li key={message.key}>{message.username}: {message.content}</li>
                }
                return null;
            })
        );

        return (
            <div>
                <div> {messageBox} </div>
                <div> {currentMessages} </div>
            </div>
        );
    }
}