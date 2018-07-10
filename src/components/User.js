import React, { Component } from 'react';



export class User extends Component {
    constructor(props){
        super(props)
        
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            this.props.setUser(user);
        });
    }
    
    signIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider).then((result) => {
            const user = result.user;
            this.props.setUser(user);
        });
    }
    
    signOut() {
        this.props.firebase.auth().signOut().then(() => {
           this.props.setUser(null); 
        });
    }
    
    render(){
        return (
            <div>
                <h4>Signed in as: {this.props.activeUser ? this.props.activeUser.displayName : "Guest"}</h4>
                  <button onClick = {this.signIn}>Sign in</button>
                  <button onClick = {this.signOut}>Sign out</button>
            </div>
        )
    }
}