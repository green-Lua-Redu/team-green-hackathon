export default function Board({ tasks }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div className="board">
      <div className="board-grid">
        {days.map(day => (
          <div key={day} className="day-column">
            <h3>{day}</h3>

            {tasks
              .filter(task => task.day === day)
              .map(task => (
                <div key={task.id} className="task-card">
                  {task.title}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
