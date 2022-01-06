import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TaskInput extends React.Component {
  
  render() {
    return (
      <div>
        <label>
          Add Task
          <input type="text" onChange={this.props.handleTaskInput} value={this.props.value} />
        </label>
        <button>CREATE</button>
      </div>
    );
  }
}

  // I wonder if there is a better way...?
  const tabEnum = {
    TODO: 0,
    DONE: 1,
    ALL: 2
  };
  Object.freeze(tabEnum);

class Tab extends React.Component {
  render() {
    return (
        <button onClick={this.props.handleTabClick}>{this.props.message}</button>
    )
  }
}

class TodoNav extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      selectedTab: tabEnum.TODO
    };

    this.handleTabClick = this.handleTabClick.bind(this);
  }
  
  render() {
    switch (this.state.selectedTab) {
      case tabEnum.TODO:
        console.log('todo');
        break;
      case tabEnum.DONE:
        console.log('done');
        break;
      case tabEnum.ALL:
        console.log('all');
        break;
    }
    return (
      <div>
        <Tab message="To-Do" tabType={tabEnum.TODO} handleTabClick={this.handleTabClick(tabEnum.TODO)} />
        <Tab message="Done" tabType={tabEnum.DONE} handleTabClick={this.handleTabClick(tabEnum.DONE)} />
        <Tab message="All" tabType={tabEnum.ALL} handleTabClick={this.handleTabClick(tabEnum.ALL)} />
      </div>
    );
  }

  handleTabClick(selectedTab) {
    return event => this.setState({selectedTab});
  }

  
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskInputText: ''
    }

    this.handleTaskInput = this.handleTaskInput.bind(this);
  }
  render() {
    return (
      <div>
        <h1>To-Do List</h1>
        <TaskInput handleTaskInput={this.handleTaskInput} value={this.state.taskInputText} />
        <TodoNav />
      </div>
    );
  }

  handleTaskInput(event) {
    this.setState({
      taskInputText: event.target.value
    });
  }
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
