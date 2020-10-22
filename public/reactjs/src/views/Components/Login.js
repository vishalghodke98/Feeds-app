import React, { Component } from 'react'
import { FormControl, Card, InputLabel, FormHelperText, Input, Button, Typography, FormGroup } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import { withStyles } from '@material-ui/styles';
import './Login.css'
import axios from '../../util/axios';
import ReactBSAlert from "react-bootstrap-sweetalert";

const styles = theme => ({

});

export class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            login: false,
            signup: true,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            profile: '',
        };
    }

    handleLoginFrom = () => {
        this.setState({
            login: true,
            signup: false
        });
    }

    handleSignUpFrom = () => {
        this.setState({
            login: false,
            signup: true
        });
    }

    handleSetValues = (type, value) => {
        console.log(type, value)
        switch (type) {
            case 'email':
                this.setState({ email: value });
                break;
            case 'password':
                this.setState({ password: value });
                break;
            case 'firstName':
                this.setState({ firstName: value });
            case 'lastName':
                this.setState({ lastName: value });
                break;
        };
    }

    handleSignUp = () => {
        const postData = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            password: this.state.password,
            email: this.state.email,
            profile: this.state.profile
        }

        const url = '/api/signup';
        axios.post(url, postData).then(response => {
            let localStorageData = response.data.data;
            let json = JSON.stringify(localStorageData);
            localStorage.setItem('UserData', json);
            return this.handleResponsePopUp(response.data.message, 'Success', true, false);
        }).catch(error => {
            return this.handleResponsePopUp(error.response.data.message, 'Error', false, true);
        });
    };


    handleLogin = () => {
        const postData = {
            password: this.state.password,
            email: this.state.email
        }
        console.log(postData)
        const url = '/api/signin';
        axios.post(url, postData).then(response => {
            let login = { login: true };
            let user = JSON.stringify(login);
            localStorage.setItem('LoginData', user);
            this.props.handleViewChange();
            return this.handleResponsePopUp(response.data.message, 'Success', true, false);
        }).catch(error => {
            return this.handleResponsePopUp(error.response.data.message, 'Error', false, true);
        });
    }

    // Pop-Ups for response in Modals
    handleResponsePopUp = (message, title, success, error) => {
        this.setState({
            alert: (
                <ReactBSAlert
                    success={success}
                    error={error}
                    style={{ display: "block", marginTop: "250px" }}
                    title={title}
                    onConfirm={() => this.handleModalClose()}
                    confirmBtnBsStyle="success"
                    btnSize="md"
                >
                    {message}
                </ReactBSAlert>
            )
        });
    }

    handleModalClose = () => {
        this.setState({
            alert: null
        });
    };

    handleFileChange = (event) => {
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
                this.setState({ profile: fileLoadedEvent.target.result });
            };
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
        };
    }

    render() {
        const { classes } = this.props;
        const { login, signup } = this.state;
        const loginFields = [
            {
                inputLabel: 'Please Enter Email',
                formHelperText: 'Please enter email.',
                type: 'email',
            },
            {
                inputLabel: 'Password',
                formHelperText: 'Please enter last name',
                type: 'password'
            }
        ]

        const signupFields = [
            {
                inputLabel: 'First Name',
                formHelperText: 'Please enter first name.',
                type: 'firstName'
            },
            {
                inputLabel: 'Last Name',
                formHelperText: 'Please enter last name',
                type: 'lastName'
            },
            {
                inputLabel: 'Please Enter Email',
                formHelperText: 'Please enter email.',
                type: 'email',
            },
            {
                inputLabel: 'Password',
                formHelperText: 'Please enter last name',
                type: 'password'
            },
        ]

        return (
            <>
                {this.state.alert}
                {<div className='login_card'>
                    <Card className='card'>
                        <div class='change_viewbuttons'>
                            <Button onClick={() => this.handleSignUpFrom()} className='btn_left' variant="contained" color="secondary">Sign UP</Button>
                            <Button onClick={() => this.handleLoginFrom()} className='btn_right' variant="contained" color="primary">Sign In</Button>
                        </div>
                        <hr />
                        {this.state.signup ? <div className='form_inputes'>
                            {signupFields && signupFields.map(field => {
                                return <FormControl className='form_control'>
                                    <InputLabel htmlFor="my-input">{field.inputLabel}</InputLabel>
                                    <Input onChange={(event) => this.handleSetValues(field.type, event.target.value)} id="my-input" aria-describedby="my-helper-text" />
                                    <FormHelperText id="my-helper-text">{field.formHelperText}</FormHelperText>
                                </FormControl>
                            })}
                            <FormGroup style={{ padding: '10px', margin: '10px', with: '60%', border: '2px grey dotted', alignItems: 'center' }}>
                                <lable>Select Profile</lable>
                                <Input type='file'
                                    className='messageSender_fileSelecter'
                                    onChange={(e) => this.handleFileChange(e)}
                                />
                            </FormGroup>
                        </div> : null}
                        {this.state.login ? <div className='form_inputes'>
                            {loginFields && loginFields.map(field => {
                                return <FormControl className='form_control'>
                                    <InputLabel htmlFor="my-input">{field.inputLabel}</InputLabel>
                                    <Input onChange={(event) => this.handleSetValues(field.type, event.target.value)} id="my-input" aria-describedby="my-helper-text" />
                                    <FormHelperText id="my-helper-text">{field.formHelperText}</FormHelperText>
                                </FormControl>
                            })}
                        </div> : null}
                        {this.state.login ? <div className='forgot_pass_link'><div>Forgot password ?</div></div> : null}
                        <div className='btn_submit'>
                            <Button onClick={() => this.state.signup ? this.handleSignUp() : this.handleLogin()} variant="contained" color="primary">Submit</Button>
                        </div>
                    </Card>
                </div>}
            </>
        )
    }
}

export default withStyles(styles)(login);