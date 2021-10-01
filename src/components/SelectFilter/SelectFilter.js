import React from 'react';
import classes from './SelectFilter.module.css';

const SelectFilter = (props) => {
  const valuesWithEmpty = ['', ...props.values];
  return (
    <div className={classes.SelectFilter}>
        <div className={classes.Label}>{props.name}</div>
        <select
          className={classes.Select}
            value={props.value}
            onChange={props.changed}>
            {valuesWithEmpty.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  );
}

export default SelectFilter;