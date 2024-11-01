import * as foods from "../../models/foods.mjs"
export function getFoodTypes(){
    return Object.keys(foods)
}
export function getFoods(type){
    return foods[type]
}   