import { useState } from "react";
import Board from "./Board";

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
        <h1>StudyHub</h1>
        <p>Your weekly study tasks in one place.</p>
      </header>

      <Board tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

