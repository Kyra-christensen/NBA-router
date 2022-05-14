import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { ghibliFilmsFetch } from '../services/ghibliApi-fetch';
import styles from '../App.css';

export default function FilmList() {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const [search, setSearch] = useState(
    new URLSearchParams(location.search).get('search') || ''
  );
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const filmList = isSearching ? results : films;

  // search/filter functionality
  const handleSearch = (event) => {
    setSearch(event.target.value);
    history.push(`/?search=${event.target.value}`);
    const searchResults = films.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase().trim());
    });
    setResults(searchResults);
    setIsSearching(true); //if search.length is truthy
  };

  // useEffect to fetch StudioGhibli API on load
  useEffect(() => {
    setLoading(true);
    const getFilmData = async () => {
      const filmData = await ghibliFilmsFetch();
      setFilms(filmData);
      setLoading(false);
    };
    getFilmData();
  }, []);

  // useEffect that checks whether there is a search or not
  useEffect(() => {
    setLoading(true);
    const getFilmData = async () => {
      const filmData = await ghibliFilmsFetch();
      setFilms(filmData);
      setLoading(false);
      if (!search) {
        setIsSearching(false);
      }
    };
    getFilmData();
  }, [location.search]);

  return (
    <>
      {loading ? (
        <p>Loading Films...</p>
      ) : (
        <>
          <div className={styles.search}>
            <input
              id="search"
              type="textbox"
              value={search}
              placeholder="Search film by title"
              onChange={handleSearch}
            />
          </div>
          <div className={styles.list}>
            {filmList.map((film) => {
              return (
                <section key={film.id} className={styles.film}>
                  <Link to={`/films/${film.id}`}>
                    <h3>{film.title}</h3>
                    <h3>{film.originalTitle}</h3>
                    <img src={film.image} alt="film-image" />
                  </Link>
                </section>
              );
            })}
          </div>
          {isSearching && !results.length && <p>No Results</p>}
        </>
      )}
    </>
  );
}