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
          <input type="text" 
            onChange={this.props.handleTaskInput} 
            value={this.props.value} />
        </label>
        <button onClick={this.props.handleClick}>CREATE</button>
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
      <div>
        <Tab 
          message="To-Do" 
          handleTabClick={this.props.handleTabClick(tabEnum.TODO)} />
        <Tab 
          message="Done" 
          handleTabClick={this.props.handleTabClick(tabEnum.DONE)} />
        <Tab 
          message="All" 
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
    
      
    
    switch (this.state.selectedTab) {
      case tabEnum.TODO:
        console.log('todo')
        itemList = itemList.filter(item => !item.checked);
        break;

      case tabEnum.DONE:
        console.log('done')
        itemList = itemList.filter(item => item.checked);
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
        <h1>To-Do List</h1>
        <TaskInput 
          handleTaskInput={this.handleTaskInput} 
          value={this.state.taskInputText}
          handleClick={this.handleCreateClick} />
        <TodoNav handleTabClick={this.handleTabClick} />
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
    // violating the DRY principle... I'm just too good for it :)
    const todoList = [...this.state.todoList]
    todoList.push({
      label: this.state.taskInputText,
      checked: false
    });
    // todoList.push(
    //   <TodoItem
    //     label={this.state.taskInputText}
    //     key={todoList.length}
    //     listId={todoList.length}
    //     checked={false} 
    //     handleCheckClick={this.handleCheckClick} />
    // );
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
