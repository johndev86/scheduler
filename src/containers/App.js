import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../components/Home/Home';
import About from '../components/About/About';
import Staff from '../components/Staff/Staff';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Nav from '../components/Nav/Nav';
import Profile from '../components/Profile/Profile';
import Modal from '../components/Modal/Modal';
import Schedule from '../components/Schedule/Schedule';

const initialState = {
  isProfileOpen: false,
  isSignedIn: false,
  user: {
    name: '',
    email: '',
    description: '',
    user_type: '',
    profile_img: ''
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch(process.env.REACT_APP_API_URL+'/profile', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if (data && data.user_id) {
          this.loadUser(data);
          this.signIn();
        }
      })
    }
  }

  loadUser = (user) => {
    this.setState({
      user: {
        name: user.name,
        email: user.email,
        description: user.description,
        user_type: user.user_type,
        profile_img: user.profile_img
      }
    })
  }

  showProfile = () => {
    this.setState({isProfileOpen: true});
  }

  hideProfile = () => {
    this.setState({isProfileOpen: false});
  }

  signIn = () => {
    this.setState({isSignedIn: true});
  }

  signOut = () => {
    this.setState(initialState);
    window.sessionStorage.removeItem('token');
  }

  render() {
    const { isSignedIn, isProfileOpen, user } = this.state;
    return (
      <Router>
      <div className="App">
        {isSignedIn && isProfileOpen && <Modal>
          <Profile loadUser={this.loadUser} user={user} hideProfile={this.hideProfile}></Profile>
        </Modal>}
        <Nav showProfile={this.showProfile} isSignedIn={isSignedIn} signIn={this.signIn} 
        signOut={this.signOut} loadUser={this.loadUser}/>
        
        <Route path="/" exact component={Home} />
        <Route path="/staff" component={Staff} />
        <Route path="/about" component={About} />
        <Route path="/signin" render={() => 
          <Signin isSignedIn={isSignedIn} signIn={this.signIn} loadUser={this.loadUser} />
        } />
        <Route path="/register" component={Register}/>
        <Route path="/schedule" component={Schedule}/>
      </div>
      </Router>
    );
  }
}

export default App;
