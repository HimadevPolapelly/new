import React, { useState } from 'react';
import './App.css'; // Import CSS file

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    if (editIndex !== null) {
      const newTodos = [...todos];
      newTodos[editIndex] = inputValue;
      setTodos(newTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, inputValue]);
    }
    setInputValue('');
  };

  const handleEdit = (index) => {
    setInputValue(todos[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    if (editIndex === index) {
      setEditIndex(null);
      setInputValue('');
    }
  };

  return (
    <div className="todo-container">
      <h1>Task Manager Application</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add task..."
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit">{editIndex !== null ? 'Edit' : 'Add'}</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {editIndex === index ? (
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
              />
            ) : (
              <span>{todo}</span>
            )}
            {editIndex === index ? (
              <button onClick={handleSubmit} className="save-btn">Save</button>
            ) : (
              <button onClick={() => handleEdit(index)} className="edit-btn">Edit</button>
            )}
            <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
