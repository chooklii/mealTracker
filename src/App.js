import React from 'react';
import AddMealsPage from "./pages/AddMealsPage"
import AllMealsPage from "./pages/AllMealsPage"
import HomePage from "./pages/HomePage"
import RecommendationMainPage from "./pages/RecommendationMainPage"
import RecommendationCakePage from "./pages/RecommendationCakePage"
import MealDetailPage from "./pages/MealDetailPage"
import DeletedMealsPage from "./pages/DeletedMealsPage"
import RecommendationWorkPage from "./pages/RecommendationWorkPage"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Header from "./Header"

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

                <Route exact path="/recommend/work">
                    <Header/>
                        <RecommendationWorkPage/>
                </Route>
            </Switch>
        </div>
        </BrowserRouter>
    )
}
}
export default App;
