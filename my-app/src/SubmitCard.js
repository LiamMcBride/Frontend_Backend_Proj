import React from 'react';
import { Dropdown } from './Dropdown';

var style1 = {
    display: "none",
}

var style2 = {
    backgroundColor: "#6CADEE",
    padding: 15,
    borderRadius: 10,
    margin: 5,  
    width: "60%",
    position: "fixed",
    top: "10%",
    left: "20%",
    zIndex: "10",
    height: 728,
    display: "block",

}

var style3 = {
    display: "table-row"
}

var titleStyle = {
    fontWeight: "bold",
    fontSize: "2rem",
    textAlign: "center",
}

var centerStyle ={
    display: "flex",
    justifyContent: "center",
}

var buttonStyle = {
    backgroundColor: "#EE6C6C",
    padding: 5,
    borderRadius: 10,
    margin: 5,
    width: 100,
    
}

var disabledButtonStyle = {
    backgroundColor: "#976968",
    padding: 5,
    borderRadius: 10,
    margin: 5,
    width: 100,
    pointerEvents: "none"
    
}

var errorTextStyle = {
    color: "red",
    fontSize: ".7rem",
    display: "none"
}

/**
 * This component is responsible for creating new countries and states and exporting that information
 * to the server
 */
export class SubmitCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            code: "",
            countryId: null
        };  
    }

    /**
     * This method returns a formatted string, either "country" or "state" for user readability
     * @returns String
     */
    type(){
        return this.props.type.slice(0, -6);
    }

    /**
     * This method further formats the type() string by giving it an upper case first letter
     * so it can be displayed nicely to the user
     * @returns String
     */
    nameMaker(){
        var name = this.type();
        name = name[0].toUpperCase() + name.slice(1);
        return name;
    }

    /**
     * This method will check the input code vs the list of existing country or state codes to make
     * sure that the code given is unique. If it isn't, it will make sure the submit button
     * is locked and will display an error message to the user
     * @param {String} code 
     * @returns boolean
     */
    checkCode(code){        
        for(var i = 0; i < this.props.codes.length; i++){
            if(code.toUpperCase() === this.props.codes[i].toUpperCase()){
                document.getElementById("code-input").style.outline = "3px solid red";
                document.getElementById("error-text").style.display = "block";
                document.getElementById("submit-button").style.backgroundColor = "#976968";
                document.getElementById("submit-button").style.pointerEvents = "none";
                return false;
            }
        }
        document.getElementById("code-input").style.outline = "none";
        document.getElementById("error-text").style.display = "none";
        return true;
    }

    /**
     * This method checks to see if the user has input all the necessary information.
     * If they haven't, it continues to lock the submit button.
     */
    checkIfFormComplete(){
        if(this.type() === "state"){
            if(this.state.countryId !== null){
                document.getElementById("code-input").disabled = false;
            }
            else{
                document.getElementById("code-input").disabled = true;
            }
        }
        else{
            document.getElementById("code-input").disabled = false;
        }
        
        if(this.state.name !== "" && this.state.code !== ""){
            document.getElementById("submit-button").style.backgroundColor = "#EE6C6C";
            document.getElementById("submit-button").style.pointerEvents = "auto";
            console.log("Yall good");
        }
        else
        {
            document.getElementById("submit-button").style.backgroundColor = "#976968";
            document.getElementById("submit-button").style.pointerEvents = "none";
        }
    }

    /**
     * This method detects change in the two text input boxes and will update their value as well as the component
     * state to match the new value. It will also pass the code value to the checkCode() method to verify
     * its usability before setting it to the state.
     * @param {element} e 
     */
    handleChange = (e) => {        
        var value = e.target.value;
        if(e.target.name === "code"){
            value = value.toUpperCase();
        }
        
        if(e.target.name === 'code'){
            if(this.checkCode(e.target.value)){
                this.setState({[e.target.name]: value}, this.checkIfFormComplete);
            }
        }
        else{
            this.setState({[e.target.name]: e.target.value}, this.checkIfFormComplete);
        }
    }

    /**
     * This method gets the new list of states when the country is selected or changed so that the 
     * post goes to the right country and so that the code can be checked against the correct
     * states
     * @param {element} e 
     */
    handleCountryChange = (e) => {
        this.props.setCountry(e.target.value);
        this.setState({countryId: this.props.getCountry(e.target.value).id}, this.checkIfFormComplete);
        this.setState({code: ""});
        document.getElementById("code-input").value = "";
        this.checkCode("");
    }

    /**
     * This method will run when the submit button is pressed. It creates the newPost object to be posted to the 
     * server.
     * @param {element} e 
     */
    handleSubmit = (e) => {     
        e.preventDefault();   
        var newPost = {};

        if(this.type() === "country"){
            console.log("it's a country");
            newPost = {
                name: this.state.name,
                code: this.state.code                
            }
        }
        else{
            console.log("it's a state");
            newPost = {
                name: this.state.name,
                code: this.state.code,
                countryId: this.state.countryId
            }
        }

        this.postNewObject(newPost);
    }

    
    /**
     * This method correctly formats the POST url depending on if the user makes a country or state
     * @returns String
     */
    urlMaker(){
        //var urlString = `https://xc-countries-api.herokuapp.com/api/${this.type() === "country" ? "countries" : "states"}/`;
        //var urlString = `https://mailmcbride.pythonanywhere.com/projs/api/${this.type() === "country" ? "countries" : "states"}/`;
        var urlString = `http://localhost:8000/projs/api/${this.type() === "country" ? "countries" : "states"}/`;
        console.log(urlString);
        return urlString;
    }

    /**
     * This method makes the actual POST to the server using urlMaker() as well as turning
     * the parameter object into a JSON format. It then will exit the SubmitCard window.
     * @param {country} newPost 
     */
    async postNewObject(newPost){
        fetch(this.urlMaker(), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(newPost)
        });

        this.props.onQuit();
    }
    

    render(){
        return (
            <div style={this.props.hidden ? style2 : style1}>
                <div style={titleStyle}>It's time to create a {this.nameMaker()}!</div>
                <div style={centerStyle}>
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tbody>
                                <tr style={this.type() === "country" ? style1 : style3}>
                                    <td className="submitCell">Country: </td>
                                    <td><Dropdown onChange={this.handleCountryChange} options={this.props.options} /></td>
                                </tr>
                                <tr>
                                    <td className="submitCell">
                                        Name: 
                                    </td>
                                    <td className="submitCell">
                                        <input type="text" name="name" onChange={this.handleChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="submitCell">
                                        Code: 
                                    </td>
                                    <td>
                                        <input disabled id="code-input" type="text" name="code" onChange={this.handleChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        
                                    </td>
                                    <td style={errorTextStyle} id="error-text">
                                        Error: Code already taken
                                    </td>
                                </tr>
                                <tr>
                                    <td className="submitCell">
                                        <input id="submit-button" style={disabledButtonStyle} type="submit" value="Submit" onChange={() => {}}/>
                                    </td>
                                    <td className="submitCell">
                                        <input id="quit-button" onClick={this.props.onQuit} style={buttonStyle} value="Quit" onChange={() => {}}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>                    
                </div>
            </div>
        );
    }
}