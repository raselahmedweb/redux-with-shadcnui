import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  tasks: ITask[];
  filter: "all" | "low" | "medium" | "high";
}

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;

const createTask = (taskData: DraftTask): ITask => {
  return { id: nanoid(), isCompleted: false, ...taskData };
};

const initialState: InitialState = {
  tasks: [
    {
      id: "123",
      isCompleted: false,
      title: "Repo",
      description: "Create a github repo for assign ment 4",
      dueDate: "2025-07-04T21:00:00.000Z",
      priority: "high",
    },
    {
      id: "0q6-f9VpVeLjOJmpQgiUQ",
      isCompleted: false,
      title: "Book Library",
      description: "Create a Book management frontend and backend application",
      dueDate: "2025-07-04T21:00:00.000Z",
      priority: "medium",
    },
  ],
  filter: "all",
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, actions: PayloadAction<DraftTask>) => {
      const taskData = createTask(actions.payload);
      state.tasks.push(taskData);
    },
    toggleCompleteState: (state, actions: PayloadAction<string>) => {
      state.tasks.forEach((task) =>
        task.id === actions.payload
          ? (task.isCompleted = !task.isCompleted)
          : task
      );
    },
    deleteTask: (state, actions: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== actions.payload);
    },
    updateTask: (state, actions: PayloadAction<ITask>) => {
      console.log(actions.payload);
      state.tasks.forEach((task) =>
        task.id === actions.payload.id
          ? (task.title = actions.payload.title) &&
            (task.description = actions.payload.description) &&
            (task.dueDate = actions.payload.dueDate) &&
            (task.isCompleted = actions.payload.isCompleted) &&
            (task.priority = actions.payload.priority)
          : task
      );
    },
  },
});

export const { addTask, toggleCompleteState, deleteTask, updateTask } =
  taskSlice.actions;

export const selectTasks = (state: RootState) => state.todos.tasks;

export default taskSlice.reducer;
