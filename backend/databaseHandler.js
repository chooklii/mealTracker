const config = require("../config")

const mysql = require("mysql")
const connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
})

 function getAllMeals(){
    try{
        connection.query(
            "SELECT * FROM mealtracker.meals", function(err, results, fields){
                if(err) throw err;
                console.log("Result",results)
            }
        )
    }catch(err){
        console.error(err)
    }
}

function getMealsByName(name){
    try{
        connection.query(
            `SELECT * FROM mealtracker.meals WHERE name like '% ${name} %'`, function(err, results, fields){
                if(err) throw err;
                console.log("Result",results)
            }
        )
    }catch(err){
        console.error(err)
    }

}

function createNewMeal(name, description){
    try{
        connection.query(
            `INSERT INTO mealtracker.meals (name, description) VALUES( '${name}', '${description}')`
        )
    }catch(err){
        console.log(err)
    }

}

function updateMeal(name, description, id){
    try{
        connection.query(
            `UPDATE mealtracker.meals SET name = '${name}', description = '${description}' WHERE id = ${id}`
        )
    }catch(err){
        console.log(err)
    }
}

function updateEaten(id){
    try{
        connection.query(
            `SELECT amount FROM mealtracker.meals WHERE id = '${id}'`, function(err, results, fields){
                if(err) throw err;
                console.log("Result",results)
            }
        )

        connection.query(
            `UPDATE mealtracker.meals SET amount = amount +1 WHERE id = '${id}'`
        )
    }catch(err){
        console.log(err)
    }

}

module.exports = {
    getAllMeals,
    getMealsByName,
    createNewMeal,
    updateMeal,
    updateEaten
}

