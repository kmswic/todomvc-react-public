import React from 'react';

export default function TodoView({item, id, activate, toggle, deleteTodo}) {
    return (
        <div className="view" onDoubleClick={activate}>
            <input type="checkbox"
                   className="toggle"
                   checked={item.completed}
                   onChange={e => toggle(id)}
            />
            <label>
                {item.title}
            </label>
            <button className="destroy"
                    onClick={e => deleteTodo(id)}
            />
        </div>
    )
}