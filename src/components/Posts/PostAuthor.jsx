import React from 'react'
import { useSelector } from "react-redux";
import { selectAllUsers } from "../Users/usersSlice";

const PostAuthor = (props) => {
    const { userId } = props;
    const allUsers = useSelector(selectAllUsers);
    const authorFound = allUsers.find(user => user.id === userId);
    return <span>by {authorFound ? authorFound.name : "Unknown"}</span>
}

export default PostAuthor