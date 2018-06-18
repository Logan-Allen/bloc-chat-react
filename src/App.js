import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBtzU8ccSS0c_R7CPeSsu6Zd_fQXCZD9fk",
    authDomain: "bloc-chat-12d57.firebaseapp.com",
    databaseURL: "https://bloc-chat-12d57.firebaseio.com",
    projectId: "bloc-chat-12d57",
    storageBucket: "bloc-chat-12d57.appspot.com",
    messagingSenderId: "433744272645"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div>
        <RoomList database = {firebase}></RoomList>
      </div>
        
    );
  }
}

export default App;
