import React from 'react';
import './StoryReel.css';
import Story from './Story';
import ReactPlayer from 'react-player'

const StoryReel = (image, profileSrc, title) => {
    return (
        <div className='storyReel'>
            <Story
                image='https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                src='https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                title='New story'
            />
            <Story
                image='https://images.unsplash.com/photo-1599666505327-7758b44a9985?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                src='https://images.unsplash.com/photo-1595234235838-2fc8984bc651?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                title=''
            />
            <Story
                image='https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                src='https://img.freepik.com/free-photo/high-view-cup-coffee-table_23-2148251697.jpg?size=626&ext=jpg'
                title='vishal patil'
            />
            <Story
                image='https://images.unsplash.com/photo-1581091870598-36ce9bad5c77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                src='https://images.unsplash.com/photo-1531536871726-00b05fd4a644?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                title='vishal patil'
            />
            <Story
                image='https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                src='https://images.unsplash.com/photo-1521312706689-fbd93fd5af46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                title='vishal patil'
            />
        </div>
    )
}

export default StoryReel
