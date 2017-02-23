import React from 'react';

export default (props) => (
    <input className="new-todo"
           placeholder="What needs to be done?"
           onKeyPress={props.handleEnter}
           onChange={props.handleChange}
           value={props.value}
    />
)