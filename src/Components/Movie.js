import React from "react";
import { DEFAULT_PLACEHOLDER_IMAGE } from "./Strings";

const Movie = ({ movie }) => {
  const { Poster, Title, Year } = movie;
  const MOVIE_ALT_TEXT = `The movie titled: ${Title}`;
  const poster = Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : Poster;
  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <div>
        <img width="200" alt={MOVIE_ALT_TEXT} src={poster} />
      </div>
      <p>({Year})</p>
    </div>
  );
};

export default Movie;
