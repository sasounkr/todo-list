import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TaskInput extends React.Component {
  
  render() {
    return (
      <div id="taskInput">
        <label>
          Add Task
          <br />
          <input type="text" 
            onChange={this.props.handleTaskInput} 
            value={this.props.value} />
        </label>
        <button id="create" onClick={this.props.handleClick}>CREATE</button>
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
        <button 
        className='tab'
        onClick={this.props.handleTabClick}>{this.props.message}</button>
    )
  }
}

class TodoItem extends React.Component {
  render() {
    return (
      <li>
        <label>
          <input 
            type="checkbox"
            checked={this.props.checked} 
            onChange={this.props.handleCheckClick(this.props.listId)} />
          {this.props.label}
        </label>
      </li>
    );
  }
}


class TodoNav extends React.Component {  
  render() {
    return (
      <div id="tabs">
        <Tab 
          message="TO DO" 
          handleTabClick={this.props.handleTabClick(tabEnum.TODO)} />
        <Tab 
          message="DONE" 
          handleTabClick={this.props.handleTabClick(tabEnum.DONE)} />
        <Tab 
          message="ALL" 
          handleTabClick={this.props.handleTabClick(tabEnum.ALL)} />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskInputText: '',
      selectedTab: tabEnum.TODO,
      todoList: []
    }

    this.handleTaskInput = this.handleTaskInput.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleCheckClick = this.handleCheckClick.bind(this);
  }
  render() {
    let itemList = this.state.todoList.map((item, listId) => {
      return {
        ...item,
        listId
      }
    })
    
    let todoList = itemList.filter(item => !item.checked);
    let doneList = itemList.filter(item => item.checked);
    let allListSize = todoList.length + doneList.length;
    
    switch (this.state.selectedTab) {
      case tabEnum.TODO:
        console.log('todo')
        itemList = todoList;
        break;

      case tabEnum.DONE:
        console.log('done')
        itemList = doneList;
        break;

      case tabEnum.ALL:
        console.log('all')
        // do nothing
        break;
    }

    let itemListComp = itemList.map((item) => {
      return (
        <TodoItem
          label={item.label}
          key={item.listId}
          listId={item.listId}
          checked={item.checked} 
          handleCheckClick={this.handleCheckClick} />
      )
    })
    
    return (
      <div>
        <div id="header">
          <span >To-Do List</span>
        </div>
        <TaskInput 
          handleTaskInput={this.handleTaskInput} 
          value={this.state.taskInputText}
          handleClick={this.handleCreateClick} />
              <div id="tabs">
        <Tab 
          message={`TO DO (${todoList.length})`} 
          handleTabClick={this.handleTabClick(tabEnum.TODO)} />
        <Tab 
          message={`DONE (${doneList.length})`}
          handleTabClick={this.handleTabClick(tabEnum.DONE)} />
        <Tab 
          message={`ALL (${allListSize})`} 
          handleTabClick={this.handleTabClick(tabEnum.ALL)} />
      </div>
        <ol>
          {itemListComp}
        </ol>
      </div>
    );
  }

  handleTaskInput(event) {
    this.setState({
      taskInputText: event.target.value
    });
  }

  handleTabClick(selectedTab) {
    if (this.state.selectedTab === selectedTab) return;
    return event => this.setState({selectedTab});
  }

  handleCreateClick(event) {
    const todoList = [...this.state.todoList]
    todoList.push({
      label: this.state.taskInputText,
      checked: false
    });
    console.log(todoList);
    this.setState({todoList});
  }

  handleCheckClick(listId) {
    return (event) => {
      let todoList = [...this.state.todoList];
      console.log(listId);
      console.log(todoList[listId]);
      todoList[listId].checked = !todoList[listId].checked;
      this.setState({todoList})
    };
  }
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
