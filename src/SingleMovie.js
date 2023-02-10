import React from 'react'
import { useParams, NavLink } from 'react-router-dom';
import { API_URL } from './Context';
import {  useEffect, useState } from "react";


const SingleMovie = () => {
    const {id} = useParams();
    const [isLoading,setIsLoading] = useState(true);
    const [movie,setMovie] = useState("");
    const [, setTimeOut] = useState();

    const getMovies= async(url)=>{
        setIsLoading(true);
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false);
                setMovie(data);
            }
            
        } catch(error){
            console.log(error);
        }
    };

    
    useEffect(()=>{
    let timerOut = setTimeOut(()=>{
            getMovies(`${API_URL}&i=${id}`);
        },800);

        return ()=> clearTimeout(timerOut);
    },[id]);

    if (isLoading) {
      return (
        <section className="movie-section ">
          <div className="loading">Loading....</div>;
        </section>
      );
    }
  
    return (
      <section className="movie-section">
        <div className="movie-card">
          <figure>
            <img src={movie.Poster} alt="" />
          </figure>
          <div className="card-content">
            <p className="title">{movie.Title}</p>
            <p className="card-text">{movie.Released}</p>
            <p className="card-text">{movie.Genre}</p>
            <p className="card-text">{movie.imdbRating} / 10</p>
            <p className="card-text">{movie.Country}</p>
            <NavLink to="/" className="back-btn">
              Go Back
            </NavLink>
          </div>
        </div>
      </section>
    );
  };

export default SingleMovie;

