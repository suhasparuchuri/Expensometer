import { configureStore } from '@reduxjs/toolkit'
import globalReducer from "./slice"


export const store = configureStore({
  reducer: {
    global:globalReducer
  },
})