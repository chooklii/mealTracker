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
            const name = req.query.name
            const result = await databaseHandler.getMealsByName(name)
            res.json(result)
        } catch(error){
            res.status(500).send({
                message: error
            })
        }
    })

        // get all deleted meals that match name
        app.get("/deletedMealsByName", async function(req, res){
            try{
                const name = req.query.name
                const result = await databaseHandler.getDeletedMealsByName(name)
                res.json(result)
            } catch(error){
                res.status(500).send({
                    message: error
                })
            }
        })

        // get all meals available
        app.get("/deletedMeals", async function(req, res){
            try{
                const result = await databaseHandler.getAllDeletedMeals()
                res.json(result)
            } catch(error){
                res.status(500).send({
                    message: error
                })
            }
        })

    // get one meal by ID
    app.get("/details", async function(req, res){
        try{
            const id = req.query.id
            const result = await databaseHandler.getMealDetails(id)
            res.json(result)
        } catch(error){
            res.status(500).send({
                message: error
            })
        }
    })

    // get recommendations main cource
    app.get("/recommendations/main", async function(req, res){
        try{
            const date = new Date()
            const currentMonth = helper.convertMonthIDtoString(date.getMonth())
            const result = await databaseHandler.getRecommendationMain(currentMonth)
            res.json(result)
        } catch(error){
            res.status(500).send({
                message: error
            })
        }
    })


    // get recommendations cake
    app.get("/recommendations/cake", async function(req, res){
        try{
            const date = new Date()
            const currentMonth = helper.convertMonthIDtoString(date.getMonth())
            const result = await databaseHandler.getRecommendationCake(currentMonth)
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
        const main = body.main
        const cake = body.cake
        const months = helper.setUpMonthJSON(body)
        databaseHandler.createNewMeal(name, description, months, cake, main)
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
            const cake = body.cake
            const main = body.main
            const months = helper.setUpMonthJSON(body)
            databaseHandler.updateMeal(name, description, id, months, cake, main)
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

    // update last time eat
    app.post("/removeEaten", function(req, res){
        try{
            const body = req.body
            const uniqueid = body.uniqueid
            const mealId = body.mealId
            databaseHandler.removeEaten(mealId, uniqueid)
            res.send(200)
        }catch(err){
            res.sendStatus(400)
        }
    })

    // set Meal deleted = true
    app.post("/removeMeal", function(req, res){
            databaseHandler.deleteMeal(req.query.id)
            res.send(200)
        })

    // set Meal deleted = false
    app.post("/recoverMeal", function(req, res){
        databaseHandler.removeDeleted(req.query.id)
        res.send(200)
    })

}

