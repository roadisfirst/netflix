import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Favorite from '../../../components/Favorite/Favorite';
import * as actions from '../../../store/actions/index';

import classes from './SingleShow.module.css';

const SingleShow = ({
    match,
    dispatch,
    show,
    hasErrors,
    loading,
    user,
    favorite,
    token,
    auth
}) => {
    useEffect(() => {
        const { id } = match.params
    
        dispatch(actions.fetchShow(id))
      }, [dispatch, match]);

      useEffect(() => {
        dispatch(actions.fetchUser(auth.userId))
      }, [dispatch, auth]);

      useEffect(() => {
        dispatch(actions.fetchFavorite(user.userTableId))
      }, [dispatch, user.userTableId]);

    const isInFavorite = (show) => {
        return !!favorite?.find(elem => elem.id === show.id);
    };

    const onAddToFavorite = (show) => {
        dispatch(actions.addToFavorite(show));
        const newFav = [...favorite, show];
        dispatch(actions.updateFavorite(newFav, user.userTableId, token));
    };

    const onRemoveFromFavorite = (show) => {
        dispatch(actions.removeFromFavorite(show));
        const newFav = favorite.filter(elem => elem.id !== show.id)
        dispatch(actions.updateFavorite(newFav, user.userTableId, token));
    };

    const renderShow = () => {
        if (loading) return <Spinner />
        if (hasErrors) return <p>Unable to display show.</p>
        const genres = show.genres?.map(elem => <span key={elem}>{elem} </span>);
        return (
            <div className={classes.SingleShow}>
                <div className={classes.SingleShowImageWrapper}>
                    <img className={classes.SingleShowImg} src={show.image?.medium} alt={show.name}/>
                    <Favorite
                        active={isInFavorite(show)}
                        favorite={() => onAddToFavorite(show)}
                        unfavorite={() => onRemoveFromFavorite(show)}
                    />
                </div>
                <div className={classes.SingleShowAboutWrapper}>
                    <h2 className={classes.SingleShowTitle}>{show.name}</h2>
                    <div className={classes.SingleShowAboutItem}>
                        <b>Summary: </b>{show.summary}
                        <p><b>Show type: </b>{show.type}</p>
                        <p><b>Genres: </b>{genres}</p>
                        <p><b>Rating: </b>{show.rating?.average}</p>
                        <p><b>Language: </b>{show.language}</p>
                        <p><b>Status: </b>{show.status}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            {renderShow()}
        </Fragment>
    );
}

const mapStateToProps = state => {
  return {
        show: state.show.show,
        loading: state.show.loading,
        hasErrors: state.show.hasErrors,
        user: state.user,
        token: state.auth.token,
        favorite: state.favorite.favorite,
        auth: state.auth,
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onFetchShow: (showId) => dispatch(actions.fetchShow(showId)),
//         onFavorite: (id) => dispatch(actions.addToFavorite(id)),
//         onUnfavorite: (id) => dispatch(actions.removeFromFavorite(id)),
//     }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SingleShow);
export default connect(mapStateToProps)(SingleShow);