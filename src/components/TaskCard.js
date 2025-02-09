import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/slices/taskSlice";

const TaskCard = ({ task, openModal }) => {
  const dispatch = useDispatch();

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  return (
    <div
      className="task-card p-4 text-left bg-white shadow-sm rounded-lg d-flex flex-column gap-2 border position-relative"
      draggable
      onDragStart={handleDragStart}
      onClick={() => openModal(task)}
      style={{
        cursor: "grab",
        transition: "box-shadow 0.2s ease-in-out",
      }}
      title="Click to edit"
    >
      <h6 className="fw-bold text-primary mb-1">{task.title}</h6>
      <p className="text-muted small mb-1">{task.description}</p>
      <p className="small mb-2">
        <b>Due:</b> {task.dueDate}
      </p>
      <div className="d-flex align-items-center gap-2">
        {task.assignedUser.avatar && (
          <img
            src={task.assignedUser.avatar}
            alt="User"
            className="rounded-circle border"
            width="32"
            height="32"
          />
        )}
        <span className="small">{task.assignedUser.name}</span>
      </div>
      <button
        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle"
        title="Delete Task"
        style={{
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          lineHeight: "1",
          border: "none",
          opacity: "0.7",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = "1")}
        onMouseLeave={(e) => (e.target.style.opacity = "0.7")}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteTask(task.id));
        }}
      >
        &#10005;
      </button>
    </div>
  );
};

export default TaskCard;
