import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleTodo,
  selectTodos,
  addTodo,
  clearCompletedTodos,
  selectUncompletedTodosCount,
} from './todolist.slice';

function Todo(props) {
  const dispatch = useDispatch();

  return (
    <label>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={() => dispatch(toggleTodo(props.index))}
      />
      {props.name}
    </label>
  );
}

function Todolist() {
  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);
  const remainingTodosCount = useSelector(selectUncompletedTodosCount);
  const [todoName, setTodoName] = useState('');

  function dispatchAddTodo() {
    dispatch(addTodo(todoName));
    setTodoName('');
  }

  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={`test-${index}`}>
            <Todo index={index} name={todo.name} completed={todo.completed} />
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Faire la vaisselle..."
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
      />
      <button onClick={dispatchAddTodo}>Ajouter la tache</button>
      <button onClick={() => dispatch(clearCompletedTodos())}>
        Supprimer les todos faites
      </button>
      <p>Il reste encore {remainingTodosCount} todo(s)</p>
    </div>
  );
}

export default Todolist;
