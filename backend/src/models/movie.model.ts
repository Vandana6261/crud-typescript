import mongoose, { Schema } from "mongoose";
import { IMovie } from "../types/movie.types";

const movieSchema = new Schema<IMovie>(
    {
        movieName: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        whereToWatch: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        releasedYear: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const Movie = mongoose.model<IMovie>(
    "Movie",
    movieSchema
);

export default Movie;