import { BabyConsole,Baby } from "../repos/babyrepo.mjs"
import express from "express"
const router = express.Router({ mergeParams: true })


router.use(express.json())

// router.post("/baby", (req, res) => {
//     try {    //gets all users? why would we need this?
//         res.status(200).json(BabyConsole)
//     } catch(error) {
//         console.error(error)
//         res.status(500).json({message: "Internal Server Error"})
//         }
    
// })

// router.get("/stats", (req, res) => {
//     try {    //gets all users? why would we need this?
//         res.status(200).json(BabyConsole.getBabySpecs())
//     } catch(error) {
//         console.error(error)
//         res.status(500).json({message: "Internal Server Error"})
//         }
    
// })
export default router