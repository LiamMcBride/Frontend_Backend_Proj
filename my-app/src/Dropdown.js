import React from 'react';
import { DropdownOption } from './DropdownOption';

export class Dropdown extends React.Component{
    render(){
        let options = [];

        options = this.props.options.map((item) => {
            return <DropdownOption key={item.value} item={item} />;
        });

        return (
            <select onChange={this.props.onChange}>
                <option value="" defaultValue hidden>Select your option</option>
                {options}
            </select>
        );
    }
}