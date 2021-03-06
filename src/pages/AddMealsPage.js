import React from "react"
import axios from "axios";
import constants from "../../config.js"
import {Alert} from "antd"
import {getQueryStringValue} from "../helper"
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
            december: true,
            main: true,
            cake: false,
            workmeal: true,
            showSuccessAlert: false,
            showErrorAlert: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeTextField = this.handleInputChangeTextField.bind(this);
        this.handleCakeMainChange = this.handleCakeMainChange.bind(this);
    }

    componentDidMount(){
        if(getQueryStringValue("created")){
            this.setState({
                showSuccessAlert: true
            })
        }
    }


    createMenu(){
        const {id, description, name, januar, februar, march, april, mai, juni, july, august, september, october, november, december, cake, main, workmeal} = this.state
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
            december: december,
            cake: cake,
            main: main,
            workmeal: workmeal
        }
        axios.post("http://"+ constants.IP_ADRESS + "/meal", body).then((response) => {
            if(response.status === 200){
                window.location.href = origin + "/addMeal?created=true"
            }else{
                this.setState({
                    showErrorAlert: true,
                    showSuccessAlert: false
                })
            }
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

    handleCakeMainChange(event){
        const target = event.target
        const value = target.checked ? true : false
        const name = target.name
        const otherName = name === "main" ? "cake": "main"
        this.setState({
            [name]: value,
            [otherName]: !value
        })
    }


    render(){
        const {januar, februar, march, april, mai, juni, july, august, september, october, november, december, main, cake, workmeal, showErrorAlert, showSuccessAlert} = this.state
        return(
            <div id="main">
                {showSuccessAlert &&
                <Alert
                    style={{position: "absolute", width: "95%"}}
                    message="Essen wurde erfolgreich erstellt"
                    type="success"
                    showIcon
                    afterClose={() => this.setState({showSuccessAlert: false})}
                    closable
                />
                }
                {showErrorAlert &&
                <Alert
                    style={{position: "absolute", width: "95%"}}
                    message="Essen konnte nicht erstellt werden"
                    type="error"
                    afterClose={() => this.setState({showErrorAlert: false})}
                    showIcon
                    closable
                />
                }
                <div>
                <div id="headingCreatePage">Neues Menü erstellen:</div>
                    <div>
                        <input id="nameInputField" onChange={this.handleInputChangeTextField} type="text" name="name" placeholder="Name"/>
                    </div>

                    <div>
                        <input id="descriptionInputField" onChange={this.handleInputChangeTextField} type="text" name="description" placeholder="Beschreibung"/>
                    </div>
                </div>

                <div id="monthInformationDetailPage">Details:</div>

                <div id="allMonths">
                <div id="firstSix">
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="januar" type="checkbox" checked={januar}/> Januar </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="februar" type="checkbox" checked={februar}/> Februar </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="march" type="checkbox" checked={march}/> März </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="april" type="checkbox" checked={april}/> April </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="mai" type="checkbox" checked={mai}/> Mai </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="juni" type="checkbox" checked={juni}/> Juni </div>

                <div className="detailPageCheckboxMealType"> <input onChange={this.handleCakeMainChange} name="main" type="checkbox" checked={main}/> Hauptgericht </div>

                <div className="detailPageCheckboxMealType"> <input onChange={this.handleInputChange} name="workmeal" type="checkbox" checked={workmeal}/> Arbeitsessen </div>

                </div>

                <div id="lastSix">
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="july" type="checkbox" checked={july}/> Juli </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="august" type="checkbox" checked={august}/> August </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="september" type="checkbox" checked={september}/> September </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="october" type="checkbox" checked={october}/> Oktober </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="november" type="checkbox" checked={november}/> November </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="december" type="checkbox" checked={december}/> Dezember </div>

                <div className="detailPageCheckboxMealType"> <input onChange={this.handleCakeMainChange} name="cake" type="checkbox" checked={cake}/> Kuchen </div>

                <button id="updateButtonDetailPage" type="button" onClick={() => this.createMenu()}>erstellen</button>


                </div>
                </div>


            </div>
        )
        }
}

export default AddMealsPage