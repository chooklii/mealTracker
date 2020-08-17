
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

module.exports = {
    convertMonthIDtoString
}