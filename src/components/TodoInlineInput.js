import React, {Component} from 'react';

export default class TodoInlineInput extends Component {

    render() {
        let t = this.props.todo;
        return <input
            className="edit"
            ref={ref => this.input = ref}
            defaultValue={t.title}
            onKeyUp={this.handleEnter}
            onBlur={this.save}
        />
    }

    componentDidUpdate(props) {
        if(props.todo.editing) {
            this.input.focus();
        }
    }

    handleEnter = event => {
        if( event.keyCode === 13 ) {
            this.save();
        } else if( event.keyCode === 27 ) {
            this.input.value = this.props.todo.title;
            this.props.end();
        }
    };

    save = () => {
        let {todo, del, edit, end} = this.props;
        if( todo.editing ) {
            let value = this.input.value.trim();
            let id = this.props.id;
            if( value === '' ) {
                del(id);
            } else {
                edit(id, value)
            }
            end();
        }
    }
}