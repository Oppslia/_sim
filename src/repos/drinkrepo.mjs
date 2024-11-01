import * as drinks from "../../models/drinks.mjs"
export function getDrinkTypes(){
    return Object.keys(drinks)
}
export function getDrinks(type){
    return drinks[type]
}   