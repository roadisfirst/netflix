import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch} from 'react-redux';

import ShowCard from '../../components/ShowCard/ShowCard';
import Spinner from '../../components/UI/Spinner/Spinner';
// import Search from '../../components/Dashboard/Dashboard';
import axios from '../../axios-shows';
import * as actions from '../../store/actions/index';
import { render } from 'react-dom';

import classes from './Shows.module.css';

const Shows = ({dispatch, loading, shows, hasErrors}) => {
  console.log('In shows', dispatch, loading, shows, hasErrors)
    useEffect(() => {
        dispatch(actions.fetchShows())
    }, [dispatch])

    const renderShows = () => {
        if (loading) return <Spinner />
        if (hasErrors) return <p>Unable to display Shows.</p>


        return shows.slice(0, 25).map((show) =>

            <ShowCard
                key={show.id} 
                name={show.name}
                img={show.image}
                rating={show.rating}
                genres={show.genres}
                clicked={`/shows/${show.id}`} />)
    }

    return (
        <section className={classes.ShowsContainer}>
            <h2>Shows</h2>
            {/* <Search /> */}
            <div className={classes.CardsContainer}>
                {renderShows()}
            </div>
        </section>
    )
}



const mapStateToProps = (state) => ({
        loading: state.shows.loading,
        shows: state.shows.shows,
        hasErrors: state.shows.hasErrors
});

export default connect(mapStateToProps)(Shows);