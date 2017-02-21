import React, {Component} from 'react';
import './App.css';
import TodoInput from './components/TodoInput';

class App extends Component {

    constructor(props) {
        super();
        this.state = {
            mainInput  : '',
            todos      : [],
            filterState: 'active',
            maxId      : 0

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    render() {
        return (
            <div>

                <header className="header">
                    <h1>Todos</h1>
                    <TodoInput enterHandler={this.handleEnter} handleChange={this.handleInputChange}
                               value={this.state.mainInput}/>
                </header>
                {/*<!-- This section should be hidden by default and shown when there are todos -->*/}
                <section className="main">
                    <input className="toggle-all" type="checkbox"/>
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">
                        {/*<!-- These are here just to show the structure of the list items -->*/}
                        {/*<!-- List items should get the className `editing` when editing and `completed` when marked as completed -->*/}
                        {this.state.todos.map(t => (
                            <li className={`${t.completed && 'completed'} ${t.editing
                                                                            && 'editing'}`}
                                key={t.id}
                            >
                                <div className="view"
                                     onDoubleClick={e => this.toggleEditingTodo(t.id)}
                                >
                                    <input type="checkbox"
                                           className="toggle"
                                           checked={t.completed}
                                           onChange={e => this.toggleTodo(t.id)}
                                    />
                                    <label>
                                        {t.title}
                                    </label>
                                    <button className="destroy"
                                            onClick={e => this.deleteTodo(t.id)}
                                    />
                                </div>
                                <input className="edit" value={t.title}
                                       onChange={e => this.editTodo(t.id, e.target.value)}
                                       onKeyPress={e => this.handleEnterInline(e, t.id)}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
                {/*<!-- This footer should hidden by default and shown when there are todos -->*/}
                <footer className="footer">
                    {/*<!-- This should be `0 items left` by default -->*/}
                    <span className="todo-count"><strong>0</strong> item left</span>
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
                    <button className="clear-completed">Clear completed</button>
                </footer>
            </div>

        )
    }

    handleInputChange(event) {
        this.setState({
            mainInput: event.target.value
        });
    }

    handleEnter(event) {
        if( event.which === 13 ) {
            let title = this.state.mainInput.trim();
            if( title !== '' ) {
                this.createTodo(title);
            }
        }
    }



    createTodo(title) {
        let state = this.state;
        this.setState({
            todos    : state.todos.concat({
                id       : state.maxId + 1,
                title,
                completed: false,
                editing  : false,
            }),
            mainInput: '',
            maxId    : state.maxId + 1
        });
    }

    deleteTodo(id) {
        this.setState({
            todos: this.state.todos.filter(t => t.id !== id)
        })
    }

    updateTodo(id, fn) {
        this.setState({
            todos: this.state.todos.map(t => {
                if( t.id === id ) {
                    let newTodo = fn(t);
                    return newTodo;
                }
                return t;
            })
        })
    }

    toggleTodo(id) {
        this.updateTodo(id, t => {
            t.completed = !t.completed;
            return t;
        });
    }

    toggleEditingTodo(id) {
        this.updateTodo(id, t => {
            t.editing = !t.editing;
            return t;
        })
    }

    editTodo(id, title) {
        this.updateTodo(id, t => {
            t.title = title;
            return t;
        })
    }

    handleEnterInline(event, id) {
        if( event.which === 13 ) {
            let todo = this.state.todos.filter(t => t.id === id)[0];
            if( todo.title.trim() === '' ) {
                this.deleteTodo(id);
            } else {
                this.editTodo(id, todo.title.trim());
                this.toggleEditingTodo(id);
            }
        }
    }
}

export default App;
