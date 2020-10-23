import React, { Component } from 'react'
import { FormControl, Card, InputLabel, FormHelperText, Input, Button, Typography, FormGroup } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import { withStyles } from '@material-ui/styles';
import './Login.css'
import axios from '../../util/axios';
import ReactBSAlert from "react-bootstrap-sweetalert";
import { verifyEmail, verifyAlpha, verifyLength } from '../../util/helper';

const styles = theme => ({

});

const SIGNUP_FIELDS = (state) => [
    {
        resultState: state.firstNameState,
        placeholder: 'First Name',
        name: 'firstName',
        type: 'text',
        condition: 'alpha',
        errorMsg: 'Please valid first name.'
    },
    {
        resultState: state.lastNameState,
        placeholder: 'Last Name',
        name: 'lastName',
        type: 'text',
        condition: 'alpha',
        errorMsg: 'Please valid last name.'
    },
    {
        resultState: state.emailState,
        placeholder: 'Email Id',
        name: 'email',
        type: 'text',
        condition: 'email',
        errorMsg: 'Please enter a valid  email id.'
    },
    {
        resultState: state.passwordState,
        placeholder: 'Password',
        name: 'password',
        type: 'text',
        condition: 'length',
        errorMsg: 'Please enter a valid  password.'
    }
]


const LOGIN_FIELDS = (state) => [
    {
        resultState: state.emailState,
        placeholder: 'Email Id',
        name: 'email',
        type: 'text',
        condition: 'email',
        errorMsg: 'Please enter a valid  email id.'
    },
    {
        resultState: state.passwordState,
        placeholder: 'Password',
        name: 'password',
        type: 'text',
        condition: 'length',
        errorMsg: 'Please enter a valid  password.'
    }
]

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
            firstNameState: '',
            lastNameState: '',
            emailState: '',
            passwordState: ''
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

    change = (event, stateName, type) => {
        switch (type) {
            case "length":
                if (event.target.value.length >= 6) {
                    this.setState({ [stateName + "State"]: "has-success" });
                } else {
                    this.setState({ [stateName + "State"]: "has-danger" });
                }
                break;
            case "email":
                if (verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "has-success" });
                } else {
                    this.setState({ [stateName + "State"]: "has-danger" });
                }
                break;
            case "alpha":
                if (verifyAlpha(event.target.value)) {
                    this.setState({ [stateName + "State"]: "has-success" });
                } else {
                    this.setState({ [stateName + "State"]: "has-danger" });
                }
                break;
            default:
                break;
        }
        this.setState({ [stateName]: event.target.value });
    };

    isValidated = () => {
        if (
            (this.state.firstNameState === "has-success") &&
            (this.state.lastNameState === "has-success") &&
            (this.state.emailState === "has-success") &&
            (this.state.passwordState === "has-success")
        ) {
            return true;
        } else {
            if (this.state.firstNameState !== "has-success") {
                this.setState({ firstNameState: "has-danger" });
            }
            if (this.state.lastNameState !== "has-success") {
                this.setState({ lastNameState: "has-danger" });
            }
            if (this.state.emailState !== "has-success") {
                this.setState({ emailState: "has-danger" });
            }
            if (this.state.passwordState !== "has-success") {
                this.setState({ passwordState: "has-danger" });
            }
            return false;
        }
    };

    handleSignUp = () => {
        this.isValidated();
        if (!this.state.profile) return this.handleResponsePopUp('Please Sselect profile', 'Error', false, true);
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
            this.setState({ signup: false, login: true });
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
                            {SIGNUP_FIELDS && SIGNUP_FIELDS(this.state).map(field => {
                                return <FormControl className='form_control'>
                                    <InputLabel style={{ color: field.resultState === "has-danger" ? 'red' : '' }} htmlFor="my-input">{field.placeholder}</InputLabel>
                                    <Input
                                        onChange={e => this.change(e, field.name, field.condition, field.value)}
                                        id="my-input"
                                        aria-describedby="my-helper-text"
                                        name={field.name}
                                        value={this.state[field.name]}
                                        type={field.type}
                                    />
                                    {field.resultState === "has-danger" ? (
                                        <FormHelperText style={{ color: 'red' }} id="my-helper-text">{field.errorMsg}</FormHelperText>
                                    ) : null}
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
                            {LOGIN_FIELDS && LOGIN_FIELDS(this.state).map(field => {
                                return <FormControl className='form_control'>
                                    <InputLabel style={{ color: field.resultState === "has-danger" ? 'red' : '' }} htmlFor="my-input">{field.placeholder}</InputLabel>
                                    <Input
                                        onChange={e => this.change(e, field.name, field.condition, field.value)}
                                        id="my-input"
                                        aria-describedby="my-helper-text"
                                        name={field.name}
                                        value={this.state[field.name]}
                                        type={field.type}
                                    />
                                    {field.resultState === "has-danger" ? (
                                        <FormHelperText style={{ color: 'red' }} id="my-helper-text">{field.errorMsg}</FormHelperText>
                                    ) : null}
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