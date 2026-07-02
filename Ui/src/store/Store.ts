import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./TaskStore"
export const store = configureStore({
  reducer: { counter: taskReducer },
})
// export storere

