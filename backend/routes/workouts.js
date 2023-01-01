const express = require("express")
const { 
    createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout
} = require("../controllers/workoutController")

const router = express.Router()

// GET ALL
router.get("/", getWorkouts)

// GET SINGLE
router.get("/:id", getWorkout)

// POST NEW
router.post("/", createWorkout)

// DELETE SINGLE
router.delete("/:id", deleteWorkout)

// UPDATE SINGLE
router.patch("/:id", updateWorkout)


module.exports = router