import React from 'react'
import { useDispatch } from 'react-redux';
import { postActions } from './postSlice';


const emojis = {
    like: '👍',
    dislike: '👎',
    heart: "❤️"
}


const ReactionButtons = (props) => {

    const { post } = props;
    const dispatch = useDispatch();



    const buttons = Object.entries(emojis).map(([name, emoji]) => {
        return <button
            key={name}
            type="button"
            onClick={() => dispatch(postActions.addReaction({
                postId: post.id,
                reaction: name
            }))}
        >{emoji} {post.reactions[name]}</button>
    })

    return <div>{buttons}</div>
}

export default ReactionButtons