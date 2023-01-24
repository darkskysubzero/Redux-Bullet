import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../components/Posts/postSlice";
import usersReducer from "../components/Users/usersSlice";

export const store = configureStore({
    reducer: {
        posts: postReducer,
        users: usersReducer,
    }
})