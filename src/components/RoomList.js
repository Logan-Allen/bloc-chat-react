import React, { Component } from 'react';



export class RoomList extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: "",
            rooms: []
        };
        
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.createRoom = this.createRoom.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
 
    componentDidMount() {
        this.roomsRef.on('value', snapshot => {
            const roomSwitch = [];
            snapshot.forEach((room) => {
                roomSwitch.push({
                    key: room.key,
                    name: room.val().name
                })
            });
            this.setState({ rooms: roomSwitch});
        });
    }

    createRoom(e) {
        e.preventDefault();
        if (!this.state.name)
        return;
        
        this.roomsRef.push({ name: this.state.name});
        this.setState({ name: "" });

    }
    
    handleChange(e) {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }
    
    roomSelect(room) {
        this.props.setActiveRoom(room);
    }

    render() {
        const roomList = this.state.rooms.map((room, index) =>
            <li key={room.key} onClick={(e) => {this.roomSelect(room, e)}}> {room.name}</li>
        );
        const roomForm = (
            <form onSubmit={this.createRoom}>
                <h3> Add a Room </h3>
                <input type="text" value={this.state.name} onChange={this.handleChange} />
                <input type="submit" value="Submit"/>
            </form>
        )
        
        return (
            <div>
                <ul>{roomList}</ul>
                <ul>{roomForm}</ul>
            </div>
        )
    }
}
