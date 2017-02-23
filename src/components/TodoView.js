import React from 'react';

export default function TodoView({item, activate, toggle, deleteTodo}) {
    return (
        <div className="view" onDoubleClick={activate}>
            <input type="checkbox"
                   className="toggle"
                   checked={item.completed}
                   onChange={e => toggle(item.id)}
            />
            <label>
                {item.title}
            </label>
            <button className="destroy"
                    onClick={e => deleteTodo(item.id)}
            />
        </div>
    )
}