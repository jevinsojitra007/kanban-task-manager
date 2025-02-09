import React from "react";
import TaskCard from "./TaskCard";

const KanbanColumn = ({ status, tasks, handleDrop, allowDrop, openModal }) => {
  return (
    <div className="col-md-4" onDragOver={allowDrop} onDrop={(e) => handleDrop(e, status)}>
      <div className="p-3 bg-light rounded shadow-sm">
        <h2 className="text-uppercase text-center">{status}</h2>
        <div className="d-grid gap-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} openModal={openModal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
