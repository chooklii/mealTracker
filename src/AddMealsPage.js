import React from "react"
import axios from "axios";
import constants from "../config.js"
import {getDateFromTimestamp} from "./helper"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave, faBackspace, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

class AddMealsPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            description: "",
            januar: true,
            februar: true,
            march: true,
            april: true,
            mai: true,
            juni: true,
            july: true,
            august: true,
            september: true,
            october: true,
            november: true,
            december: true
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeTextField = this.handleInputChangeTextField.bind(this);
    }

    createMenu(){
        const {id, description, name, januar, februar, march, april, mai, juni, july, august, september, october, november, december} = this.state
        const body = {
            name:name,
            description: description,
            id: id,
            januar: januar,
            februar: februar,
            march: march,
            april: april,
            mai: mai,
            juni: juni,
            july: july,
            august: august,
            september: september,
            october: october,
            november: november,
            december: december
        }
        axios.post("http://"+ constants.IP_ADRESS + "/meal", body).then((response) => {
            location.reload()
        })
    }

    handleInputChange(event){
        const target = event.target
        const value = target.checked ? true : false
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    handleInputChangeTextField(event){
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }


    render(){
        const {name, description, loaded, januar, februar, march, april, mai, juni, july, august, september, october, november, december} = this.state
        return(
            <div id="main">
                <div>
                <div id="headingCreatePage">Neues Menü erstellen:</div>
                    <div>
                        <input id="nameInputField" onChange={this.handleInputChangeTextField} type="text" name="name" placeholder="Name"/>
                    </div>

                    <div>
                        <input id="descriptionInputField" onChange={this.handleInputChangeTextField} type="text" name="description" placeholder="Beschreibung"/>
                    </div>
                </div>

                <div id="monthInformationDetailPage">In folgenden Monaten empfohlen:</div>

                <div id="allMonths">
                <div id="firstSix">
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="januar" type="checkbox" checked={januar}/> Januar </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="februar" type="checkbox" checked={februar}/> Februar </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="march" type="checkbox" checked={march}/> März </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="april" type="checkbox" checked={april}/> April </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="mai" type="checkbox" checked={mai}/> Mai </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="juni" type="checkbox" checked={juni}/> Juni </div>

                </div>

                <div id="lastSix">
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="july" type="checkbox" checked={july}/> Juli </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="august" type="checkbox" checked={august}/> August </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="september" type="checkbox" checked={september}/> September </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="october" type="checkbox" checked={october}/> Oktober </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="november" type="checkbox" checked={november}/> November </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="december" type="checkbox" checked={december}/> Dezember </div>

                <button id="updateButtonDetailPage" type="button" onClick={() => this.createMenu()}>erstellen</button>


                </div>
                </div>


            </div>
        )
        }
}

export default AddMealsPage