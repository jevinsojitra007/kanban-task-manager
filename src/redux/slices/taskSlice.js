import { createSlice } from "@reduxjs/toolkit";

const savedTasks = () => {
  try {
    const serializedState = localStorage.getItem("tasks");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
};

const initialState = {
  tasks: savedTasks(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTaskStatus: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.status }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, updateTask, deleteTask, updateTaskStatus } =
  taskSlice.actions;
export default taskSlice.reducer;
