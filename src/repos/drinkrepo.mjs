import * as drinks from "../../models/drinks.mjs"
export function getDrinkCategories(){
    return Object.keys(drinks)
}
export function getDrinks(category){
    return drinks[category]
}   
export function getAll(){
    console.log(drinks)
    return drinks
}