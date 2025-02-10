import React, { useState, useEffect } from "react";
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
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          const extractedUsers = parsedTasks
            .map((task) => task.assignedUser)
            .filter((user, index, self) => user && self.findIndex(u => u.name === user.name) === index); // Remove duplicates
          setUsers(extractedUsers);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        setUsers([]);
      }
    }
  }, []);

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
    task.title.toLowerCase().includes(searchTask.toLowerCase()) &&
    (selectedUser ? task.assignedUser?.name === selectedUser : true)
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
        <select
          className="form-select w-25 mx-2"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">All Users</option>
          {users.length > 0 ? (
            users.map((user, index) => (
              <option key={index} value={user.name}>
                {user.name}
              </option>
            ))
          ) : (
            <option disabled>No users found</option>
          )}
        </select>
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
