import React, { Component } from 'react';



class RoomList extends Component {
    constructor(props) {
        super(props)
        
        this.roomsRef = props.database.database().ref('rooms');

        
            this.state = {
            name: '',
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
    
    createRoom(e) {
        if (!this.state.name)
        return;
        
        this.roomsRef.push({ name: this.state.name});
        this.setState({ name: '' });

    }
    
    handleChange(e) {
        this.setState({ name: e.target.value });
    }
    

    render() {
        return(
          <div>
           
          {
            this.state.rooms.map((room, key) => <ul key = {room.key}>{room.name}</ul>
            )}
            
         
            <form onSubmit={(e) => this.createRoom(e)}> 
                <input type="text" value={this.state.name} onChange={(e) => this.handleChange(e)}/>
                <input type="submit"/>
            </form>
        

          </div>
        );
    }
}

export default RoomList;