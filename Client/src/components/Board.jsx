export default function Board({ tasks }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const dayMap = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
  };

  return (
    <div className="board">
      <div className="board-grid">
        {days.map((day) => (
          <div key={day} className="day-column">
            <h3>{day}</h3>

            {tasks
              .filter((task) => dayMap[task.day] === day)
              .map((task) => (
                <div key={task.id} className="task-card">
                  {task.link ? (
                    <a
                      href={task.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {task.title}
                    </a>
                  ) : (
                    <span>{task.title}</span>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
