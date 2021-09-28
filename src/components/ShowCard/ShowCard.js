import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './ShowCard.module.css';

const showCard = (props) => {
  const genres = props.genres.map(elem =>
    <span key={elem}>{elem} </span>
  );
    return (
        <NavLink to={props.clicked}>
            <article className={classes.ShowCard}>
                <div className={classes.Info}>
                    <img src={props.img.medium} alt={props.name}/>
                    <h3>{props.name}</h3>
                    <p><b>Genres: </b>{genres}</p>
                    <p><b>Rating: </b>{props.rating?.average}</p>
                </div>
            </article>
        </NavLink>
    )
};

export default showCard;