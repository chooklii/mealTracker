import React from "react"
import axios from "axios";
import constants from "../config.js"
import {getDateFromTimestamp, getQueryStringValue} from "./helper"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faUtensils } from '@fortawesome/free-solid-svg-icons'


class DeletedMealsPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            searchQuery: ""
        }
        this.recoverMenu = this.recoverMenu.bind(this);
        this.handleInputChangeTextField = this.handleInputChangeTextField.bind(this);
        this.getMealsByName = this.getMealsByName.bind(this);
    }

    componentDidMount(){
        this.getMeals()
    }

    getMeals(){
        axios.get("http://" + constants.IP_ADRESS + "/getdeletedMeals").then((response) => {
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
        axios.get("http://" + constants.IP_ADRESS + "/deletedMealsByName?name="+name).then((response) => {
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

    recoverMenu(mealid){
        axios.post("http://" + constants.IP_ADRESS + "/recoverMeal?id=" + mealId).then((response) => {
            this.loadData(mealId)
        })
    }

    handleInputChangeTextField(event){
        const target = event.target
        const value = target.value
        this.setState({searchQuery: value})
        this.getMealsByName(value)
    }

    renderMealBox(meals, recoverMenu ){
        return meals.map(function(meal){
        return(
            <div id="oneMealRecommendationPage">
                <div id="firstLineDeletedPage">

                    <div id="upperBoxRecommendationPage">

                    <div id="headingAndLogoAllMealsPage">
                        <div id="logoAllMealsPage">{meal.cake ? <FontAwesomeIcon icon={faBirthdayCake} /> : <FontAwesomeIcon icon={faUtensils} />}</div>
                    <div id="nameMealRecommendationPage">  {meal.name}</div>
                    </div>
                    <div >{meal.description}</div>
                    </div>
                    <button id="recoverButtonDeletedPage" type="button" onClick={() => recoverMenu(meal.id)}>Zurückholen</button>

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
                <div id="headingRecommendationPage">Gelöschte Essen: </div>
                    <div>
                        <input id="searchFieldAllMealPage" onChange={this.handleInputChangeTextField} type="text" name="description" defaultValue={searchQuery} placeholder="Name suchen"/>
                    </div>

                {this.renderMealBox(
                    data,
                    (id) => this.recoverMenu(id))}
		    </div>
        )
        }else return null
    }

}

export default DeletedMealsPage