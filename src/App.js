import React, {Component} from 'react';
import './App.css';
import MainInput from './components/MainInput';
import Todo from './components/Todo';

class App extends Component {

    constructor(props) {
        super();
        this.state = {
            mainInput  : '',
            todos      : [],
            filterState: 'active',
            maxId      : 0

        };
    }

    render() {
        let main = (
            <section className="main">
                <input className="toggle-all" type="checkbox" onChange={this.toggleAll}/>
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">
                    {this.state.todos.map(t =>
                        <Todo item={t}
                              edit={this.editTodo}
                              delete={this.deleteTodo}
                              toggle={this.toggleTodo}
                              toggleEditing={this.toggleEditingTodo}
                        />)
                    }
                </ul>
            </section>
        );
        let footer = (
            <footer className="footer">
                {/*<!-- This should be `0 items left` by default -->*/}
                <span className="todo-count">
                    <strong>{this.state.todos.length} </strong>
                     item{this.state.todos.length % 10 !== 1 ? 's' : null} left
                </span>
                {/*<!-- Remove this if you don't implement routing -->*/}
                <ul className="filters">
                    <li>
                        <a className="selected" href="#/">All</a>
                    </li>
                    <li>
                        <a href="#/active">Active</a>
                    </li>
                    <li>
                        <a href="#/completed">Completed</a>
                    </li>
                </ul>
                {/*<!-- Hidden if no completed items are left ↓ -->*/}
                <button className="clear-completed" onClick={this.clearCompleted}>Clear completed</button>
            </footer>
        );
        return (
            <div>

                <header className="header">
                    <h1>Todos</h1>
                    <MainInput handleEnter={this.handleEnter} handleChange={this.handleInputChange}
                               value={this.state.mainInput}/>
                </header>
                {/*<!-- This section should be hidden by default and shown when there are todos -->*/}
                {!!this.state.todos.length ? main : null}
                {/*<!-- This footer should hidden by default and shown when there are todos -->*/}
                {!!this.state.todos.length ? footer : null}
            </div>

        )
    }

    handleInputChange = (event) => {
        this.setState({
            mainInput: event.target.value
        });
    };

    handleEnter = (event) => {
        if( event.which === 13 ) {
            let title = this.state.mainInput.trim();
            if( title !== '' ) {
                this.createTodo(title);
            }
        }
    };


    createTodo = (title) => {
        this.setState(state => ({
            todos    : state.todos.concat({
                id       : state.maxId + 1,
                title,
                completed: false,
                editing  : false,
            }),
            mainInput: '',
            maxId    : state.maxId + 1
        }));
    };

    deleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(t => t.id !== id)
        })
    };

    updateTodo(id, fn) {
        this.setState(state => ({
            todos: state.todos.map(t => {
                if( t.id === id ) {
                    return fn(t);
                }
                return t;
            })
        }))
    };

    toggleTodo = id => {
        this.updateTodo(id, t => {
            t.completed = !t.completed;
            return t;
        });
    };

    toggleEditingTodo = id => {
        this.updateTodo(id, t => {
            t.editing = !t.editing;
            return t;
        })
    };

    editTodo = (id, title) => {
        this.updateTodo(id, t => {
            t.title = title;
            return t;
        })
    };

    clearCompleted = () => {
        this.setState(state => ({
            todos: state.todos.filter(t => !t.completed)
        }))
    };

    toggleAll = e => {
        let value = e.target.checked;
        this.setState(state => ({
            todos: state.todos.map(t => {
                t.completed = value;
                return t;
            })
        }))
    }
}

export default App;
