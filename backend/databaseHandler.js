const config = require("../config")

const mysql = require("mysql")
const connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
})

 function getAllMeals(){
    try{
        console.log(config.HOST)
        connection.connect()
        connection.end()
    }catch(err){
        console.error(err)
    }
}

module.exports = {
    getAllMeals
}

