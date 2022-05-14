import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../App.css';

export default function Detail() {
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchEachFilm = async () => {
      const res = await fetch(`https://ghibliapi.herokuapp.com/films/${id}`);
      const filmData = await res.json();
      setFilm(filmData);
      setLoading(false);
    };
    fetchEachFilm();
  }, []);

  return (
    <>
      <div className={styles.detail}>
        <Link to="/">
          <button className={styles.back}>Back to All Films</button>
        </Link>
        <hr />
        {loading ? (
          <p>Loading film...</p>
        ) : (
          <>
            <section className={styles.card}>
              <div>
                <h2>
                  {film.title} <br />
                  {film.original_title}
                </h2>
                <p>Director: {film.director}</p>
                <p>Producer: {film.producer}</p>
                <p>Story Summary: {film.description}</p>
              </div>
              <div>
                <img src={film.image} alt={`${film.title}`} />
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}