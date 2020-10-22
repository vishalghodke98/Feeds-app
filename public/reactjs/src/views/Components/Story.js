import React from 'react';
import './Story.css';
import Avatar from '@material-ui/core/Avatar';

const Story = ({ image, src, title }) => {
    return (
        <div style={{ backgroundImage: `url(${image})` }} className='story'>
            <Avatar src={src} className='story_avatar' />
            <h4>{title}</h4>

        </div>
    )
}

export default Story
