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
            <style>{`
        :root {
          --sidebar-bg: #1c1c1e; /* Darker grey */
          --main-bg: #000000;    /* Pure black or very dark grey */
          --border-color: #38383a;
          --text-primary: #ffffff;
          --text-secondary: #98989d;
          --accent-color: #ffd60a; /* Apple Notes Yellow */
          --item-hover: rgba(255, 255, 255, 0.08);
          --selection-bg: rgba(255, 214, 10, 0.15); /* Yellow tint */
        }

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
          background-color: var(--main-bg);
          color: var(--text-primary);
          height: 100vh;
          overflow: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .app-container {
          display: flex;
          height: 100vh;
          width: 100vw;
        }

        /* --- SIDEBAR --- */
        .sidebar {
          width: 260px;
          min-width: 260px;
          background-color: var(--sidebar-bg);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          padding: 20px 0 10px 0;
          box-sizing: border-box;
        }

        .sidebar-header {
          padding: 0 16px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .app-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .nav-list {
          list-style: none;
          padding: 0 10px;
          margin: 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          margin-bottom: 2px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          color: var(--text-primary);
          transition: background-color 0.15s;
        }

        .nav-item:hover {
          background-color: var(--item-hover);
        }

        .nav-item.active {
          background-color: var(--selection-bg);
          color: var(--accent-color);
        }

        .nav-icon {
          margin-right: 10px;
          display: flex;
          align-items: center;
          opacity: 0.8;
        }

        .nav-item.active .nav-icon {
          opacity: 1;
          color: var(--accent-color);
        }

        .nav-count {
          margin-left: auto;
          color: var(--text-secondary);
          font-size: 13px;
        }

        .nav-item.active .nav-count {
          color: var(--accent-color);
          opacity: 0.8;
        }

        /* --- MAIN CONTENT --- */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          background-color: var(--main-bg);
          position: relative;
        }

        /* Header / Toolbar area */
        .main-header {
          height: 52px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          border-bottom: 1px solid var(--border-color);
        }
        
        .header-title {
          font-size: 18px;
          font-weight: 700;
        }

        .add-button-mobile {
          display: none; /* Only if we did mobile */
        }

        /* Scrollable List */
        .todo-list-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
        }

        .todo-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .todo-item {
          display: flex;
          align-items: flex-start;
          padding: 12px 14px;
          margin-bottom: 8px;
          border-radius: 8px;
          background-color: rgba(44, 44, 46, 0.4); /* Subtle item bg */
          transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
          cursor: default;
          position: relative;
        }

        .todo-item:hover {
          background-color: rgba(44, 44, 46, 0.8);
        }

        /* Animations */
        .todo-item.is-new {
          animation: slideDown 0.3s ease-out forwards;
        }

        .todo-item.is-exiting {
          opacity: 0;
          transform: translateX(-10px);
          pointer-events: none;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Custom Checkbox (Yellow Accent) */
        .checkbox-container {
          margin-right: 14px;
          margin-top: 2px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
        }

        .custom-checkbox {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1.5px solid #8e8e93; /* Unchecked grey */
          background-color: transparent;
          transition: all 0.2s ease;
          position: relative;
        }

        .custom-checkbox.checked {
          background-color: var(--accent-color);
          border-color: var(--accent-color);
          box-shadow: 0 0 4px rgba(255, 214, 10, 0.4);
        }

        .custom-checkbox::after {
          content: '';
          position: absolute;
          top: 45%;
          left: 50%;
          width: 9px;
          height: 5px;
          border-left: 1.5px solid #1c1c1e; /* Checkmark color (dark) */
          border-bottom: 1.5px solid #1c1c1e;
          transform: translate(-50%, -60%) rotate(-45deg) scale(0);
          transition: transform 0.2s cubic-bezier(0.5, 1.5, 0.5, 1);
        }

        .custom-checkbox.checked::after {
          transform: translate(-50%, -60%) rotate(-45deg) scale(1);
        }

        .todo-text-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .todo-text {
          font-size: 15px;
          line-height: 1.4;
          color: var(--text-primary);
          transition: color 0.2s;
        }

        .todo-text.completed {
          color: var(--text-secondary);
          text-decoration: none; /* Native apps usually just dim text */
        }
        
        .todo-date {
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .delete-btn {
          opacity: 0;
          background: none;
          border: none;
          color: #ff453a; /* System Red */
          cursor: pointer;
          padding: 4px;
          transition: opacity 0.2s;
          margin-left: 8px;
        }

        .todo-item:hover .delete-btn {
          opacity: 1;
        }

        /* Floating Input Bar at Bottom (like iOS/macOS reminders sometimes) or Top */
        .input-area {
          padding: 20px 24px;
          /* border-top: 1px solid var(--border-color); */
          /* background-color: var(--main-bg); */
        }

        .input-wrapper {
          position: relative;
        }

        .new-todo-input {
          width: 100%;
          background-color: #2c2c2e;
          border: none;
          border-radius: 10px;
          padding: 12px 16px 12px 42px;
          font-size: 15px;
          color: white;
          outline: none;
          box-sizing: border-box;
          transition: box-shadow 0.2s;
        }

        .new-todo-input:focus {
          box-shadow: 0 0 0 2px rgba(255, 214, 10, 0.3); /* Yellow glow */
        }
        
        .new-todo-input::placeholder {
          color: #8e8e93;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #8e8e93;
          pointer-events: none;
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 60%;
          color: var(--text-secondary);
        }
        
        .empty-text {
          margin-top: 10px;
          font-size: 15px;
        }

        /* Scrollbar customization */
        ::-webkit-scrollbar {
          width: 8px;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: rgba(255,255,255,0.2);
          border-radius: 4px;
        }
      `}</style>

            <div className="app-container">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <span className="app-title">TODOs</span>
                        {/* Using a fake '...' icon for visual accuracy */}
                        <span style={{color: 'var(--accent-color)', fontSize: '18px'}}>•••</span>
                    </div>

                    <ul className="nav-list">
                        <li
                            className={`nav-item ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            <span className="nav-icon"><IconFolder color={filter === 'all' ? '#ffd60a' : 'currentColor'} /></span>
                            <span>Todo</span>
                            <span className="nav-count">{counts.all}</span>
                        </li>

                        <li
                            className={`nav-item ${filter === 'active' ? 'active' : ''}`}
                            onClick={() => setFilter('active')}
                        >
                            <span className="nav-icon"><IconList color={filter === 'active' ? '#ffd60a' : 'currentColor'} /></span>
                            <span>Active</span>
                            <span className="nav-count">{counts.active}</span>
                        </li>

                        <li
                            className={`nav-item ${filter === 'completed' ? 'active' : ''}`}
                            onClick={() => setFilter('completed')}
                        >
                            <span className="nav-icon"><IconCheckCircle color={filter === 'completed' ? '#ffd60a' : 'currentColor'} /></span>
                            <span>Completed</span>
                            <span className="nav-count">{counts.completed}</span>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="main-content">
                    <header className="main-header">
            <span className="header-title" style={{color: 'var(--accent-color)'}}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </span>
                    </header>

                    <div className="todo-list-container">
                        {filteredTodos.length === 0 ? (
                            <div className="empty-state">
                                <span style={{ opacity: 0.3 }}><IconFolder /></span>
                                <span className="empty-text">No Notes</span>
                            </div>
                        ) : (
                            <ul className="todo-list">
                                {filteredTodos.map((todo) => (
                                    <li
                                        key={todo.id}
                                        className={`todo-item ${todo.isExiting ? 'is-exiting' : ''} ${todo.isNew ? 'is-new' : ''}`}
                                    >
                                        <div className="checkbox-container" onClick={() => toggleTodo(todo.id)}>
                                            <div className={`custom-checkbox ${todo.completed ? 'checked' : ''}`}></div>
                                        </div>

                                        <div className="todo-text-wrapper" onClick={() => toggleTodo(todo.id)}>
                      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                        {todo.text}
                      </span>
                                            <span className="todo-date">
                        {new Date(todo.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} No additional text
                      </span>
                                        </div>

                                        <button
                                            className="delete-btn"
                                            onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="input-area">
                        <form onSubmit={handleSubmit} className="input-wrapper">
                            <span className="input-icon"><IconPlus /></span>
                            <input
                                type="text"
                                className="new-todo-input"
                                placeholder="New Todo"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                autoFocus
                            />
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};

export default App;