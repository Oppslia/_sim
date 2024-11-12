import {BabyConsole} from "../repos/babyconsolerepo.mjs"
import express from "express"
import Baby from "../repos/babyrepo.mjs"
const router = express.Router({ mergeParams: true })


router.use(express.json())

router.post("/new", (req, res) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(BabyConsole.interface('create', req.body))
    }catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.post("/feed", (req, res) => {
    try {    //gets all users? why would we need this?
        
        res.status(200).json(BabyConsole.interface('feed', req.body))
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }

})
router.post("/hydrate", (req, res) => {
    try {    //gets all users? why would we need this?
        
        res.status(200).json(BabyConsole.interface('hydrate', req.body))
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})

router.get("/stats", (req, res) => {
    try {    //gets all users? why would we need this?
        res.status(200).json(BabyConsole.interface('specs'))
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
        }
    
})
router.post("/verify-living-state", (req, res) => {
    try {    //gets all users? why would we need this?
        console.log(req.body)
        res.status(200).json(BabyConsole.interface('verify', req.body))
    }catch(error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})
export default router