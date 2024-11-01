import * as Pantry from "../repos/drinkrepo.mjs"
import express from "express"
const router = express.Router({ mergeParams: true })
router.use(express.json())
router.get("/get-all", (req, res) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(Pantry.getAll())
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})
router.get("/get-categories", (req, res) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(Pantry.getDrinkCategories())
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})
router.get("/get-drinks/:category", (req, res) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(Pantry.getDrinks(req.params.category))
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})
export default router