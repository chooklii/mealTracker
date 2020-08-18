import React from "react"
import axios from "axios";
import constants from "../config.js"
import {getDateFromTimestamp} from "./helper"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave, faBackspace, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

class MealDetailPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            edit: false,
            id: 0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeTextField = this.handleInputChangeTextField.bind(this);
        this.removeChange = this.removeChange.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
    }

    componentDidMount(){
        const mealId = this.getQueryStringValue("id")
        const previousPage = this.getQueryStringValue("last")
        this.setState({
            id: mealId, 
            lastPage:previousPage})
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
                    december: data.december === 1
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

    updateMenu(){
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
        axios.post("http://"+ constants.IP_ADRESS + "/updateMeal", body).then((response) => {
            this.loadData(id)
        })
    }

    getQueryStringValue (key) {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
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

    navigateBack(){
        const {lastPage} = this.state
        const origin = window.location.origin
        window.location.href = origin + "/"
    }

    render(){
        const {data, name, description, loaded, januar, februar, march, april, mai, juni, july, august, september, october, november, december} = this.state
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
                <div id="amountDetailPage">{data.amount}x zubereitet</div>
                <div id="lastTimeDetailPage">Zuletzt am {getDateFromTimestamp(data["last_time"])}</div>
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

                <button id="eatButtonDetailPage" type="button" onClick={() => this.eatMenu()}>Menü essen</button>


                </div>

                <div id="lastSix">
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="july" type="checkbox" checked={july}/> Juli </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="august" type="checkbox" checked={august}/> August </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="september" type="checkbox" checked={september}/> September </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="october" type="checkbox" checked={october}/> Oktober </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="november" type="checkbox" checked={november}/> November </div>
                <div className="detailPageCheckbox"> <input onChange={this.handleInputChange} name="december" type="checkbox" checked={december}/> Dezember </div>

                <button id="updateButtonDetailPage" type="button" onClick={() => this.updateMenu()}>speichern</button>


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