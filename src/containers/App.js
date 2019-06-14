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
    id: -1,
    name: '',
    email: '',
    description: '',
    user_type: '',
    profile_img: ''
  },
  loading: true
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
      .then(resp => {
        if (resp === 'unauthorized') {
          return Promise.reject('invalid token');
        } else {
          return resp;
        }
      })
      .then(data => {
        if (data && data.user_id) {
          this.loadUser(data);
        }
      })
      .catch((e)=>{
        window.sessionStorage.removeItem('token');
        this.setState({loading: false});
      })
    } else {
      this.setState({loading: false});
    }
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        description: user.description,
        user_type: user.user_type,
        profile_img: user.profile_img
      },
      isSignedIn: true,
      loading: false
    })
  }

  showProfile = () => {
    this.setState({isProfileOpen: true});
  }

  hideProfile = () => {
    this.setState({isProfileOpen: false});
  }

  signOut = () => {
    this.setState(initialState);
    this.setState({loading: false});
    window.sessionStorage.removeItem('token');
  }

  render() {
    const { isSignedIn, isProfileOpen, user, loading } = this.state;
    
    return (
      <Router>
      <div className="App">
        {isSignedIn && isProfileOpen && <Modal>
          <Profile loadUser={this.loadUser} user={user} hideProfile={this.hideProfile}></Profile>
        </Modal>}
        <Nav showProfile={this.showProfile} loading={loading} isSignedIn={isSignedIn}
        signOut={this.signOut} loadUser={this.loadUser}/>
        
        <Route path="/" exact component={Home} />
        <Route path="/staff" component={Staff} />
        <Route path="/about" component={About} />
        <Route path="/signin" render={() => 
          <Signin isSignedIn={isSignedIn} loadUser={this.loadUser} />
        } />
        <Route path="/register" component={Register}/>
        {!loading &&
        <Route path="/schedule" render={() => 
          <Schedule isSignedIn={isSignedIn} loading={loading} user={user}/>
        }/>}
      </div>
      </Router>
    );
  }
}

export default App;
