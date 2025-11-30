import React, { useState, useEffect } from 'react';

// Simple Icons components to avoid external deps
const IconFolder = ({ color = "currentColor" }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
);
const IconCheckCircle = ({ color = "currentColor" }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
const IconList = ({ color = "currentColor" }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
);
const IconPlus = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const App = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Review project proposal', completed: false, isExiting: false },
        { id: 2, text: 'Email marketing team', completed: true, isExiting: false },
        { id: 3, text: 'Update layout design', completed: false, isExiting: false },
        { id: 4, text: 'Sync with developers', completed: false, isExiting: false },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all'); // all, active, completed

    // Statistics
    const counts = {
        all: todos.length,
        active: todos.filter(t => !t.completed).length,
        completed: todos.filter(t => t.completed).length
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newTodo = {
            id: Date.now(),
            text: inputValue.trim(),
            completed: false,
            isExiting: false,
            isNew: true,
        };

        setTodos([newTodo, ...todos]);
        setInputValue('');

        setTimeout(() => {
            setTodos((currentTodos) =>
                currentTodos.map((t) => (t.id === newTodo.id ? { ...t, isNew: false } : t))
            );
        }, 400);
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isExiting: true } : todo
            )
        );
        setTimeout(() => {
            setTodos((currentTodos) => currentTodos.filter((t) => t.id !== id));
        }, 300);
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <>
          <button
              onClick={async () => {
                  try {
                      await window.saucer.call("toggle_devtools", []);
                      console.log("Toggled DevTools permission");
                  } catch (e) {
                      console.error(e);
                  }
              }}
          >
              Toggle DevTools
          </button>
        </>
    );
};

export default App;
