import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorite from './components/AddtoFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () => {
	const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);
  
  const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
          setMovies(responseJson.Search);
        }
  };

        const addFavoriteMovie = (movie) => {
          const newFavoriteList = [...favorites, movie];
          setFavorites(newFavoriteList);
                };

        const removeFavoriteMovie = (movie) => {
          const newFavoriteList = favorites.filter(
            (favorite) =>favorite.imdbID !== movie.imdbID
          );

        setFavorites(newFavoriteList);
        };
            
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]
  );

	
	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
      <div className='row'>
        <MovieList movies={movies} 
        favoriteComponent={AddFavorite}
        handleFavoritesClick={addFavoriteMovie} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favorites'/>
      </div>
      <div className='row'>
        <MovieList movies={favorites} 
        handleFavoritesClick={removeFavoriteMovie}
        favoriteComponent={RemoveFavorites}/>
      </div>
		</div>
	);
};

export default App;