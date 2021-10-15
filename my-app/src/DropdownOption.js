import React from 'react';

export class DropdownOption extends React.Component{
    render(){
        return (
            <option value={this.props.item.value}>{this.props.item.text}</option>
        );
    }
}