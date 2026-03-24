import { createSlice } from "@reduxjs/toolkit";
import type { TaskState } from "../types/state";

const initialState: TaskState ={
    tasks: [],
    filter: "ALL",
    searchQuery: "",
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers:{
    
  }
})
