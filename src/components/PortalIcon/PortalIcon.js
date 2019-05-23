import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import './PortalIcon.css';

class PortalIcon extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }
    
    render() {
        return (
            <div>
                
                <Dropdown direction="down" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    
                    <DropdownToggle 
                    tag="span"
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                    className="profile-icon" 
                    >
                            <img
                            src="http://tachyons.io/img/logo.jpg"
                            alt="avatar" 
                            className="profile-icon" 
                            />
                    </DropdownToggle>
                    
                    <DropdownMenu 
                    className="portal-menu"
                    
                    >
                        <DropdownItem onClick={this.props.showProfile}>View Profile</DropdownItem>
                        <DropdownItem><Link to="/schedule">View Schedule</Link></DropdownItem>
                        <DropdownItem onClick={this.props.signOut}>Sign out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }
}

export default PortalIcon;