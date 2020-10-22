import React from 'react';
import './Widget.css';

const Widget = () => {
    return (
        <div className='widget'> 
            <iframe
            src='https://phrase.com/blog/posts/top-10-react-blogs-you-need-to-follow-now/'
            width='340'
            height='1500'
            style={{border : 'none', overflow : 'hidden'}}
            scrolling='no'
            allowTransparency='true'
            allow='encrypted-media'
            >

            </iframe>
        </div>
    )
}

export default Widget
