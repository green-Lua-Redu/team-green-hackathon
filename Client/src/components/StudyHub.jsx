import { useEffect, useState } from "react";
import Board from "./Board";
import AddTaskForm from "./AddTaskForm";

export default function StudyHub() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/materials")
      .then((res) => res.json())
      .then((data) => {
        const formattedTasks = data.map((m) => ({
          id: m.id,
          day: "Mon", // default for now
          title: m.title,
        }));

        setTasks(formattedTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching materials:", error);
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
      <Board tasks={tasks} setTasks={setTasks} />
    </div>
  );
}