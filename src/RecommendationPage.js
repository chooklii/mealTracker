import React from "react"
import axios from "axios";
import constants from "../config.js"
import {getDateFromTimestamp} from "./helper"

class RecommendationPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false
        }
        this.eatMenu = this.eatMenu.bind(this);
        this.detailsMenu = this.detailsMenu.bind(this);
    }

    componentDidMount(){
        this.getRecommendations()
    }

    getRecommendations(){
        axios.get("http://" + constants.IP_ADRESS + "/recommendations").then((response) => {
            try{
                const data = response.data
                this.setState({
                    loaded: true,
                    data: data
                })
    }catch(err){
        console.error(err)

    }})
    }

    eatMenu(id){
        axios.post("http://" + constants.IP_ADRESS + "/eatMeal?id=" + id).then((response) => {
            this.getRecommendations()
        })
    }

    detailsMenu(id){
        window.location.href = origin + "/meal?id="+id+"&last=recommendation"
    }


    renderMealBox(meals, eatMeanu, detailsMeanu){
        return meals.map(function(meal){
        return(
            <div id="oneMealRecommendationPage">
                <div id="firstLineRecommendationPage">

                    <div id="upperBoxRecommendationPage">
                    <div id="nameMealRecommendationPage">{meal.name}</div>
                    <div >{meal.description}</div>
                    </div>
                    <button id="eatButtonRecommendationPage" type="button" onClick={() => eatMeanu(meal.id)}>essen</button>

                </div>

                    <div id="lastLineRecommendationPage">
                    <div id="amountRecommendationPage">{meal.amount ? meal.amount : 0}x zubereitet </div>
                    <div id="lastTimeRecommendationPage">{meal.amount ? getDateFromTimestamp(meal.last_time): "-"}</div>
                    <button id="detailButtonRecommendationPage" type="button" onClick={() => detailsMeanu(meal.id)}>Details</button>
                </div>
            </div>
        )
    })
    }


    render(){
        const {loaded, data} = this.state
        if(loaded){
        return(
            <div id="main">
                <div id="headingRecommendationPage">Empfehlungen: </div>
                {this.renderMealBox(
                    data,
                    (id) => this.eatMenu(id),
                    (id) => this.detailsMenu(id))}
		    </div>
        )
        }else return null
    }

}

export default RecommendationPage