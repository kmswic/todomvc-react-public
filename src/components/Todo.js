import React, {Component} from 'react';
import TodoInlineInput from './TodoInlineInput';
import TodoView from './TodoView';

export default class Todo extends Component {

    render() {
        let t = this.props.item;
        let id = this.props.id;
        return (
            <li className={`${t.completed && 'completed'} ${t.editing && 'editing'}`}>
                <TodoView
                    item={t}
                    id={id}
                    toggle={this.props.toggle}
                    deleteTodo={this.props.delete}
                    activate={() => this.props.toggleEditing(id)}
                />
                <TodoInlineInput
                    todo={t}
                    id={id}
                    end={() => this.props.toggleEditing(id)}
                    activate={() => this.props.toggleEditing(id)}
                    {...this.props}
                />
            </li>
        )
    }

}