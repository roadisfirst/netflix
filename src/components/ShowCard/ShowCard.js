import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './ShowCard.module.css';

const showCard = (props) => {
  console.log('card',props);
    return (
        <NavLink to={props.clicked}>
            <article className={classes.ShowCard}>
                <div className={classes.Info}>
                    <img src={props.img.medium} alt={props.name}/>
                    <h3>{props.name}</h3>
                    <div>Genres: {props.genres}</div>
                    <div>Rating: {props.rating?.average}</div>
                </div>
            </article>
        </NavLink>
    )
};

export default showCard;