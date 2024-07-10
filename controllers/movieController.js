import mongoose from "mongoose"
import Movies from "../models/MovieModel.js"
import { handleResponseError, handleResponseSuccess } from "../utils/responses.js"

const getMovies = async (req, res) => {
    try {
        const movies = await Movies.find()
        handleResponseSuccess(res, 200, "Get movies successfully", {movies})
    } catch (error) {
        console.error("error", error)
        handleResponseError(res, 400, "Internal Server Error")
    }
}

const getMovieById = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "incorrect id format id")
        return
    }
    const checkMovieIdInDb = await Movies.findById(id)
    if(!checkMovieIdInDb) {
        handleResponseError(res, 404, "Movie not found")
        return
    }
    handleResponseSuccess(res, 200, "Get movie successfully", { 
        title: checkMovieIdInDb.title,
        year: checkMovieIdInDb.year,
        poster: checkMovieIdInDb.poster,
     })
}

const createNewMovie = async (req, res) => {
    const { title, year, poster } = req.body
    if(!title || !year || !poster) {
        handleResponseError(res, 400, "All fields are required")
        return
    }
    const newMovie = await Movies.create({ title, year, poster })
    handleResponseSuccess(res, 201, "Create new movie successfully", { 
       ...newMovie._doc
     })
}

const updateMovie = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "incorrect id format id")
        return
    }
    const checkMovieInDb = await Movies.findById(id)

    if(!checkMovieInDb) {
        handleResponseError(res, 404, "Movie not found")
        return
    }

    const { title, year, poster } = req.body
    if (!title || !year || !poster) {
        handleResponseError(res, 400, "Bad request. All fields are required")
        return
    }
    await checkMovieInDb.updateOne({ title, year, poster })
    handleResponseSuccess(res, 200, "Update movie successfully", { 
       ...checkMovieInDb._doc
     })
}

const deleteMovie = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "incorrect id format id")
        return
    }
    const checkMovieIdInDb = await Movies.findById(id)
    if(!checkMovieIdInDb) {
        handleResponseError(res, 404, "Movie not found")
        return
    }
    await Movies.findByIdAndDelete(id)
    handleResponseSuccess(res, 200, "Delete movie successfully")
}

export { getMovies, getMovieById, createNewMovie, updateMovie, deleteMovie }