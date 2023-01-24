import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
    {
        id: '1',
        title: 'Your soul is in mine, my soul is in yours',
        content: "Two souls are intertwined and totally compatible that they build a strong bond. it's much deeper than being just a couple; ",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            like: 0,
            dislike: 0,
            heart: 0
        },
        userId: "1"
    },
    {
        id: '2',
        title: 'Together...',
        content: "You and I. without an end — together?",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            like: 0,
            dislike: 0,
            heart: 0
        }
    }
]


const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        /*
        addPost: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title: title,
                        content: content,
                        date: new Date().toISOString(),
                        userId: userId
                    }
                }
            }
        },*/

        addPost: (state, action) => {
            state.push(action.payload);
        },

        addReaction: (state, action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }

    }
})

export const selectAllPosts = (state) => state.posts;
export const postActions = postsSlice.actions;
export default postsSlice.reducer;