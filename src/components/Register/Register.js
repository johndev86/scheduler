import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            error: '',
            registered: false
        };
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_API_URL+'/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(res => {
            if (res === 'failed') {
                return Promise.reject('Email already registered');
            } else {
                this.setState({registered: true});
            }
        })
        .catch((err) => {
            this.setState({error: err});
        });
    }

    render() {
        let errDisplay = '';
        if (this.state.error && this.state.error.length > 0) {
            errDisplay = <Alert color="danger">
            {this.state.error}
            </Alert>;
        }

        return this.state.registered ? 
            (
            <div className="register_form">
                <Alert color="success">
                User has been registered. Please sign in <Link to="/signin">here</Link>
                </Alert>
            </div>
            )
            : 
            (
            
            <div className="register_form">
                
                <Form onSubmit={this.handleSubmit}>
                    {errDisplay}
                    <FormGroup>
                    <Label for="emailInput">Email</Label>
                    <Input type="email" name="email" id="emailInput" required value={this.state.email} onChange={this.handleEmailChange}  />
                    </FormGroup>
                    <FormGroup>
                    <Label for="nameInput">Name</Label>
                    <Input type="name" name="name" id="nameInput" required value={this.state.name} onChange={this.handleNameChange}  />
                    </FormGroup>
                    <FormGroup>
                    <Label for="passwordInput">Password</Label>
                    <Input type="password" name="password" id="passwordInput" required value={this.state.password} onChange={this.handlePasswordChange}/>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default Register;