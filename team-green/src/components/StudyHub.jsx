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
      <h1>Study Hub</h1>

      <Board
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
}
