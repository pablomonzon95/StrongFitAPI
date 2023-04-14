require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");

const {validateAuth, handleError, handleNotFound, checkAdmin} = require("./middlewares")
const { createUser, activateUser, loginUser, editUser } = require("./controllers/users");

const { createExercise, getExercises, getExercisebyId, deleteExercise } = require("./controllers/exercises");
const { createDiet, deleteDiet, getDiets, getDietbyId} = require("./controllers/diets");
const {createSuggestion, getSuggestions, getSuggestionbyId} = require("./controllers/suggestions")

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use("/uploads", express.static("./docs/media"));


const { PORT } = process.env;

//ENDPOINTS FOR USERS 

//Create User 
app.post("/users", createUser);
// Activate User
app.get("/activate/:registrationCode", activateUser);

//LoginUser
app.post("/login", loginUser);

//editUser
app.put("/users/:id", validateAuth, editUser);

//create exercise (admin only)

app.post("/excercises", validateAuth, checkAdmin, createExercise);

//get exercises

app.get("/exercises", validateAuth, getExercises);

//get exercise by id

app.get("/exercise/:id", validateAuth, getExercisebyId);

//Delete ExerciseById

app.delete("/exercise/:id", validateAuth, deleteExercise)

// Create diet (admin only)

app.post("/diets", validateAuth, checkAdmin, createDiet);

//get diets 

app.get("/diets", validateAuth, getDiets);


//get diet by id

app.get("/diet/:id", validateAuth, getDietbyId);



//Delete DietById

app.delete("/diet/:id", validateAuth, deleteDiet)

// Create Suggestions from users to admin 
app.post("/suggestion", validateAuth, createSuggestion)

// get Suggestions only admin can see them

app.get("/suggestions", validateAuth, checkAdmin, getSuggestions)

// Get the full Suggestion by Id

app.get("/suggestion/:id", validateAuth, checkAdmin, getSuggestionbyId)

// Middlware 404. if a request with no matches is sent will be redirected here
app.use(handleNotFound);

// Errors Middleware. 
app.use(handleError);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });