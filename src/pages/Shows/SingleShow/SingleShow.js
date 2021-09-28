import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';

import classes from './SingleShow.module.css';

const SingleShow = ({
    match,
    dispatch,
    show,
    hasErrors,
    loading
}) => {
    useEffect(() => {
        const { id } = match.params
    
        dispatch(actions.fetchShow(id))
      }, [dispatch, match]);

    const renderShow = () => {
        if (loading.show) return <Spinner />
        if (hasErrors.show) return <p>Unable to display show.</p>
        const genres = show.genres?.map(elem => <span key={elem}>{elem} </span>);

        return (
            <div className={classes.SingleShow}>
                <div className={classes.SingleShowImageWrapper}>
                    <img className={classes.SingleShowImg} src={show.image?.medium} alt={show.name}/>
                </div>
                <div className={classes.SingleShowAboutWrapper}>
                    <h2 className={classes.SingleShowTitle}>{show.name}</h2>
                    <div className={classes.SingleShowAboutItem}>
                        <p><b>Summary: </b>{show.summary}</p>
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
        <>
            {renderShow()}
        </>
    );
}

const mapStateToProps = state => ({
  show: state.show.show,
  loading: state.show.loading,
  hasErrors: state.show.hasErrors
})

export default connect(mapStateToProps)(SingleShow);