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
                console.log(results, fields)
            }
        )
    }catch(err){
        console.error(err)
    }
}

module.exports = {
    getAllMeals
}

