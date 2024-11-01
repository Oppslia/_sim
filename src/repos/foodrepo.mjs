import * as foods from "../../models/foods.mjs"
export function getFoodCategory(){
    return Object.keys(foods)
}
export function getFoods(category){
    return foods[category]
}   
export function getAll(){
    console.log(foods)
    return foods
}