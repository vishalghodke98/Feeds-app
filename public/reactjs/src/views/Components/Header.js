import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Header = () => {
    const [user, setUser] = useState(localStorage.getItem('UserData') ? JSON.parse(localStorage.getItem('UserData')) : '');
    return (
        <>
            <div className='header'>
                <div className='header_left'>
                    <h3 className='header_name'>FEED</h3>
                </div>
                <div className='header_input'>
                    <SearchIcon />
                    <input
                        placeholder='Search here....'
                        type='text'
                    />
                </div>
                <div className='header_center'>
                    <div className='header_option header_option_active'>
                        <HomeIcon fontSize='large' />
                    </div>
                    <div className='header_option'>
                        <FlagIcon fontSize='large' />
                    </div>
                    <div className='header_option'>
                        <SubscriptionsOutlinedIcon fontSize='large' />
                    </div>
                    <div className='header_option'>
                        <StorefrontOutlinedIcon fontSize='large' />
                    </div>
                    <div className='header_option'>
                        <SupervisedUserCircleIcon fontSize='large' />
                    </div>
                </div>
                <div className='header_right'>
                    <div className='header_info'>
                        <Avatar src={user.profile} />
                        <h4>{user.first_name} {user.last_name}</h4>
                    </div>
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                    <IconButton>
                        <ForumIcon />
                    </IconButton>
                    <IconButton>
                        <NotificationsActiveIcon />
                    </IconButton>
                    <IconButton>
                        <ExpandMoreIcon />
                    </IconButton>
                </div>
            </div>
        </>
    );
};

export default Header
