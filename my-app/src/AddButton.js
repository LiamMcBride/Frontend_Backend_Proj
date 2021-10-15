import React from 'react';

var style = {
    backgroundColor: "#EE6C6C",
    padding: 5,
    borderRadius: 10,
    margin: 5,
    width: 100,
}

export class AddButton extends React.Component{
    constructor(props){
        super(props);
        this.nameMaker = this.nameMaker.bind(this);
    }

    /**
     * Returns a user friendly formatted name
     * @returns String
     */
    nameMaker(){
        var name = this.props.value;
        name = "Add " + name[0].toUpperCase() + name.slice(1);
        return name;
    }

    render(){
        return (
            <div id={this.props.value + "Button"} onClick={this.props.onClick} style={style}>
                <p>{this.nameMaker()}</p>
            </div>
        );
    }
}