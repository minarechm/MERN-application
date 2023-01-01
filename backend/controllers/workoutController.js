const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

// GET ALL
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})//Workout je Workout Model
    res.status(200).json(workouts)
}

// GET SINGLE
const getWorkout = async (req, res) => {
    const { id } = req.params //zoberie id z /:id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Doesnt exist"})
    }

    const workout = await Workout.findById(id)
    if (!workout) { //workout return 0, takže je empty
        return res.status(404).json({ error: "Doesnt exist"}) //musi tu byť return aby sa ukončila funkcia getWorkout
    }

    res.status(200).json(workout)
}

// POST NEW
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push("title")
    }
    if(!load){
        emptyFields.push("load")
    }
    if(!reps){
        emptyFields.push("reps")
    }

    if (emptyFields.length > 0){
        return res.status(400).json({error: "Please fill all the fields.", emptyFields })
    }
    // add to DB
    try {
        const workout = await Workout.create({ title, load, reps})
        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({ error: error.message})
    }
}

// DELETE SINGLE
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Doesnt exist"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) { //workout return 0, takže je empty
        return res.status(404).json({ error: "Doesnt exist"}) 
    }
    res.status(200).json(workout)
}

// UPDATE SINGLE
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Doesnt exist"})
    }

    const workout = await Workout.findOneAndUpdate({ _id : id}, {
        ...req.body
    })

    if (!workout) { //workout return 0, takže je empty
        return res.status(404).json({ error: "Doesnt exist"}) 
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}