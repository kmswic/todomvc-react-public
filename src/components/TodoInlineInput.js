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
            autoFocus={this.props.focus}
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
        if( this.props.todo.editing ) {
            let value = this.input.value.trim();
            let id = this.props.todo.id;
            if( value === '' ) {
                this.props.delete(id);
            } else {
                this.props.edit(id, value)
            }
            this.props.end();
        }
    }
}