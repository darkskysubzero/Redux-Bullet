import React, { useState } from 'react'
import { Modal } from "@mui/material";
import { BsFillPenFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from './postSlice';
import { nanoid } from '@reduxjs/toolkit';
import { selectAllUsers, userActions, userLoggedIn, currentUserId } from '../Users/usersSlice';

const AddPost = () => {

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const dispatch = useDispatch();

    const userIsLoggedIn = useSelector(userLoggedIn);
    const userLoggedInID = useSelector(currentUserId);
    const users = useSelector(selectAllUsers);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleOpen = () => {
        if (userIsLoggedIn) {
            setOpen(true);
        } else {
            setShowLoginForm(true);
        }

    }

    const handleClose = () => {
        setOpen(false);
    }

    const closeLoginForm = () => {
        setShowLoginForm(false);
    }

    const login = () => {
        if (username && password) {
            const usernameIndex = users.findIndex((user) => user.username === username);
            const passwordIndex = users.findIndex((user) => user.password === password);
            const userId = users[usernameIndex].id;

            if (usernameIndex !== -1) {
                if (passwordIndex !== -1) {
                    dispatch(userActions.login(true));
                    dispatch(userActions.setCurrentUser(userId));
                    const name = users[usernameIndex].name;
                    toast.success(`Welcome back, ${name}`, { toastId: "logged in success" });
                    setUsername("");
                    setPassword("");
                    closeLoginForm();
                } else {
                    toast.error("Invalid password!", { toastId: "invalid password" });
                }
            } else {
                toast.error("Invalid username!", { toastId: "invalid username" });
            }

        } else {
            toast.error("Please enter an input", { toastId: "invalid input" });
        }

    }

    const onTitleChange = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);
    const onUsernameChange = (e) => setUsername(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);


    const onPostClick = () => {
        if (title && content) {

            // IF USING PREPARE STATEMENT -------------------------
            // dispatch(postActions.addPost(title, content, "1"));


            const newPost = {
                id: nanoid(),
                title: title,
                content: content,
                date: new Date().toISOString(),
                userId: userLoggedInID,
                reactions: {
                    like: 0,
                    dislike: 0,
                    heart: 0
                }
            }

            dispatch(postActions.addPost(newPost));

            setTitle("");
            setContent("");
            handleClose();
            toast.success("Post added.", {
                toastId: 'success',
            });
        } else {
            toast.error("Invalid inputs.", {
                toastId: 'error',
            });
        }
    }

    return (
        <>
            <ToastContainer position="top-center" autoClose={500} hideProgressBar={true} />
            <BsFillPenFill onClick={handleOpen} />


            <Modal
                open={showLoginForm}
                onClose={closeLoginForm}
                className="modalwindow"
            >

                <div className="modalbox">
                    <input type="text" placeholder='Username' value={username} onChange={onUsernameChange} />
                    <input type="password" placeholder='Password' value={password} onChange={onPasswordChange} />
                    <div className="modalbuttons">
                        <button onClick={login}>Login</button>
                    </div>
                </div>
            </Modal>


            <Modal
                open={open}
                onClose={handleClose}
                className="modalwindow"
            >

                <div className="modalbox">
                    <p>Unknown</p>
                    <input type="text" placeholder='Title' value={title} onChange={onTitleChange} />
                    <textarea value={content} onChange={onContentChange} />
                    <div className="modalbuttons">
                        <button onClick={handleClose}>Close</button>
                        <button onClick={onPostClick} >Post</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AddPost