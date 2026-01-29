import { useState } from 'react';
import styles from './TodoForm.module.css';

interface TodoFormProps {
  onAddTodo: (text: string, endDate: string) => void;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text, endDate);
      setText('');
      setEndDate('');
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.input}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        min={today}
        className={styles.dateInput}
      />
      <button type="submit" className={styles.button}>
        Add Todo
      </button>
    </form>
  );
}
