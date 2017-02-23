import React, {Component} from 'react';
import './App.css';
import MainInput from './components/MainInput';
import TodoList from './components/TodoList';
import FilterBox from './components/FilterBox';
import Immutable from 'immutable';

class App extends Component {

    constructor(props) {
        super();
        this.state = {
            mainInput: '',
            todos    : Immutable.OrderedMap(),
            filter   : 'all',
            maxId    : 0
        };
    }

    render() {
        let main = (
            <section className="main">
                <input className="toggle-all" type="checkbox" onChange={this.toggleAll}/>
                <label htmlFor="toggle-all">Mark all as complete</label>
                <TodoList todos={this.state.todos}
                          filter={this.state.filter}
                          edit={this.editTodo}
                          delete={this.deleteTodo}
                          toggle={this.toggleTodo}
                          toggleEditing={this.toggleEditingTodo}
                />
            </section>
        );
        let footer = (
            <footer className="footer">
                {/*<!-- This should be `0 items left` by default -->*/}
                <span className="todo-count">
                    <strong>{this.state.todos.size} </strong>
                     item{this.state.todos.size % 10 !== 1 ? 's' : null} left
                </span>
                {/*<!-- Remove this if you don't implement routing -->*/}
                <FilterBox
                    filter={this.state.filter}
                    set={newState => this.setState({filter: newState})}
                />
                {/*<!-- Hidden if no completed items are left ↓ -->*/}
                <button className="clear-completed" onClick={this.clearCompleted}>Clear completed
                </button>
            </footer>
        );
        return (
            <div>

                <header className="header">
                    <h1>Todos</h1>
                    <MainInput handleEnter={this.handleEnter} handleChange={this.handleInputChange}
                               value={this.state.mainInput}/>
                </header>
                {!!this.state.todos.size ? main : null}
                {!!this.state.todos.size ? footer : null}
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
        this.setState(state => {
            let maxId = state.maxId + 1;
            return {
                maxId,
                todos: state.todos.set(maxId, {
                    title,
                    completed: false,
                    editing  : false,
                }),
                mainInput: ''
            }
        })
    };

    deleteTodo = (id) => {
        this.setState(state => ({
            todos: state.todos.delete(id)
        }))
    };

    updateTodo(id, fn) {
        this.setState(state => ({
            todos: state.todos.update(id, fn)
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
