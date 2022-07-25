import React from 'react';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='card' key={movie.imdbID} >
					<img className='card-img-top' src={movie.Poster} alt='movie'></img>
					<div className='fav overlay d-flex align-items-center justify-content-center card-body' onClick={() => props.handleFavouritesClick(movie)}>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;