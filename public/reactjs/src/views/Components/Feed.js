import React, { useEffect, useState } from 'react';
import './Feed.css';
import StoryReel from './StoryReel';
import MessageSender from './MessageSender';
import Post from './Post';
import axios from '../../util/axios';

const Feed = () => {
    const [file, setFile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(localStorage.getItem('UserData') ? JSON.parse(localStorage.getItem('UserData')) : '');

    const handleGetPosts = () => {
        axios.get('/api/get_posts').then(response => {
            setPosts(response.data.reverse())
        }).catch(error => {
            console.log(error)
        });
    }

    useEffect(() => {
        handleGetPosts();
    }, [])

    const handleCreatePost = (data) => {
        axios.post('/api/create_post', data).then(response => {
            handleGetPosts();
        }).catch(error => {
            console.log(error)
        });
    }

    const handleLikeChange = (count, _id) => {
        let newPosts = [...posts];
        let index = newPosts.findIndex(obj => obj._id === _id);
        newPosts[index].likes = count;
        setPosts(newPosts)
        axios.put(`/api/update_post/${_id}`, newPosts[index]).then(response => {
            handleGetPosts();
        }).catch(error => {
            console.log(error)
        });
    }

    const handleUpdateComments = (data, _id) => {
        let newPosts = [...posts];
        let index = newPosts.findIndex(obj => obj._id === _id);
        newPosts[index].comments.push({ comment: data, user: `${user.first_name} ${user.last_name}` });
        setPosts(newPosts)
        axios.put(`/api/update_post/${_id}`, newPosts[index]).then(response => {
            handleGetPosts();
        }).catch(error => {
            console.log(error)
        });
    }

    console.log(posts)

    return (
        <div className='feed'>
            <StoryReel />
            <MessageSender
                handleCreatePost={(data) => handleCreatePost(data)}
            />
            {posts && posts.map((record) => {
                return <Post
                    id={record._id}
                    file={record.file}
                    comments={record.comments}
                    likes={record.likes}
                    profilePic={record.profile}
                    message={record.message}
                    timestamp={record.timestamp}
                    imgName='image'
                    username={record.user}
                    handleLikeChange={(count, _id) => handleLikeChange(count, _id)}
                    handleUpdateComments={(data, id) => handleUpdateComments(data, id)}
                />
            })}
        </div>
    )
}

export default Feed
