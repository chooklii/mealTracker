import React from "react"
import axios from "axios";
import constants from "../config.js"
import {getDateFromTimestamp} from "./helper"

class MealDetailPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            id: 0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        const mealId = this.getQueryStringValue("id")
        this.setState({id: mealId})
        this.loadData(mealId)
    }

    loadData(mealId){
        axios.get("http://" + constants.IP_ADRESS + "/details?id=" + mealId).then((response) => {
            try{
                const data = response.data[0]
                this.setState({
                    data: data,
                    loaded: true,
                    januar: data.januar,
                    februar: data.februar,
                    march: data.march,
                    april: data.april,
                    mai: data.mai,
                    juni: data.juni,
                    july: data.july,
                    august: data.august,
                    september: data.september,
                    october: data.october,
                    november: data.november,
                    december: data.december
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
        const {data, januar, februar, march, april, mai, juni, july, august, september, october, november, december} = this.state

        console.log(this.state)
        const body = {
            name:data.name,
            description: data.description,
            id: data.id,
            januar: januar === 1,
            februar: februar === 1,
            march: march === 1,
            april: april === 1,
            mai: mai === 1,
            juni: juni === 1,
            july: july === 1,
            august: august === 1,
            september: september === 1,
            october: october === 1,
            november: november === 1,
            december: december === 1
        }
        const config = {headers: {'content-type': 'multipart/form-data'}};
        axios.post("http://"+ constants.IP_ADRESS + "/updateMeal", body, config).then((response) => {
            this.loadData(data.id)
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

    render(){
        const {data, loaded, januar, februar, march, april, mai, juni, july, august, september, october, november, december} = this.state
        if(loaded && data){
        return(
            <div id="main">
                <div id="headingDetailPage">{data.name}</div>
                <div id="descriptionDetailPage">{data.description}</div>


                <div id="informationDetailPage">
                <div id="amountDetailPage">{data.amount}x zubereitet</div>
                <div id="lastTimeDetailPage">Zuletzt am {getDateFromTimestamp(data["last_time"])}</div>
                </div>


                <div id="monthInformationDetailPage">In folgenden Monaten empfohlen:</div>

                <div id="allMonths">
                <div id="firstSix">
                <div> <input onChange={this.handleInputChange} name="januar" type="checkbox" checked={januar}/> Januar </div>
                <div> <input onChange={this.handleInputChange} name="februar" type="checkbox" checked={februar}/> Febrar </div>
                <div> <input onChange={this.handleInputChange} name="march" type="checkbox" checked={march}/> März </div>
                <div> <input onChange={this.handleInputChange} name="april" type="checkbox" checked={april}/> April </div>
                <div> <input onChange={this.handleInputChange} name="mai" type="checkbox" checked={mai}/> Mai </div>
                <div> <input onChange={this.handleInputChange} name="juni" type="checkbox" checked={juni}/> Juni </div>

                <button onClick={() => this.eatMenu()}>Menü essen</button>


                </div>

                <div id="lastSix">
                <div> <input onChange={this.handleInputChange} name="july" type="checkbox" checked={july}/> Juli </div>
                <div> <input onChange={this.handleInputChange} name="august" type="checkbox" checked={august}/> August </div>
                <div> <input onChange={this.handleInputChange} name="september" type="checkbox" checked={september}/> September </div>
                <div> <input onChange={this.handleInputChange} name="october" type="checkbox" checked={october}/> Oktober </div>
                <div> <input onChange={this.handleInputChange} name="november" type="checkbox" checked={november}/> November </div>
                <div> <input onChange={this.handleInputChange} name="december" type="checkbox" checked={december}/> Dezember </div>

                <button onClick={() => this.updateMenu()}>Änderung speichern</button>


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