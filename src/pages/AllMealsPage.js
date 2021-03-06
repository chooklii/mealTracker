import React from "react"
import axios from "axios";
import constants from "../../config.js"
import {getDateFromTimestamp, getQueryStringValue} from "../helper"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faUtensils } from '@fortawesome/free-solid-svg-icons'
import {Alert} from "antd"

const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);

class AllMealsPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            searchQuery: "",
            showSuccessAlert: false,
            errorMessage: "",
            showErrorAlert: false
        }
        this.eatMenu = this.eatMenu.bind(this);
        this.detailsMenu = this.detailsMenu.bind(this);
        this.handleInputChangeTextField = this.handleInputChangeTextField.bind(this);
        this.getMealsByName = this.getMealsByName.bind(this);
    }

    componentDidMount(){
        this.updateMealData()
    }

    updateMealData(){
        const searchQuery = getQueryStringValue("query")
        if(this.state.searchQuery){
            this.getMealsByName(this.state.searchQuery)
        }
        else if(searchQuery){
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
                    data: data,
                })
    }catch(err){
        this.setState({
            showErrorAlert: true,
            showSuccessAlert: false,
            errorMessage: "Daten konnten nicht geladen werden"
        })
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
            if(response.status === 200){
                this.setState({
                    showSuccessAlert: true,
                    showErrorAlert: false
                })
                this.updateMealData()
            }else{
                this.setState({
                    showErrorAlert: true,
                    showSuccessAlert: false,
                    errorMessage: "Essen konnte nicht geupdated werden"
                })
            }
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
            <div key={keyGenerator()} id="oneMealRecommendationPage">
                <div id="firstLineRecommendationPage">

                    <div id="upperBoxRecommendationPage">

                    <div id="headingAndLogoAllMealsPage">
                        <div id="logoAllMealsPage">{meal.cake ? <FontAwesomeIcon icon={faBirthdayCake} /> : <FontAwesomeIcon icon={faUtensils} />}</div>
                    <div id="nameMealRecommendationPage">  {meal.name}</div>
                    </div>
                    <div >{meal.description}</div>
                    </div>
                    <button id="eatButtonRecommendationPage" type="button" onClick={() => eatMeanu(meal.id)}>essen</button>

                </div>

                    <div id="lastLineRecommendationPage">
                    <div id="amountRecommendationPage">{meal.amount ? meal.amount : 0}x zubereitet </div>
                    <div id="lastTimeRecommendationPage">{meal.time ? getDateFromTimestamp(meal.time): "-"}</div>
                    <button id="detailButtonRecommendationPage" type="button" onClick={() => detailsMeanu(meal.id)}>Details</button>
                </div>
            </div>
        )
    })
    }


    render(){
        const {loaded, data, searchQuery, showErrorAlert, showSuccessAlert, errorMessage} = this.state
        if(loaded){
        return(
            <div id="main">
                {showSuccessAlert &&
                <Alert
                    style={{position: "absolute", width: "95%"}}
                    message="Essen geupdated"
                    type="success"
                    showIcon
                    afterClose={() => this.setState({showSuccessAlert: false})}
                    closable
                />
                }
                {showErrorAlert &&
                <Alert
                    style={{position: "absolute", width: "95%"}}
                    message={errorMessage}
                    type="error"
                    afterClose={() => this.setState({showErrorAlert: false})}
                    showIcon
                    closable
                />
                }
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