
function convertMonthIDtoString(id){
    if(id == 0) return "januar"
    if(id == 1) return "februar"
    if(id == 2) return "march"
    if(id == 3) return "april"
    if(id == 4) return "mai"
    if(id == 5) return "juni"
    if(id == 6) return "july"
    if(id == 7) return "august"
    if(id == 8) return "september"
    if(id == 9) return "october"
    if(id ==10) return "november"
    if(id ==11) return "december"
}

function setUpMonthJSON(body){
    console.log(body)
    console.log(bdoy.januar != undefined)
    return {
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
}

module.exports = {
    convertMonthIDtoString,
    setUpMonthJSON
}