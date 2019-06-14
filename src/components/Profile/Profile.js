import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './Profile.css';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            description: this.props.user.description,
            profile_img: this.props.user.profile_img,
            email: this.props.user.email
        };
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }

    handleProfileImageChange = (event) => {
        this.setState({profile_img: event.target.value});
    }

    onSaveProfile = (event) => {
        event.preventDefault();
        const {name, description, profile_img} = this.state;

        if (profile_img && profile_img.length > 0) {
            //Save to AWS S3 bucket
        }
        
        fetch(process.env.REACT_APP_API_URL+'/profile', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                name: name,
                description: description,
                profile_img: profile_img
            })
        })
        .then(response => response.json())
        .then(resp => {
            if (resp === 'success') {
                this.props.loadUser(Object.assign(this.props.user, this.state));
                this.props.hideProfile();
            }
        });
    }

    render() {
        return (

            <div className="profile-modal">
                
                <Form onSubmit={this.onSaveProfile}>
                    <div className="modal-close" onClick={this.props.hideProfile}>&times;</div>
                    <h4>Your profile - {this.state.email}</h4>
                    <br></br>
                    <FormGroup>
                    <Label for="nameInput">Name</Label>
                    <Input type="name" name="name" id="nameInput" value={this.state.name} onChange={this.handleNameChange}  />
                    </FormGroup>
                    <FormGroup>
                    <Label for="descInput">Description</Label>
                    <Input type="textarea" name="description" id="descInput" value={this.state.description} onChange={this.handleDescriptionChange} />
                    </FormGroup>
                    <FormGroup>
                    <Label for="profileImg">Profile Image</Label>
                    <Input type="file" name="profileImg" id="profileImg"  />
                    <FormText color="muted">
                        Upload a picture as your profile image.
                    </FormText>
                    </FormGroup>
                    <Button>Submit</Button>{' '}
                    <Button onClick={this.props.hideProfile}>Cancel</Button>
                </Form>
                
            </div>
        );
    }
}

export default Profile;