import { BabyConsole,Baby } from "../repos/babyrepo.mjs"
import express from "express"
const router = express.Router({ mergeParams: true })


router.use(express.json())


router.post("/new", (req, res) => {
    try {    //gets all users? why would we need this?
        console.log(req.body)
        res.status(200).json({message: "WE GOT THE DATA"})
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})

router.post("/feed", (req, res) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(BabyConsole)
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})
router.post("/hydrate", (req, res) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(BabyConsole)
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})

router.get("/stats", (req, res) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(BabyConsole.getBabySpecs())
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})
export default router