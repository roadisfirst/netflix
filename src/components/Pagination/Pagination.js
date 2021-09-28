import React from 'react';
import { NavLink }from 'react-router-dom';
import classes from './Pagination.module.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePaginate = (event, number) => {
    return paginate(number);
  }

  return (
    <nav>
      <ul className={classes.Pagination}>
        {pageNumbers.map(number => (
          <li key={number} className={classes.PageItem}>
            <NavLink
              to={`shows&page=${number}`}
              onClick={(event) => handlePaginate(event, number)}
              className={classes.PageLink}
              activeClassName={classes.PageLinkActive}>
              {number}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;