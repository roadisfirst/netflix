import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import ShowCard from '../../components/ShowCard/ShowCard';
import Spinner from '../../components/UI/Spinner/Spinner';
import SelectFilter from '../../components/SelectFilter/SelectFilter';
import Pagination from '../../components/Pagination/Pagination';
import * as actions from '../../store/actions/index';

import classes from './Shows.module.css';


const Shows = ({dispatch, loading, shows, hasErrors}) => {
    useEffect(() => {
        dispatch(actions.fetchShows())
    }, [dispatch]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showsPerPage] = useState(8);
    const [q, setQ] = useState('');
    const [genreVal, setGenreVal] = useState('');
    const [statusVal, setStatusVal] = useState('');
    const [typeVal, setTypeVal] = useState('');
    const [filtering, setFiltering] = useState(false);
    const [filteredShows, setFilteredShows] = useState(null);

    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;
    const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const search = (shows) => {
        return shows.filter(show => show.props.name?.toLowerCase().startsWith(q.toLocaleLowerCase()));
    };

    const filter = (shows) => {
        if (! shows || !shows.length){ 
            return 'No shows match';
        } else {
        return shows.filter(show => ( (genreVal ? show.props.genres.includes(genreVal) : true) &&
            (typeVal ? show.props.type === typeVal : true) && (statusVal ? show.props.status === statusVal : true)) && show)
        }
    }

    const applyFilter = () => {
        setFiltering(true);
        setFilteredShows(filter(renderShows(shows)))
    }

    const clearFilter = () => {
        setFiltering(false);
        setFilteredShows(null);
        setQ('');
        setTypeVal('');
        setGenreVal('');
        setStatusVal('');
    }

    const renderShows = (data) => {
        if (loading) return <Spinner />
        if (hasErrors) return <p>Unable to display Shows.</p>
        let searchedShows = search(data.map((show) =>
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
        ));
        return searchedShows.length ? searchedShows : 'No shows match';
        
    };

    const getOptionsArray = (data, field) => {
        const allValuesArray = [];
        data.map(item => typeof item[field] === 'string' ? allValuesArray.push(item[field]) :
            allValuesArray.push(...item[field]));
        return [...new Set(allValuesArray)];
    }

    const genresOptions = getOptionsArray(shows, 'genres');
    const statusOptions = getOptionsArray(shows, 'status');
    const typeOptions = getOptionsArray(shows, 'type');
    
    const searchedShows = q ? shows : currentShows;

    return (
        <section className={classes.ShowsContainer}>
            <input 
                type='text'
                placeholder='Search for show'
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className={classes.ShowsSearchbar} />
            <div className={classes.FilterBlock}>
                <SelectFilter
                    value={genreVal}
                    name='Genres'
                    changed={(e) => setGenreVal(e.target.value)}
                    values={genresOptions} />
                <SelectFilter
                    value={statusVal}
                    name='Status'
                    changed={(e) => setStatusVal(e.target.value)}
                    values={statusOptions} />
                <SelectFilter
                    value={typeVal}
                    name='Type'
                    changed={(e) => setTypeVal(e.target.value)}
                    values={typeOptions} />
                <button className={classes.FilterBlockButton} onClick={applyFilter}>
                    Apply Filter
                </button>
                <button className={classes.FilterBlockButton} onClick={clearFilter}>
                    Clear Filter
                </button>
            </div>
            <h2 className={classes.ShowsHeader}>Shows</h2>
            {!q && !filtering && <Pagination
                        postsPerPage={showsPerPage}
                        totalPosts={shows.length}
                        paginate={paginate} />}
            <div className={classes.CardsContainer}>
                {filteredShows ? filteredShows : renderShows(searchedShows)}
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