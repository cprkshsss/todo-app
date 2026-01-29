import styles from './ProgressBar.module.css';
import { Todo } from './TodoItem';

interface ProgressBarProps {
  todos: Todo[];
}

export function ProgressBar({ todos }: ProgressBarProps) {
  const completed = todos.filter(t => t.status === 'completed').length;
  const total = todos.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.barWrapper}>
        <div
          className={styles.bar}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className={styles.label}>
        {completed} of {total} completed ({percentage}%)
      </p>
    </div>
  );
}
