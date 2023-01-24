import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPosts } from './postSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from "./TimeAgo";
import ReactionButtons from './ReactionButtons';

const AllPosts = () => {

    const allPosts = useSelector(selectAllPosts);

    const postList = allPosts.map(post => {
        return (<div key={post.id} className="post">
            <p>{post.title}</p>
            <p>{post.content}</p>
            <div className='info'>
                <TimeAgo timestamp={post.date} />
                <PostAuthor userId={post.userId} />
            </div>
            <div className="reactions">
                {post.reactions && <ReactionButtons post={post} />}
            </div>
        </div>)
    })

    return <div className="posts">{postList}</div>
}

export default AllPosts