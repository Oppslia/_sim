import * as Pantry from "../repos/drinkrepo.mjs"
import express from "express"
const router = express.Router({ mergeParams: true })
router.use(express.json())
router.get("/get-types", (req, res) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(Pantry.getDrinkTypes())
        console.log("hi")
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})
router.get("/get-drinks/:type", (req, res) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(Pantry.getDrinks(req.params.type))
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})
export default router