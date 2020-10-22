import React, { useState } from 'react';
import { Avatar, Input, Button } from '@material-ui/core';
import './MessageSender.css';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

const MessageSender = ({ handleCreatePost }) => {

    const [input, setInput] = useState('');
    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState(null);
    const [user, setUser] = useState(localStorage.getItem('UserData') ? JSON.parse(localStorage.getItem('UserData')) : '');

    const handleSubmut = () => {
        const postData = {
            file: file,
            user: `${user.first_name} ${user.last_name}`,
            like: '0',
            message: input,
            profile: user.profile
        }
        handleCreatePost(postData)
    };

    const handleFileChange = (event) => {
        let selectedFile = event.target.files;
        /*Chaeck file type*/
        //Check File is not Empty
        if (selectedFile.length > 0) {
            // Select the very first file from list
            let fileToLoad = selectedFile[0];
            // FileReader function for read the file.
            let fileReader = new FileReader();
            // Onload of file read the file content
            fileReader.onload = (fileLoadedEvent) => {
                setFile(fileLoadedEvent.target.result)
                setFileName(selectedFile[0].name)
            };
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
        };
    }


    return (
        <div className='messageSender'>
            <div className='messageSender_top'>
                <Avatar src='' />
                <form>
                    <input
                        value={input}
                        placeholder='Whats on your mind....'
                        onChange={(e) => setInput(e.target.value)}
                        type='text'
                        className='messageSender_input'
                    />
                    <Input type='file'
                        className='messageSender_fileSelecter'
                        onChange={(e) => handleFileChange(e)}
                    />
                    <button
                        type='submit'
                        onClick={handleSubmut}></button>
                </form>
                <Button color='success' className='submit_button' style={{ color: '#2e81f4', backgroundColor: '2e81f4' }} onClick={handleSubmut}>submit</Button>
            </div>
            <div className='messageSender_bottom'>
                <div className='messageSender_option'>
                    <VideocamIcon style={{ color: 'red' }} />
                    <h3>Live Video</h3>
                </div>
                <div className='messageSender_option'>
                    <PhotoLibraryIcon style={{ color: 'green' }} />
                    <h3>Photo/Videos</h3>
                </div>
                <div className='messageSender_option'>
                    <InsertEmoticonIcon style={{ color: 'orange' }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
        </div>
    )
}

export default MessageSender
