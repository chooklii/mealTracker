import React from 'react';
import AddMealsPage from "./AddMealsPage"
import AllMealsPage from "./AllMealsPage"
import HomePage from "./HomePage"
import RecommendationPage from "./RecommendationPage"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Header from "./Header"
import MealDetailPage from "./MealDetailPage"

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

                <Route exact path="/recommend">
                    <Header/>
                        <RecommendationPage/>
                </Route>

                <Route exact path="/meal">
                    <Header/>
                        <MealDetailPage/>
                </Route>
            </Switch>
        </div>
        </BrowserRouter>
    )
}
}
export default App;
