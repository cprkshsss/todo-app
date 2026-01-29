import styles from './TodoItem.module.css';

export interface Todo {
  id: string;
  text: string;
  createdDate: string;
  endDate: string;
  status: 'pending' | 'completed';
}

interface TodoItemProps {
  todo: Todo;
  onStatusChange: (id: string, status: 'pending' | 'completed') => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onStatusChange, onDelete }: TodoItemProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className={`${styles.item} ${styles[todo.status]}`}>
      <div className={styles.content}>
        <p className={styles.text}>{todo.text}</p>
        <div className={styles.dates}>
          <span>Created: {formatDate(todo.createdDate)}</span>
          <span>Due: {formatDate(todo.endDate)}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <select
          value={todo.status}
          onChange={(e) => onStatusChange(todo.id, e.target.value as 'pending' | 'completed')}
          className={styles.statusSelect}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={() => onDelete(todo.id)}
          className={styles.deleteBtn}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
