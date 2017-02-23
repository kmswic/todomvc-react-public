import React, {Component} from 'react';
import TodoInlineInput from './TodoInlineInput';
import TodoView from './TodoView';

export default class Todo extends Component {

    render() {
        let t = this.props.item;
        return (
            <li className={`${t.completed && 'completed'} ${t.editing && 'editing'}`} key={t.id}>
                <TodoView
                    item={t}
                    toggle={this.props.toggle}
                    deleteTodo={this.props.delete}
                    activate={() => this.props.toggleEditing(t.id)}
                />
                <TodoInlineInput
                    todo={t}
                    end={() => this.props.toggleEditing(t.id)}
                    activate={() => this.props.toggleEditing(t.id)}
                    {...this.props}
                />
            </li>
        )
    }

}