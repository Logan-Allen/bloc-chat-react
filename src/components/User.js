import React, { Component } from 'react';



export class User extends Component {
    constructor(props){
        super(props)
        this.state ={
            username: null
        };
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
            // this.props.setUser(user);
            this.setState({username: user})
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
                <p>Signed in as: {this.props.userHere}</p>
                {!this.state.username ?
                  <button onClick={this.signIn}>Sign in</button>
                  :
                  <button onClick={this.signOut}>Sign out</button>
                }
            </div>
        )
    }
}