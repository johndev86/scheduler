import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './Signin.css';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    saveAuthTokenInSession = (token) => {
        window.sessionStorage.setItem('token', token);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_API_URL + '/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token && data.success === 'true') {
                fetch(process.env.REACT_APP_API_URL+'/profile', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': data.token
                    }
                })
                .then(response => response.json())
                .then(user => {
                    console.log(this.props);
                    this.props.loadUser(user);
                    this.saveAuthTokenInSession(data.token);
                    this.props.signIn();
                })
            }
        })
        .catch(err=>console.log(err));
    }

    render() {
        if (this.props.isSignedIn) {
            return <Redirect to="/" />;
        }
        return (
            <div className="login_form">
                
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                    <Label for="emailInput">Email</Label>
                    <Input type="email" name="email" id="emailInput" required value={this.state.email} onChange={this.handleEmailChange}  />
                    </FormGroup>
                    <FormGroup>
                    <Label for="passwordInput">Password</Label>
                    <Input type="password" name="password" id="passwordInput" required value={this.state.password} onChange={this.handlePasswordChange}/>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                <hr></hr>
                <p>Not registered? Register <Link to="/register">here</Link></p>
                
            </div>
        );
    }
}

export default Signin;