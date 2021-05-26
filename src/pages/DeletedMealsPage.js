import React from "react"
import axios from "axios";
import constants from "../../config.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faUtensils } from '@fortawesome/free-solid-svg-icons'
import {Alert} from "antd"


const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);
class DeletedMealsPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            searchQuery: "",
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

    recoverMenu(mealId){
        axios.post("http://" + constants.IP_ADRESS + "/recoverMeal?id=" + mealId).then((response) => {
            if(response.status === 200){
                this.setState({
                    showSuccessAlert: true,
                    showErrorAlert: false
                })
                this.getMeals()
            }else{
                this.setState({
                    showErrorAlert: true,
                    showSuccessAlert: false
                })
            }
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
            <div key={keyGenerator()} id="oneMealRecommendationPage">
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
        const {loaded, data, searchQuery, showErrorAlert, showSuccessAlert} = this.state
        if(loaded){
        return(
            <div id="main">
                {showSuccessAlert &&
                <Alert
                    style={{position: "absolute", width: "95%"}}
                    message="Essen erfolgreich zurückgeholt"
                    type="success"
                    showIcon
                    afterClose={() => this.setState({showSuccessAlert: false})}
                    closable
                />
                }
                {showErrorAlert &&
                <Alert
                    style={{position: "absolute", width: "95%"}}
                    message="Essen konnte nicht zurückgeholt werden"
                    type="error"
                    afterClose={() => this.setState({showErrorAlert: false})}
                    showIcon
                    closable
                />
                }
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