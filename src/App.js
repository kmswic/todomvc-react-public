import React, {Component} from 'react';
import './App.css';
import MainInput from './components/MainInput';
import TodoList from './components/TodoList';
import FilterBox from './components/FilterBox';

class App extends Component {

    constructor(props) {
        super();
        this.state = {
            mainInput: '',
            todos    : [],
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
                    <strong>{this.state.todos.length} </strong>
                     item{this.state.todos.length % 10 !== 1 ? 's' : null} left
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
                {!!this.state.todos.length ? main : null}
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
