import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import Board from './Board';

export default function StudyHub() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/materials')
      .then((res) => res.json())
      .then((data) => {
        const formattedTasks = data.map((m) => ({
          id: m.id,
          title: m.title,
          day: m.default_day || 'Monday',
          link: m.default_link,
        }));

        setTasks(formattedTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching materials:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="study-hub">
      <header className="study-hub-header">
        <h1>classCloud</h1>
        <p>Your weekly study tasks in one place.</p>
      </header>

      {loading && <p>Loading tasks...</p>}

      <AddTaskForm setTasks={setTasks} />
      <Board tasks={tasks} />
    </div>
  );
}
