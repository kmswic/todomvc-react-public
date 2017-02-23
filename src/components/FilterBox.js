import React from 'react';

function FilterLink(props) {
    return (
        <li>
            <a href="#/" className={props.filter === props.name && 'selected'}
            onClick={() => props.set(props.name)}>
                {props.name[0].toUpperCase() + props.name.slice(1)}
                </a>
        </li>
    )
}

function FilterBox(props) {
    return (
        <ul className="filters">
            {['all', 'active', 'completed'].map((link, index) =>
            <FilterLink name={link} {...props} key={index}/>)}
        </ul>
    )
}

export default FilterBox