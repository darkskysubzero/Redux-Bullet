import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    userLoggedIn: false,
    currentUserId: -1,
    users: [
        { id: '0', name: 'John Wick', username: "johnwick", password: "12345" },
        { id: '1', name: 'Alin Sky', username: "alinsky", password: "12345" },
        { id: '2', name: 'Bruce Wayne', username: "brucewayne", password: "12345" }
    ]
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userLoggedIn = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUserId = action.payload;
        }
    }
})

export const selectAllUsers = (state) => state.users.users;
export const userLoggedIn = (state) => state.users.userLoggedIn;
export const currentUserId = (state) => state.users.currentUserId;
export const userActions = userSlice.actions;

export default userSlice.reducer;