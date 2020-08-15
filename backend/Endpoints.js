const databaseHandler = require("./databaseHandler")

module.exports = function(app){

    // get all meals available
    app.get("/meals", function(req, res){
        databaseHandler.getAllMeals()
        res.sendStatus(200)
    })

    // get all meals that match name
    app.get("/mealsByName", function(req, res){
        res.send(req.query.name)
    })

    // insert new Meal
    app.post("/meal", function(req, res){
        res.send(200)
    })

    // update meal
    app.post("/updateMeal", function(req, res){
        res.send(200)
    })

    // update last time eat
}

