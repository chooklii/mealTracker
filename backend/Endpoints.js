const databaseHandler = require("./databaseHandler")


module.exports = function(app){

    // get all meals available
    app.get("/meals", function(req, res){
        databaseHandler.getAllMeals()
        res.sendStatus(200)
    })

    // get all meals that match name
    app.get("/mealsByName", function(req, res){
        console.log(req.query.name)
        databaseHandler.getMealsByName(req.query.name)
        res.send(req.query.name)
    })

    // insert new Meal
    app.post("/meal", function(req, res){
        try{
        const body = req.body
        const name = body.name
        const description = body.description
        databaseHandler.createNewMeal(name, description)
        res.send(200)
        }catch(err){
            res.sendStatus(400)
        }
    })

    // update meal
    app.post("/updateMeal", function(req, res){
        try{
            const body = req.body
            const name = body.name
            const description = body.description
            const id = body.id
            databaseHandler.updateMeal(name, description, id)
            res.send(200)
        }catch(err){
            res.sendStatus(400)
        }
    })


    // update last time eat
    app.post("/eatmeal", function(req, res){
        databaseHandler.updateEaten(req.query.id)
        res.send(200)
    })

}

