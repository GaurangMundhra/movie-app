import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount, } from './appwrite'

const API_BASE_URL = 'https://api.themoviedb.org/3'


const API_OPTIONS = {
  method: 'GET',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
}
const App = () => {
  const [searchTerm,setSearchTerm] = useState('')

  const [errorMessage,setErrorMessage] = useState('')
  
  const [moviesList,setMoviesList] = useState([])

  const [isLoading,setIsLoading] = useState(false);

  const [debouncedSearchTerm,setDebouncedSearchTerm] = useState('');

  const [trendingMovies,setTrendingMovies] = useState([]);

  useDebounce( () => setDebouncedSearchTerm(searchTerm), 500 , [searchTerm]);

  const fetchMovies = async (query ='') => {
    setIsLoading(true);
    setErrorMessage('');
    try{
      const endpoint = query 
      ?  `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint,API_OPTIONS)

      if(!response.ok){
      throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if(data.response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch Movies');
        setMoviesList([]);
        return;
      }

      const results = data.results || [];

      setMoviesList(results);

      if (query && results.length > 0) {
         await updateSearchCount(query, results[0]);
      }


    }catch(error){
      console.error(`Error fetching Movies: ${error}`)
      setErrorMessage('Error fetching Movies. Please try again later.')
    }finally{
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies();

      setTrendingMovies(movies)
    }catch(error){
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect( () => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])

  useEffect( () => {
    loadTrendingMovies()
  }, []);


  return (
    <main>
      <div className='pattern'/>

      <div className='wrapper'>
        <header>
          <img src='./hero.png' alt='Hero banner'/>
          <h1>Find  <span className='text-gradient'>Movies</span> You'll Enjoy without the Hassle </h1>

                  <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>


      {trendingMovies.length > 0 && (
        <section className='trending'>
          <h2>Trending</h2>

          <ul>
            {trendingMovies.map((movie,index) => (
              <li key={movie.$id}>
                <p>{index+1} </p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            ))}

          </ul>
        </section>
      )}
      <section className='all-movies'>
        <h2 >All Movies</h2>

        {isLoading ? (
          <Spinner />
        ): errorMessage? (
          <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <ul>
            {moviesList.map((movie) => {
              return <MovieCard key={movie.id} movie={movie}/>
            })}
          </ul>
        )}
      </section>
        
  </div>
    </main>
    
  )
}

export default App