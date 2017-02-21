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
            editingMode: false,
            maxId      : 0

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    render() {
        return (
            <div onKeyPress={this.handleEnter}>

                <header className="header">
                    <h1>Todos</h1>
                    <TodoInput handleChange={this.handleInputChange} value={this.state.mainInput}/>
                </header>
                {/*<!-- This section should be hidden by default and shown when there are todos -->*/}
                <section className="main">
                    <input className="toggle-all" type="checkbox"/>
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">
                        {/*<!-- These are here just to show the structure of the list items -->*/}
                        {/*<!-- List items should get the className `editing` when editing and `completed` when marked as completed -->*/}
                        {this.state.todos.map(t => (
                            <li className={t.completed ? 'completed' : ''} key={t.id}>
                                <div className="view">
                                    <input type="checkbox"
                                           className="toggle"
                                           checked={t.completed}
                                           onChange={e => this.toggleTodo(t.id)}/>
                                    <label>{t.title}</label>
                                    <button className="destroy"
                                            onClick={e => this.deleteTodo(t.id)}/>
                                </div>
                                <input className="edit" value="Create a TodoMVC template"/>
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
            this.createTodo(this.state.mainInput);
        }
    }

    createTodo(title) {
        let state = this.state;
        this.setState({
            todos    : state.todos.concat({
                id       : state.maxId + 1,
                title,
                completed: false
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

    toggleTodo(id) {
        this.setState({
            todos: this.state.todos.map(t => {
                if( t.id === id ) {
                    t.completed = !t.completed;
                }
                return t;
            })
        })
    }
}

export default App;
