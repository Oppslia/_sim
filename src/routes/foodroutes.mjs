import * as Pantry from "../repos/foodrepo.mjs"
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
        res.status(200).json(Pantry.getFoodCategory())
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})
router.get("/get-foods/:category", (req, res) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(Pantry.getFoods(req.params.category))
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})
export default router