import React, { useEffect, useState } from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from '../../util/axios';
import ReactPlayer from 'react-player';

const Post = ({ profilePic, file, message, timestamp, likes, imgName, username, comments, handleUpdateComments, id, handleLikeChange }) => {
    const [comment, setComment] = useState(false);
    const [comment_message, setCommentMessage] = useState('');
    const setStateComment = (e) => {
        setCommentMessage(e.target.value)
    }

    const handleChangeCommentView = () => {
        setComment(!comment);
    }

    const handleComment = (data, id, e) => {
        e.preventDefault();
        handleUpdateComments(data, id)
        setCommentMessage('');
    }

    const handleChangeLike = (count, _id) => {
        let like = parseInt(count)
        console.log("likes", 4 + 1)
        handleLikeChange(like + 1, _id);
    }

    return (
        <div className='post'>
            <div className='post_top'>
                <Avatar src={profilePic} className='post_avatar' />
                <div className='post_topInfo'>
                    <h3>{username}</h3>
                    <p>{timestamp}</p>
                </div>
            </div>
            <div className='post_image'>
                <img className='post_file' src={file} alt='data' />
            </div>
            <div className='post_bottom'>
                <p>{message}</p>
            </div>
            {comment && comment ? <div className='posts_comments'>
                <div className='commnet_body'>
                    {comments && comments?.map(record => {
                        return <div>
                            <p className='comment_user'>{record.user}</p>
                            <p className='commnet'>{record.comment}</p>
                        </div>
                    })}
                </div>
                <form className='comment_bottom'>
                    <input
                        className='comment_input'
                        value={comment_message}
                        onChange={e => setStateComment(e)} placeholder='Type a comment here...' type='text' />
                    <button className='comment_button' onClick={(e) => handleComment(comment_message, id, e)} type='submit'>Send a message</button>
                </form>
            </div> : null}
            <div className='post_options'>
                <div className='post_option'>
                    <ThumbUpIcon onClick={() => handleChangeLike(likes, id)} />
                    <p>{likes} Like</p>
                </div>
                <div className='post_option' onClick={() => handleChangeCommentView()}>
                    <ChatBubbleOutlineIcon />
                    <p>Comment</p>
                </div>
                <div className='post_option'>
                    <NearMeIcon />
                    <p>Share</p>
                </div>
                <div className='post_option'>
                    <AccountCircleIcon />
                    <ExpandMoreIcon />
                </div>

            </div>
        </div >
    );
}

export default Post
