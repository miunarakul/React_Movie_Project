import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import bootstrap from 'bootstrap';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourite';
import RemoveFavourites from './components/RemoveFavourites';
import { Outlet, Link } from "react-router-dom";

const App = () => { 
	const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    var word = ['Rock', 'War', 'Marvel','007','spy','100','hundred','year','re','gem','gen','virus','terra','earth','dino','jurassic'];
    var words = word[Math.floor(Math.random()*word.length)];
    (searchValue === '' || searchValue === undefined) ? searchValue = words : searchValue = searchValue ;
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=7bd6de82&type=movie`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
		setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
	};

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

  const addFavouriteMovie =  async (movie) => {
		let newFavouriteList = [...favourites.filter((favourite) => favourite.imdbID !== movie.imdbID	), movie];
    getMovieRequest();
		setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
 
	};


  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

	return (
    
		<div className='container movie-app'>
      <div className='layout' >
        <div className='row d-flex align-items-center mt-4 mb-4'>      	
          <MovieListHeading heading='Movies' />
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        <div className='row main-row'>
            <MovieList 
                movies={movies} 
                favouriteComponent={AddFavourites}
                handleFavouritesClick={addFavouriteMovie}
                key={movies.imdbID}
            />
        </div>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='Favourites' />
        </div>
        <div className='row main-row'>
              <MovieList 
                    movies={favourites} 
                    handleFavouritesClick={removeFavouriteMovie}
                    favouriteComponent={RemoveFavourites}
                    key={movies.imdbID}
              />
        </div>
      </div>
		</div>
	);
}

export default App;