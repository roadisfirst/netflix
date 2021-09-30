import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ShowCard from '../../components/ShowCard/ShowCard';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Profile.module.css';
import * as actions from '../../store/actions/index';

const Profile = ({match, dispatch, loading, user}) => {
  useEffect(() => {
    const { id } = match.params;
    dispatch(actions.fetchUser(id))
  }, [match, dispatch]);

  const renderShows = () => {
    if (loading) return <Spinner />

    let shows = user.favoriteList.map((show) => (
      <ShowCard
        key={show.id} 
        name={show.name}
        img={show.image}
        rating={show.rating}
        genres={show.genres}
        type={show.type}
        status={show.status}
        clicked={`/shows/${show.id}`}
      />
    )
  );
  return shows;
};

  return (
    <div className={classes.Profile}>
      <h2>{user.email} profile</h2>
      <h2>Favorite shows</h2>
      <div className={classes.CardsContainer}>
        {user.favoriteList && renderShows()}
        {!user.favoriteList && 'Sorry you have no shows in Favorite'}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    loading: state.user.loading,
  };
};

export default connect(
  mapStateToProps
)(Profile);