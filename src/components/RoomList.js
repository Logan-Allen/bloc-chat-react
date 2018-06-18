import React, { Component } from 'react'


class RoomList extends Component {
    constructor(props) {
        super(props)
        this.roomsRef = props.database.database().ref('rooms');
        
            this.state = {
            rooms: []
        };
    }
 
    componentDidMount() {
        this.roomsRef.on('child_added', (snapshot) => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat(room)});
        });
    }

    render() {
        const roomList = this.state.rooms.map((room) =>
            <li key = {room.key}>{room.name}</li>
        );
        return(
            <ul>{roomList}</ul>
        );
    }
}

export default RoomList;