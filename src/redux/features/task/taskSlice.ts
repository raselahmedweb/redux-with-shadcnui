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
  tasks: [],
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
  },
});

export const { addTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.todos.tasks;

export default taskSlice.reducer;
