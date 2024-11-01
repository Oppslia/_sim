import * as Pantry from "../repos/foodrepo.mjs"
import express from "express"
const router = express.Router({ mergeParams: true })
router.use(express.json())
router.get("/get-types", (req, res) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(Pantry.getFoodTypes())
        console.log("hi")
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})
router.get("/get-foods/:type", (req, res) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(Pantry.getFoods(req.params.type))
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})
export default router