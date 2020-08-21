import React from 'react';
import AddMealsPage from "./AddMealsPage"
import AllMealsPage from "./AllMealsPage"
import HomePage from "./HomePage"
import RecommendationMainPage from "./RecommendationMainPage"
import RecommendationCakePage from "./RecommendationCakePage"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Header from "./Header"
import MealDetailPage from "./MealDetailPage"
import DeletedMealsPage from "./DeletedMealsPage"

class App extends React.Component{

render() {
    return (
        <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/">
                    <Header/>
                    <HomePage/>
                </Route>

                <Route exact path="/addMeal">
                    <Header/>
                        <AddMealsPage/>
                </Route>

                <Route exact path="/allMeal">
                    <Header/>
                        <AllMealsPage/>
                </Route>

                <Route exact path="/recommend/main">
                    <Header/>
                        <RecommendationMainPage/>
                </Route>

                <Route exact path="/recommend/cake">
                    <Header/>
                        <RecommendationCakePage/>
                </Route>

                <Route exact path="/meal">
                    <Header/>
                        <MealDetailPage/>
                </Route>

                <Route exact path="/deletedMeals">
                    <Header/>
                        <DeletedMealsPage/>
                </Route>
            </Switch>
        </div>
        </BrowserRouter>
    )
}
}
export default App;
