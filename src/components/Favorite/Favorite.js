import React, { useState } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

import classes from './Favorite.module.css';

const Favorite = ({active, favorite, unfavorite}) => {
  const [enabled, setEnabled] = useState(true);

  const onClickUnfavorite = () => {
    setEnabled(false);
    unfavorite();
    setEnabled(true);
  };

  const onClickFavorite = () => {
      setEnabled(false);
      favorite();
      setEnabled(true);
  };

  return active ? (
    <button type="button" onClick={onClickUnfavorite} className={classes.Unfavorite} disabled={!enabled}>
        <IoIosHeart />Unfavorite
    </button>
  ) : (
      <button type="button" onClick={onClickFavorite} className={classes.Favorite} disabled={!enabled}>
          <IoIosHeartEmpty />Favorite
      </button>
  )
}

export default Favorite;