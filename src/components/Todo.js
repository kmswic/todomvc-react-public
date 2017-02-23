import React, {Component} from 'react';
import TodoInlineInput from './TodoInlineInput';

export default class Todo extends Component {

    constructor() {
        super();
        this.state = {focus: false};
    }

    render() {
        let t = this.props.item;
        return <li className={`${t.completed && 'completed'} ${t.editing && 'editing'}`} key={t.id}>
            <div className="view" onDoubleClick={e => this.activate()} >
                <input type="checkbox"
                       className="toggle"
                       checked={t.completed}
                       onChange={e => this.props.toggle(t.id)}
                />
                <label>
                    {t.title}
                </label>
                <button className="destroy"
                        onClick={e => this.props.delete(t.id)}
                />
            </div>
            <TodoInlineInput todo={t}
                             delete={this.props.delete}
                             edit={this.props.edit}
                             end={() => this.props.toggleEditing(t.id)}
                             focus={this.state.focus}
            />
        </li>
    }

    activate = () => {
        this.props.toggleEditing(this.props.item.id);
    };

}