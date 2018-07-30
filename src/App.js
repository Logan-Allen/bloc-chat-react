import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { RoomList } from './components/RoomList.js';
import { MessageList } from './components/MessageList.js';
import { User } from './components/User.js';



var config = {
    apiKey: "AIzaSyBtzU8ccSS0c_R7CPeSsu6Zd_fQXCZD9fk",
    authDomain: "bloc-chat-12d57.firebaseapp.com",
    databaseURL: "https://bloc-chat-12d57.firebaseio.com",
    projectId: "bloc-chat-12d57",
    storageBucket: "bloc-chat-12d57.appspot.com",
    messagingSenderId: "433744272645",

  };
  firebase.initializeApp(config);
  
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
      user: null
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }
  
  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ user: user });
  }

  
  
  
  render() {
    const listMessages = this.state.activeRoom;
    const activeUser = this.state.user === null ? "Guest" : this.state.user.displayName;
    
    return ( 
      <div className="App">
      <h1>Bloc Chat</h1>
      <h2>{this.state.activeRoom.name || "Select or Create a room"}</h2>
      <User firebase={firebase} setUser={this.setUser} userHere={activeUser} />
      <RoomList firebase = {firebase} setActiveRoom={this.setActiveRoom} />
      { listMessages ? 
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user={this.state.user.displayName}/>
        : null }
      </div>
      
    );
  }
}

export default App;
