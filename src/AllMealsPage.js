import React from "react"
import axios from "axios";
import constants from "../config.js"
import {getDateFromTimestamp, getQueryStringValue} from "./helper"



class AllMealsPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            searchQuery: ""
        }
        this.eatMenu = this.eatMenu.bind(this);
        this.detailsMenu = this.detailsMenu.bind(this);
        this.handleInputChangeTextField = this.handleInputChangeTextField.bind(this);
        this.getMealsByName = this.getMealsByName.bind(this);
    }

    componentDidMount(){
        const searchQuery = getQueryStringValue("query")
        if(searchQuery){
            this.setState({searchQuery: searchQuery})
            this.getMealsByName(searchQuery)
        }
        else this.getMeals()
    }

    getMeals(){
        axios.get("http://" + constants.IP_ADRESS + "/meals").then((response) => {
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

    getMealsByName(name){
        axios.get("http://" + constants.IP_ADRESS + "/mealsByName?name="+name).then((response) => {
            try{
                const data = response.data
                this.setState({
                    data: data,
                    loaded: true
                })
    }catch(err){
        console.error(err)

    }})
    }

    handleInputChangeTextField(event){
        const target = event.target
        const value = target.value
        this.setState({searchQuery: value})
        this.getMealsByName(value)
    }

    eatMenu(id){
        axios.post("http://" + constants.IP_ADRESS + "/eatMeal?id=" + id).then((response) => {
            this.getMeals()
        })
    }

    detailsMenu(id){
        if(this.state.searchQuery != ""){
            window.location.href = origin + "/meal?id="+id+"&last=allMeals&searchQuery="+this.state.searchQuery
        }else{
            window.location.href = origin + "/meal?id="+id+"&last=allMeals"
        }
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
        const {loaded, data, searchQuery} = this.state
        if(loaded){
        return(
            <div id="main">
                <div id="headingRecommendationPage">Alle Essen: </div>
                    <div>
                        <input id="searchFieldAllMealPage" onChange={this.handleInputChangeTextField} type="text" name="description" defaultValue={searchQuery} placeholder="Name suchen"/>
                    </div>

                {this.renderMealBox(
                    data,
                    (id) => this.eatMenu(id),
                    (id) => this.detailsMenu(id))}
		    </div>
        )
        }else return null
    }

}

export default AllMealsPage