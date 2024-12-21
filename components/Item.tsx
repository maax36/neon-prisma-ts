import styles from '@/styles/Item.module.css'

type TodoItem = {
  id: number;
  text: string;
};

type TodoProps = {
  data: TodoItem[];
  onDelete: (id: number) => void;
};

export function Item({ data, onDelete }: TodoProps) {
    return (
      <ul>
        {data.map(({ id, text }) => (
          <li key={id} className={styles.list__item}>
            <span className={styles.list}>{text}</span>
            <button 
              onClick={() => onDelete(id)} 
              style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    );
  }
  