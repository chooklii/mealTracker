import React from "react"

export function getDateFromTimestamp(timestamp){
    const year = timestamp.substring(0,4)
    const month = timestamp.substring(5,7)
    const day = timestamp.substring(8,10)
    return day + "." + month + "." + year
}
