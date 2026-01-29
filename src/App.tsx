import { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  id: string;
  text: string;
  createdDate: string;
  endDate: string;
  status: 'pending' | 'completed';
}

interface Snackbar {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

function TodoForm({ onAddTodo }: { onAddTodo: (text: string, endDate: string) => void }) {
  const [text, setText] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      const dateTimeString = endTime ? `${endDate}T${endTime}:00` : endDate;
      onAddTodo(text, dateTimeString);
      setText('');
      setEndDate('');
      setEndTime('');
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <input
        type="text"
        placeholder="Add a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={inputStyles}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        min={today}
        style={inputStyles}
      />
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        style={inputStyles}
      />
      <button type="submit" style={buttonStyles}>
        Add Todo
      </button>
    </form>
  );
}

function TodoItem({
  todo,
  onStatusChange,
  onDelete,
}: {
  todo: Todo;
  onStatusChange: (id: string, status: 'pending' | 'completed') => void;
  onDelete: (id: string) => void;
}) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = dateString.includes('T') ? date.toLocaleTimeString(undefined, timeOptions) : '';
    
    return formattedTime ? `${formattedDate} ${formattedTime}` : formattedDate;
  };

  const isWithinOneHour = () => {
    if (!todo.endDate) return false;
    const now = new Date();
    const dueDate = new Date(todo.endDate);
    const timeDifference = dueDate.getTime() - now.getTime();
    const oneHourInMs = 60 * 60 * 1000;
    
    return timeDifference > 0 && timeDifference <= oneHourInMs;
  };

  return (
    <div
      style={{
        ...todoItemStyles,
        borderLeft: `4px solid ${todo.status === 'completed' ? '#4CAF50' : '#ff9800'}`,
        backgroundColor: todo.status === 'completed' ? '#f1f8f4' : isWithinOneHour() ? '#ffcccb' : '#fff',
      }}
    >
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: '0 0 8px 0',
            fontSize: '16px',
            fontWeight: 500,
            textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
            color: todo.status === 'completed' ? '#999' : '#000',
          }}
        >
          {todo.text}
        </p>
        <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#666' }}>
          <span>Created: {formatDate(todo.createdDate)}</span>
          <span>Due: {formatDate(todo.endDate)}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginLeft: '15px' }}>
        <select
          value={todo.status}
          onChange={(e) => onStatusChange(todo.id, e.target.value as 'pending' | 'completed')}
          style={selectStyles}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={() => onDelete(todo.id)} style={deleteButtonStyles}>
          Delete
        </button>
      </div>
    </div>
  );
}

function Snackbar({ snackbars, onClose }: { snackbars: Snackbar[]; onClose: (id: number) => void }) {
  return (
    <div style={snackbarContainerStyles}>
      {snackbars.map((snackbar) => (
        <div
          key={snackbar.id}
          style={{
            ...snackbarStyles,
            backgroundColor:
              snackbar.type === 'success'
                ? '#4CAF50'
                : snackbar.type === 'error'
                ? '#f44336'
                : '#2196F3',
          }}
        >
          <span>{snackbar.message}</span>
          <button
            onClick={() => onClose(snackbar.id)}
            style={snackbarCloseButtonStyles}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ todos }: { todos: Todo[] }) {
  const completed = todos.filter((t) => t.status === 'completed').length;
  const total = todos.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div style={progressContainerStyles}>
      <div style={progressBarWrapperStyles}>
        <div style={{ ...progressBarStyles, width: `${percentage}%` }} />
      </div>
      <p style={progressLabelStyles}>
        {completed} of {total} completed ({percentage}%)
      </p>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        console.error('Failed to parse todos from localStorage');
        return [];
      }
    }
    return [];
  });

  const [snackbars, setSnackbars] = useState<Snackbar[]>([]);

  const showSnackbar = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setSnackbars((prev) => [...prev, { message, type, id }]);
    setTimeout(() => {
      setSnackbars((prev) => prev.filter((s) => s.id !== id));
    }, 3000);
  };

  const closeSnackbar = (id: number) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  };

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, endDate: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      createdDate: new Date().toISOString().split('T')[0],
      endDate,
      status: 'pending',
    };
    setTodos([...todos, newTodo]);
    showSnackbar(`✓ Todo "${text}" added successfully!`, 'success');
  };

  const updateTodoStatus = (id: string, status: 'pending' | 'completed') => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
    const statusText = status === 'completed' ? 'completed' : 'marked as pending';
    showSnackbar(`✓ Todo ${statusText}!`, 'success');
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    showSnackbar(`✓ Todo deleted!`, 'success');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        backgroundColor: '#fff',
        borderRight: '1px solid #e0e0e0',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        overflowY: 'auto',
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#333' }}>Progress</h2>
        <ProgressBar todos={todos} />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Snackbar snackbars={snackbars} onClose={closeSnackbar} />
        <h1>Todo Progress App</h1>
        <TodoForm onAddTodo={addTodo} />
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '20px' }}>
          {todos.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999' }}>No todos yet. Add one to get started!</p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onStatusChange={updateTodoStatus}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Inline styles
const appContainerStyles: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const formStyles: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
};

const inputStyles: React.CSSProperties = {
  flex: 1,
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '14px',
};

const buttonStyles: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '600',
};

const todoItemStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px',
  marginBottom: '10px',
  border: '1px solid #e0e0e0',
  borderRadius: '6px',
};

const selectStyles: React.CSSProperties = {
  padding: '6px 8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '13px',
  cursor: 'pointer',
};

const deleteButtonStyles: React.CSSProperties = {
  padding: '6px 10px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '600',
};

const progressContainerStyles: React.CSSProperties = {
  marginBottom: '30px',
  padding: '15px',
  backgroundColor: '#fafafa',
  borderRadius: '8px',
};

const progressBarWrapperStyles: React.CSSProperties = {
  width: '100%',
  height: '24px',
  backgroundColor: '#e0e0e0',
  borderRadius: '12px',
  overflow: 'hidden',
  marginBottom: '10px',
};

const progressBarStyles: React.CSSProperties = {
  height: '100%',
  backgroundColor: '#4CAF50',
  transition: 'width 0.3s ease',
  borderRadius: '12px',
};

const progressLabelStyles: React.CSSProperties = {
  margin: 0,
  fontSize: '14px',
  fontWeight: '600',
  color: '#333',
  textAlign: 'center',
};

const snackbarContainerStyles: React.CSSProperties = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const snackbarStyles: React.CSSProperties = {
  padding: '12px 16px',
  borderRadius: '4px',
  color: 'white',
  fontSize: '14px',
  fontWeight: '500',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minWidth: '250px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  animation: 'slideIn 0.3s ease-in-out',
};

const snackbarCloseButtonStyles: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '18px',
  cursor: 'pointer',
  marginLeft: '12px',
  padding: '0',
};

export default App;