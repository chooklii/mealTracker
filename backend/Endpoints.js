const databaseHandler = require("./databaseHandler")
const helper = require("./helper")

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
    app.get("/mealsByName", async function(req, res){
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
    app.get("/recommendations", async function(req, res){
        try{
            const date = new Date()
            const currentMonth = helper.convertMonthIDtoString(date.getMonth())
            const result = await databaseHandler.getRecommendation(currentMonth)
            res.json(result)
        } catch(error){
            res.status(500).send({
                message: error
            })
        }
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
            const months = {
                januar: body.januar != undefined ? body.januar : true,
                februar: body.februar != undefined ? body.februar : true,
                march: body.march != undefined ? body.march : true,
                april: body.april != undefined ? body.april : true,
                mai: body.mai != undefined ? body.mai : true,
                juni: body.juni != undefined ? body.juni : true,
                july: body.july != undefined ? body.july : true,
                august: body.august != undefined ? body.august : true,
                september: body.september != undefined ? body.september : true,
                october: body.october != undefined ? body.october : true,
                november: body.november != undefined ? body.november : true,
                december: body.december != undefined ? body.december : true
            }
            databaseHandler.updateMeal(name, description, id, months)
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

