import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../redux/slices/taskSlice";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const TaskModal = ({ closeModal, editingTask }) => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    status: "To Do",
    dueDate: "",
    assignedUser: { name: "", avatar: "" },
  });

  useEffect(() => {
    if (editingTask) {
      setTaskData(editingTask);
    } else {
      setTaskData({
        id: uuidv4(),
        title: "",
        description: "",
        status: "To Do",
        dueDate: "",
        assignedUser: { name: "", avatar: "" },
      });

      axios
        .get("https://randomuser.me/api/")
        .then((response) => {
          const user = response.data.results[0];
          setTaskData((prev) => ({
            ...prev,
            assignedUser: {
              name: `${user.name.first} ${user.name.last}`,
              avatar: user.picture.medium,
            },
          }));
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [editingTask]);

  const handleSaveTask = () => {
    if (!taskData.title || !taskData.description || !taskData.dueDate) return;

    if (editingTask) {
      dispatch(updateTask(taskData));
    } else {
      dispatch(addTask(taskData));
    }
    closeModal();
  };

  return (
    <div className="modal-backdrop bg-gradient-to-r from-[#e0e0e0] via-[#f8f8f8] to-[#f5f5f5]">
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editingTask ? "Edit Task" : "Add Task"}</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Title"
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              />
              <textarea
                className="form-control mb-2"
                placeholder="Description"
                value={taskData.description}
                onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              />
              <input
                type="date"
                className="form-control mb-2"
                value={taskData.dueDate}
                onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
              />
              <select
                className="form-control mb-2"
                value={taskData.status}
                onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveTask}>
                Save Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
