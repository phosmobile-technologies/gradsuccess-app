import React, { Component } from 'react';

export default class ExpertSpecificApplication extends Component {
    constructor(props){
        super(props)
        this.state = {
            id = this.props.location.state.id
        }
    }

    componentDidMount(){
        console.log(this.props.location.state.id);
    }
  render() {
    return (
      <div>  </div>
    );
  }
}
