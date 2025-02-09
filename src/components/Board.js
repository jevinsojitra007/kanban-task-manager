import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import KanbanColumn from "./Column";
import TaskModal from "./TaskModal";
import { updateTaskStatus } from "../redux/slices/taskSlice";

const KanbanBoard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTask, setSearchTask] = useState("");

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  const allowDrop = (e) => e.preventDefault();

  const openModal = (task = null) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setShowModal(false);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTask.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search tasks by title..."
          value={searchTask}
          onChange={(e) => setSearchTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => openModal()}>
          + Add Task
        </button>
      </div>

      <div className="row g-4">
        {["To Do", "In Progress", "Done"].map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={filteredTasks.filter((task) => task.status === status)}
            handleDrop={handleDrop}
            allowDrop={allowDrop}
            openModal={openModal}
          />
        ))}
      </div>
      {showModal && (
        <TaskModal showModal={showModal} closeModal={closeModal} editingTask={editingTask} />
      )}
    </div>
  );
};

export default KanbanBoard;
