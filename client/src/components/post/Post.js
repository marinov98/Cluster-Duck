import React, { Component } from 'react';

class Post extends Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.match.params);
        return (
            <div>
                <h1>This is a great postThis is a great postThis is a great postThis is a great postThis is a great postThis is a great postThis is a great postThis is a great postThis is a great postThis is a great postThis is a great postThis is a great postThis is a great postThis is a great postThis is a great postThis is a great post</h1>
            </div>
        );
    }
}

export default Post;