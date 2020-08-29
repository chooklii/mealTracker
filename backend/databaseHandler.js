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
                "SELECT * FROM mealtracker.meals LEFT JOIN mealtracker.eaten ON mealtracker.meals.last_eaten_id = mealtracker.eaten.uniqueId WHERE deleted = false", function(err, results, fields){
                if(err) reject(err)
                else{
                    resolve(Object.values(JSON.parse(JSON.stringify(results))))
                }
            })
        })
}

function getAllDeletedMeals(){
    return new Promise(function(resolve, reject){
            connection.query(
                "SELECT * FROM mealtracker.meals LEFT JOIN mealtracker.eaten ON mealtracker.meals.last_eaten_id = mealtracker.eaten.uniqueId WHERE deleted = true", function(err, results, fields){
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
            `SELECT * FROM mealtracker.meals LEFT JOIN mealtracker.eaten ON mealtracker.meals.last_eaten_id = mealtracker.eaten.uniqueId
            WHERE deleted = false AND LOWER(name) like LOWER('%${name}%')`, function(err, results, fields){
                if(err) reject(err);
                else{
                    resolve(Object.values(JSON.parse(JSON.stringify(results))))
                }
            }
        )
    })
}

function getDeletedMealsByName(name){
    return new Promise(function(resolve, reject){
        connection.query(
            `SELECT * FROM mealtracker.meals LEFT JOIN mealtracker.eaten ON mealtracker.meals.last_eaten_id = mealtracker.eaten.uniqueId
            WHERE deleted = true AND LOWER(name) like LOWER('%${name}%')`, function(err, results, fields){
                if(err) reject(err);
                else{
                    resolve(Object.values(JSON.parse(JSON.stringify(results))))
                }
            }
        )
    })
}

function getMealDetails(id){
    return new Promise(function(resolve, reject){
        connection.query(`SELECT * from mealtracker.meals LEFT JOIN mealtracker.eaten ON mealtracker.meals.last_eaten_id = mealtracker.eaten.uniqueId
        WHERE deleted = false AND mealtracker.meals.id = ${id}`, function(err, results, fields){
            if(err) reject(err);
            else{
                resolve(Object.values(JSON.parse(JSON.stringify(results))))
            }
        })
    })
}


function getRecommendationMain(currentMonth){
    return new Promise(function(resolve, reject){
        connection.query(
            `SELECT * FROM mealtracker.meals LEFT JOIN mealtracker.eaten ON mealtracker.meals.last_eaten_id = mealtracker.eaten.uniqueId
            WHERE ${currentMonth} is true AND main_dish is true AND deleted = false ORDER BY mealtracker.eaten.time`, function(err, results, fields){
                if(err) reject(err);
                else{
                    resolve(Object.values(JSON.parse(JSON.stringify(results))))
                }
            }
        )
    })
}

function getRecommendationCake(currentMonth){
    return new Promise(function(resolve, reject){
        connection.query(
            `SELECT * FROM mealtracker.meals LEFT JOIN mealtracker.eaten ON mealtracker.meals.last_eaten_id = mealtracker.eaten.uniqueId
            WHERE ${currentMonth} is true AND cake is true AND deleted = false ORDER BY mealtracker.eaten.time`, function(err, results, fields){
                if(err) reject(err);
                else{
                    resolve(Object.values(JSON.parse(JSON.stringify(results))))
                }
            }
        )
    })
}

function getRecommendationWork(currentMonth){
    return new Promise(function(resolve, reject){
        connection.query(
            `SELECT * FROM mealtracker.meals LEFT JOIN mealtracker.eaten ON mealtracker.meals.last_eaten_id = mealtracker.eaten.uniqueId
            WHERE ${currentMonth} is true AND workmeal is true AND deleted = false ORDER BY mealtracker.eaten.time`, function(err, results, fields){
                if(err) reject(err);
                else{
                    resolve(Object.values(JSON.parse(JSON.stringify(results))))
                }
            }
        )
    })
}

function createNewMeal(name, description, months, cake, main, workmeal){
    try{
        connection.query(
            `INSERT INTO mealtracker.meals
            (name, description, januar, februar, march, april, mai, juni, july, august, september, october, november, december, cake, main_dish, workmeal)
            VALUES( '${name}', '${description}', ${months.januar}, ${months.februar}, ${months.march}, ${months.april}, ${months.mai},
            ${months.juni}, ${months.july}, ${months.august}, ${months.september}, ${months.october}, ${months.november}, ${months.december}, ${cake}, ${main}, ${workmeal})`
        )
    }catch(err){
        console.log(err)
    }

}

function updateMeal(name, description, id, months, cake, main, workmeal){
    try{
        connection.query(
            `UPDATE mealtracker.meals SET
            name = '${name}',
            description = '${description}',
            januar = ${months.januar},
            februar = ${months.februar},
            march = ${months.march},
            april = ${months.april},
            mai = ${months.mai},
            juni = ${months.juni},
            july = ${months.july},
            august = ${months.august},
            september = ${months.september},
            october = ${months.october},
            november = ${months.november},
            december = ${months.december},
            cake = ${cake},
            main_dish = ${main},
            workmeal = ${workmeal}
            WHERE id = ${id}`
        )
    }catch(err){
        console.log(err)
    }
}

function updateEaten(id){
    try{
        var newAmount = 1
        connection.query(`SELECT amount FROM mealtracker.meals WHERE id = '${id}'`, function(err, results, fields){
            if(err) throw err;
            const resultArray = Object.values(JSON.parse(JSON.stringify(results)))
            const amount = resultArray[0].amount
            newAmount = amount != null ? amount +1 : 1
            connection.query( `INSERT INTO mealtracker.eaten (mealId) VALUES (${id})`)
            connection.query(`SELECT * from mealtracker.eaten WHERE mealId = '${id}' ORDER BY uniqueId DESC LIMIT 1`, function(err, results, fields){
                if(err) throw err;
                const resultGetNewId = Object.values(JSON.parse(JSON.stringify(results)))
                const uniqueId = resultGetNewId[0].uniqueId
                connection.query(
                    `UPDATE mealtracker.meals SET amount = ${newAmount}, last_eaten_id = ${uniqueId} WHERE id = ${id}`
                 )
            })
        })
    }catch(err){
        console.log(err)
    }
}

function removeEaten(mealId, uniqueId){
    try{
        connection.query(
            `SELECT amount FROM mealtracker.meals WHERE id = '${mealId}'`, function(err, results, fields){
                if(err) throw err;
                const resultArray = Object.values(JSON.parse(JSON.stringify(results)))
                const amount = resultArray[0].amount
                newAmount = amount != null ? amount -1 : 0
                connection.query(`DELETE FROM mealtracker.eaten WHERE uniqueId = ${uniqueId}`)
        connection.query(`SELECT * from mealtracker.eaten WHERE mealId = '${id}' ORDER BY uniqueId DESC LIMIT 1`, function(err, results, fields){
                if(err) throw err;
                const resultGetNewId = Object.values(JSON.parse(JSON.stringify(results)))
                const newLastEatenId = resultGetNewId[0].uniqueId
                connection.query(
                    `UPDATE mealtracker.meals SET amount = ${newAmount}, last_eaten_id = ${newLastEatenId} WHERE id = ${mealId}`
                )
            }
        )
    })
    }catch(err){
        console.log(err)
    }
}

function deleteMeal(id){
    try{
        connection.query(
            `UPDATE mealtracker.meals SET deleted = true WHERE id = ${id}`
        )
    }catch(err){
        console.log(err)
    }
}

function removeDeleted(id){
    try{
        connection.query(
            `UPDATE mealtracker.meals SET deleted = false WHERE id = ${id}`
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
    updateEaten,
    getRecommendationMain,
    getRecommendationCake,
    getMealDetails,
    removeEaten,
    deleteMeal,
    removeDeleted,
    getAllDeletedMeals,
    getDeletedMealsByName,
    getRecommendationWork
}

