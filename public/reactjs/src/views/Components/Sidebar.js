import React, { useState } from 'react';
import './Sidebar.css';
import SidebarRow from './SidebarRow';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import StorefrontIcon from '@material-ui/icons/Storefront';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';




const Sidebar = () => {
    const [user, setUser] = useState(localStorage.getItem('UserData') ? JSON.parse(localStorage.getItem('UserData')) : '');
    return (
        <div className='sidebar'>
            <SidebarRow
                src={user.profile}
                title={user.first_name + ' ' + user.last_name}
            />
            <SidebarRow
                src=''
                title='COVOID-19 Information Center'
                Icon={LocalHospitalIcon}
            />
            <SidebarRow
                src=''
                title='Pages'
                Icon={EmojiFlagsIcon}
            />
            <SidebarRow
                src=''
                title='friends'
                Icon={PeopleIcon}
            />
            <SidebarRow
                src=''
                title='Massenger'
                Icon={ChatIcon}
            />
            <SidebarRow
                src=''
                title='Marketplace'
                Icon={StorefrontIcon}
            />
            <SidebarRow
                src=''
                title='Videos'
                Icon={VideoLibraryIcon}
            />
            <SidebarRow
                src=''
                title='More'
                Icon={ExpandMoreOutlinedIcon}
            />

        </div>
    )
}

export default Sidebar
