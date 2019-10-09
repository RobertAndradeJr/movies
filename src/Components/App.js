import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import { MOVIE_API_URL, MOVIE_API_KEY, SUBTITLE, PAGE_HEADER } from "./Strings";
import { reducer } from "./Reducer";
import {
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE
} from "./Actions";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, errorMessage, loading } = state;

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: SEARCH_MOVIES_SUCCESS,
          payload: jsonResponse.Search
        });
      });
  }, []);

  const search = searchValue => {
    dispatch({
      type: SEARCH_MOVIES_REQUEST
    });
    fetch(`https://www.omdbapi.com/?s=${searchValue}${MOVIE_API_KEY}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: SEARCH_MOVIES_SUCCESS,
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: SEARCH_MOVIES_FAILURE,
            error: jsonResponse.Error
          });
        }
      });
  };

  return (
    <div className="App">
      <Header text={PAGE_HEADER} />
      <Search search={search} />
      <p className="App-intro">{SUBTITLE}</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : movies ? (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default App;
