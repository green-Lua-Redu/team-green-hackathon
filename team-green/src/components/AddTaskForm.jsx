import { useState } from "react";

export default function AddTaskForm({ setTasks }) {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("Mon");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      day,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);

    setTitle("");
    setDay("Mon");
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a study task"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <select
        value={day}
        onChange={e => setDay(e.target.value)}
      >
        <option value="Mon">Mon</option>
        <option value="Tue">Tue</option>
        <option value="Wed">Wed</option>
        <option value="Thu">Thu</option>
        <option value="Fri">Fri</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}
