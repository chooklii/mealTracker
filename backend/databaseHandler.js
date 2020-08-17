const config = require("../config")

const mysql = require("mysql")
const { parse } = require("@babel/core")
const connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
})

 function getAllMeals(){
    return new Promise(function(resolve, reject){
            connection.query(
                "SELECT * FROM mealtracker.meals", function(err, results, fields){
                if(err) reject(err)
                else{
                    resolve(Object.values(JSON.parse(JSON.stringify(results))))
                }
            })
        })
}

function getMealsByName(name){
    return new Promise(function(resolve, reject){
        connection.query(
            `SELECT * FROM mealtracker.meals WHERE name like '% ${name} %'`, function(err, results, fields){
                if(err) throw err;
                else{
                    resolve(Object.values(JSON.parse(JSON.stringify(results))))
                }
            }
        )
    })
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

function updateMeal(name, description, id, januar){
    try{
        connection.query(
            `UPDATE mealtracker.meals SET name = '${name}', description = '${description}', januar = ${januar} WHERE id = ${id}`
        )
    }catch(err){
        console.log(err)
    }
}

function updateEaten(id){
    try{
        var newAmount = 1
        connection.query(
            `SELECT amount FROM mealtracker.meals WHERE id = '${id}'`, function(err, results, fields){
                if(err) throw err;
                const resultArray = Object.values(JSON.parse(JSON.stringify(results)))
                const amount = resultArray[0].amount
                newAmount = amount != null ? amount +1 : 1
            }
        )
        connection.query(
            `UPDATE mealtracker.meals SET amount = ${newAmount} WHERE id = ${id}`
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

