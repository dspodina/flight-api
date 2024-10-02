import express from "express"
import verifyToken from "../middleware/verifyToken.js"
import flightControllers from "../controllers/flights.js"


const router = express.Router();

const { getAllFlights, getFlightById, getAddFlightForm, addFlight } = flightControllers;

// routes
router.get("/flights", getAllFlights)
router.post("/flights/:id", getFlightById)
router.get("/add-flight", verifyToken, getAddFlightForm)
router.post("/add-flight", addFlight)


export default router;
