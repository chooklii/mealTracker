import React from "react"
import axios from "axios";
import IP_ADRESS from "../config.js"

class MealDetailPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false
        }
    }

    componentDidMount(){
        const mealId = this.getQueryStringValue("id")
        axios.get("http://" + IP_ADRESS + "/details?id=" + mealId).then((response) => {
            try{
                console.log(response)
            }
            catch(err){
                this.setState({loaded: true})
            }
        })
        
    }

    getQueryStringValue (key) {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
      }

    render(){
        return(
            <div>
                HI
            </div>
        )
    }
}

export default MealDetailPage