import { useState } from "react";

export default function AddTaskForm({ setTasks }) {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("Monday");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    const newMaterial = {
      title,
      category: "manual",
      default_day: day,
    };

    try {
      const res = await fetch("http://localhost:3001/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMaterial),
      });

      const saved = await res.json();

      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: saved.id,
          title: saved.title,
          day: saved.default_day || "Monday",
          link: saved.default_link,
        },
      ]);

      setTitle("");
      setDay("Monday");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a study task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select value={day} onChange={(e) => setDay(e.target.value)}>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}
