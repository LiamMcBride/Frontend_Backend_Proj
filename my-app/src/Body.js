import React from 'react';
import { Dropdown } from './Dropdown';
import { AddButton } from './AddButton';
import { SubmitCard } from './SubmitCard';
import {NavBar} from './NavBar.js';
/**
 * Body holds all the major components of the website, as well as handles retrieving data from the server
 */
export class Body extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            countries: [],
            states: [],
            hidden: false,
            chooseType: "countryButton",
            selectedCountryCode: -1
        }
    }

    /**
     * This will retrieve the list of countries from the server and add them to the state after sorting them
     */
    async componentDidMount(){
        //const response = await fetch("https://xc-countries-api.herokuapp.com/api/countries/");
        //const response = await fetch("https://mailmcbride.pythonanywhere.com/projs/api/countries/");
        const response = await fetch("http://localhost:8000/projs/api/countries/");
        
        const data = await response.json();

        data.sort((a,b) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1;
            }   
            return -1;
        });

        this.setState({countries: data});
    }  
    
    /**
     * This returns a country object using it's code
     * @param {String} code 
     * @returns {country}
     */
    getCountry = (code) => {
        return this.state.countries.filter((item) => item.code === code.toUpperCase())[0];
    }

    /**
     * This refreshes the list of states and is accessed by SubmitCard so it can validate state codes for a selected country
     * @param {String} code 
     */
    setCountry = (code) => {
        this.requestStates(code);
    }

    /**
     * This requests states based off the selected country to populate the drop down
     * @param {element} e 
     */
    handleChange = (e) => {       
        this.requestStates(e.target.value);
    }

    /**
     * This un-hides the SubmitCard element when the user clicks on a country or state button
     * It also will tell the SubmitCard if it's creating a country or state
     * @param {element} e 
     */
    handleClick = (e) => {
        this.setState({
            hidden: true,
            chooseType: e.target.id
        });
    }

    /**
     * This hides the SubmitCard element when the user clicks quit
     */
    handleQuit = () => {
        this.setState({
            hidden: false
        });
    }

    /**
     * This makes a get request from the server based off the country selected and then
     * populates the state with a sorted list of the states in that country
     * @param {String} code 
     */
    async requestStates(code){
        //const response = await fetch(`https://xc-countries-api.herokuapp.com/api/countries/${code}/states/`);
        //const response = await fetch(`https://mailmcbride.pythonanywhere.com/projs/api/countries/${code}/states/`);
        const response = await fetch(`http://localhost:8000/projs/api/countries/${code}/states/`);
        
        const data = await response.json();

        data.sort((a,b) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1;
            }
            return -1;
        });

        this.setState({states: data});
    }

    render(){
        var countryOptions = this.state.countries.map((item) => {
            return {text: item.name, value: item.code};
        });

        var stateOptions = this.state.states.map((item) => {
            return {text: item.name, value: item.code};
        });

        var countryCodes = [];
        this.state.countries.forEach(country => countryCodes.push(country.code));

        var stateCodes = [];
        this.state.states.forEach(state => stateCodes.push(state.code));

        return (
            <div>
                <div className={this.state.hidden ? "divCardBlurred" : "divCard"}>
                    <NavBar />
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div id="div1"><p>Choose your Country:</p></div>
                                </td>
                                <td>
                                    <div id="div2"><Dropdown onChange={this.handleChange} options={countryOptions}/></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="div1"><p>Choose your State:</p></div>
                                </td>
                                <td>
                                    <div id="div2"><Dropdown options={stateOptions}/></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>                    
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <AddButton value="country" onClick={this.handleClick}/>
                                </td>
                                <td>
                                    <AddButton value="state" onClick={this.handleClick}/>
                                </td>
                            </tr>  
                        </tbody>              
                    </table>                    
                </div>
                <SubmitCard id="submitcard" setCountry={this.setCountry} getCountry={this.getCountry} options={countryOptions} hidden={this.state.hidden} codes={this.state.chooseType === "countryButton" ? countryCodes : stateCodes} type={this.state.chooseType} class="submitCard" onQuit={this.handleQuit}  />
            </div>

        );
    }
}