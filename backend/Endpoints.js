const databaseHandler = require("./databaseHandler")


module.exports = function(app){

    // get all meals available
    app.get("/meals", async function(req, res){
        try{
            const result = await databaseHandler.getAllMeals()
            res.json(result)
        } catch(error){
            res.status(500).send({
                message: error
            })
        }
    })

    // get all meals that match name
    app.get("/mealsByName", function(req, res){
        try{
            const result = await databaseHandler.getMealsByName(req.query.name)
            res.json(result)
        } catch(error){
            res.status(500).send({
                message: error
            })
        }
    })

    // get recommendations

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
            const januar = body.januar
            databaseHandler.updateMeal(name, description, id, januar)
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

