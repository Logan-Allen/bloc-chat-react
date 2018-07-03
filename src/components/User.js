import React, { Component } from 'react';



export class User extends Component {
    constructor(props) {
        super(props);
        
       
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }
    
    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            this.props.setUser(user);
        });
    }
    
    signIn(e) {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }
    
    signOut() {
        this.props.firebase.auth().signOut();
    }
    
    render(){
        return (
            <div>
                <h3> {this.props.activeUser} is signed in </h3>
                <p> {this.props.activeUser === "Guest" ? "Please Sign in" : "Signed in"} </p>
                <button type="button" className= "sign-in" onClick = {this.signIn}> Sign in </button>
                <button type="button" className= "sign-out" onClick = {this.signOut}> Sign Out </button>
            </div>
        )
    }
}