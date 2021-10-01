import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ShowCard from '../../components/ShowCard/ShowCard';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Profile.module.css';
import * as actions from '../../store/actions/index';

const Profile = ({match, dispatch, loading, user, authUserId}) => {
  useEffect(() => {
    const { id } = match.params;
    dispatch(actions.fetchUser(id))
  }, [dispatch, match]);

  const renderFavorite = () => {
    if (loading) return <Spinner />

    let shows = user.favoriteList.map((show) => {
      // const link = authUserId === match.params.id ? `/shows/${show.id}` : '#';

      return (
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
      )}
    );
    return shows;
  };

  return (
    <section className={classes.Profile}>
      <h2>{user.email} profile</h2>
      <h3>Favorite shows</h3>
      <div className={classes.CardsContainer}>
        {user.favoriteList && renderFavorite()}
        {!user.favoriteList && 'No shows in Favorite'}
      </div>
    </section>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    loading: state.user.loading,
    authUserId: state.auth.userId
  };
};

export default connect(
  mapStateToProps
)(Profile);