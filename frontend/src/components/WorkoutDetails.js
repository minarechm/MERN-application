import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({ workout, _id}) => {
    const { dispatch } = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE"
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type: "DELETE_WORKOUT", payload:json})
        }
    }
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p>{workout.reps}</p>
            <p>{workout.load}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails