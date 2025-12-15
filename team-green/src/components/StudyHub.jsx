import { useState } from "react";
import Board from "./Board";
import AddTaskForm from "./AddTaskForm";


// Initial tasks are placeholders for UI development
const initialTasks = [
  { id: 1, day: "Mon", title: "Finish resume" },
  { id: 2, day: "Tue", title: "Mock interview" },
  { id: 3, day: "Fri", title: "Submit application" },
];

export default function StudyHub() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div className="study-hub">
      <header className="study-hub-header">
        <h1>classCloud</h1>
        <p>Your weekly study tasks in one place.</p>
      </header>
      <AddTaskForm setTasks={setTasks} />

      <Board tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

