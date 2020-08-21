import React from "react"
import axios from "axios";
import constants from "../config.js"
import {getDateFromTimestamp} from "./helper"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave, faBackspace, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import {getQueryStringValue} from "./helper"

class MealDetailPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            edit: false,
            id: 0,
            searchQuery: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeTextField = this.handleInputChangeTextField.bind(this);
        this.removeChange = this.removeChange.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
        this.handleCakeMainChange = this.handleCakeMainChange.bind(this);
    }

    componentDidMount(){
        const mealId = getQueryStringValue("id")
        const previousPage = getQueryStringValue("last")
        const searchQuery = getQueryStringValue("searchQuery")
        console.log(searchQuery)
        this.setState({
            id: mealId,
            lastPage:previousPage,
            searchQuery: searchQuery
        })
        this.loadData(mealId)
    }


    loadData(mealId){
        axios.get("http://" + constants.IP_ADRESS + "/details?id=" + mealId).then((response) => {
            try{
                const data = response.data[0]
                this.setState({
                    data: data,
                    loaded: true,
                    name: data.name,
                    description: data.description,
                    januar: data.januar === 1,
                    februar: data.februar === 1,
                    march: data.march === 1,
                    april: data.april === 1,
                    mai: data.mai === 1,
                    juni: data.juni === 1,
                    july: data.july === 1,
                    august: data.august === 1,
                    september: data.september === 1,
                    october: data.october === 1,
                    november: data.november === 1,
                    december: data.december === 1,
                    cake: data.cake,
                    main: data.main_dish,
                    uniqueId: data.uniqueId
                })
            }
            catch(err){
                console.error(err)
                this.setState({
                    loaded: true
                })
            }
        })
    }

    eatMenu(){
        const mealId = this.state.id
        axios.post("http://" + constants.IP_ADRESS + "/eatMeal?id=" + mealId).then((response) => {
            this.loadData(mealId)
        })
    }

    removeEaten(){
        const mealId = this.state.id
        const uniqueId = this.state.uniqueId
        const body = {
            mealId: mealId,
            uniqueId: uniqueId
        }
        axios.post("http://"+ constants.IP_ADRESS + "/removeEaten", body).then((response) => {
            this.loadData(mealId)
        })
    }

    removeMeal(){
        const mealId = this.state.id
        axios.post("http://" + constants.IP_ADRESS + "/removeMeal?id=" + mealId).then((response) => {
            this.navigateBack()
        })
    }

    updateMenu(){
        const {id, description, name, januar, februar, march, april, mai, juni, july, august, september, october, november, december, data, main} = this.state
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
        axios.post("http://"+ constants.IP_ADRESS + "/updateMeal", body).then((response) => {
            this.loadData(id)
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

    removeChange(){
        this.setState({
            name: this.state.data.name,
            description: this.state.data.description,
            edit: false
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

    navigateBack(){
        const {lastPage,searchQuery} = this.state
        const origin = window.location.origin
        if(lastPage === "recommendationMain"){
            window.location.href = origin + "/recommend/main"
        }else if(lastPage === "recommendationCake"){
            window.location.href = origin + "/recommend/cake"
        }else if(lastPage === "allMeals"){
            if(searchQuery){
                window.location.href = origin + "/allMeal?query="+searchQuery
            }
            else{
                window.location.href = origin + "/allMeal"
            }
        }
        else window.location.href = origin + "/"
    }

    render(){
        const {data, name, description, loaded, januar, februar, march, april, mai, juni, july, august, september, october, november, december, main, cake} = this.state
        if(loaded && data){
        return(
            <div id="main">
                {!this.state.edit &&
                <div>
                    <div id="headingBoxDetailPage">
                    <button id="navigateBackButton" type="button" onClick={this.navigateBack}><FontAwesomeIcon icon={faLongArrowAltLeft} /></button>
                        <button id="editButton" type="button" onClick={() => this.setState({edit: true})}><FontAwesomeIcon icon={faEdit} /></button>
                    </div>

                    <div id="headingDetailPage">{name}</div>
                    <div id="descriptionDetailPage">{description}</div>
                </div>
                }

                {this.state.edit &&
                <div>
                    <div>
                        <input id="nameInputField" onChange={this.handleInputChangeTextField} type="text" name="name" defaultValue={name}/>
                        <button onClick={this.removeChange} id="removeChangeButton" type="button"><FontAwesomeIcon icon={faBackspace} /></button>

                    </div>

                    <div>
                        <input id="descriptionInputField" onChange={this.handleInputChangeTextField} type="text" name="description" defaultValue={description}/>
                        <button id="saveChangeButton" type="button" onClick={() => this.setState({edit: false})}><FontAwesomeIcon icon={faSave} /></button>
                    </div>
                </div>
                }

                <div id="informationDetailPage">
                <div id="amountDetailPage">{data.amount ? data.amount : 0}x zubereitet</div>
                <div id="lastTimeDetailPage">{data.amount ? "Zuletzt am " + getDateFromTimestamp(data["time"]) : "nie"}</div>
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

                <div className="detailPageCheckboxMealType"> <input onChange={this.handleCakeMainChange} name="main" type="checkbox" checked={main}/> Hauptgericht </div>

                <button id="eatButtonDetailPage" type="button" onClick={() => this.eatMenu()}>Menü essen</button>
                {data.amount != 0 &&
                <button id="removeEatenButtonDetailPage" type="button" onClick={() => this.removeEaten()}>Essen entf.</button>
                }

                </div>

                <div id="lastSix">
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="july" type="checkbox" checked={july}/> Juli </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="august" type="checkbox" checked={august}/> August </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="september" type="checkbox" checked={september}/> September </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="october" type="checkbox" checked={october}/> Oktober </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="november" type="checkbox" checked={november}/> November </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="december" type="checkbox" checked={december}/> Dezember </div>

                <div className="detailPageCheckboxMealType"> <input onChange={this.handleCakeMainChange} name="cake" type="checkbox" checked={cake}/> Kuchen </div>

                <button id="updateButtonDetailPage" type="button" onClick={() => this.updateMenu()}>speichern</button>

                <button id="removeMealButtonDetailPage" type="button" onClick={() => this.removeMeal()}>Löschen</button>
                

                </div>
                </div>


            </div>
        )
        }else if(loaded && !data){
            return(
                <div id="main">
                    Unbekanntes Menü
                </div>
            )
        }else return null
    }
}

export default MealDetailPage