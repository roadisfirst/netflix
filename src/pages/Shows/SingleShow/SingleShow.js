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

        return (
            <div className={classes.SingleShow}>
                <div className={classes.About}>
                  <img src={show.image?.original} alt={show.name}/>
                    <h2 className={classes.ShowTitle}>{show.name}</h2>
                    <div className={classes.AboutWrapper}>
                        <div className={classes.AboutItem}>
                            <p><b>Summary: </b>{show.summary}</p>
                            <p><b>Genres: </b>{show.genres}</p>
                            <p><b>Rating: </b>{show.rating.average}</p>
                            <p><b>Language: </b>{show.language}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="SingleShow">
            {renderShow()}
        </div>
    );
}

const mapStateToProps = state => ({
  show: state.show.show,
  loading: state.show.loading,
  hasErrors: state.show.hasErrors
})

export default connect(mapStateToProps)(SingleShow);