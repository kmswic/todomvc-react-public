import React from 'react';
import Todo from './Todo';

export default function TodoList(props) {
    return (
        <ul className="todo-list">
            {props.todos
                .filter(t => {
                    switch( props.filter ) {
                        case 'active':
                            return !t.completed;
                        case 'completed':
                            return t.completed;
                        default:
                            return true;
                    }
                })
                .map((t, id) =>
                    <Todo item={t} id={id} {...props} key={id} />)
                .toArray()
            }
        </ul>
    )
}