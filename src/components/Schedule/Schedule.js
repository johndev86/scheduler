import React from 'react';
import { Alert, Input} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import moment from 'moment';
import './Schedule.css';
import Calendar from '../Calendar/Calendar';
import Modal from '../Modal/Modal';
import Event from '../Event/Event';

class Schedule extends React.Component {
    constructor(props) {
        super(props);

        const now = moment();
        const startDate = moment([now.year(), now.month()]);
        const endDate = moment(startDate).endOf('month');
        
        this.state = {
            from: startDate.toDate(),
            to: endDate.toDate(),
            schedule: [],
            error: '',
            staffList: [],
            showEvent: false,
            eventId: 0,
            newDate: new Date(),
            calendarId: this.props.user.id,
            staffName: ''
        };
    }

    componentDidMount() {
        
        if (this.props.isSignedIn) {
            this.getSchedule();
            this.getStaffList();
        }
    }

    setError = (err) => {
        this.setState({error: err});
    }

    handleFromChange = (event) => {
        this.setState({from: event.target.value}, () => {
            this.getSchedule();
        });
    }

    handleToChange = (event) => {
        this.setState({to: event.target.value}, () => {
            this.getSchedule();
        });
    }

    handleCalendarChange = (event) => {
        const value = Number(event.target.value);
        const {id} = this.props.user;

        //get staff name of currently selected calendar
        const nameFilter = this.state.staffList.filter((e) => {
            return (e.user_id === value && value !== id);
        });

        const staffName = nameFilter.length > 0 ? nameFilter[0].name: ''
        
        this.setState({calendarId: value, staffName: staffName}, () => {
            this.getSchedule();
        });
    }

    showEventDialog = (eventId) => {
        
        this.setState({eventId: eventId, showEvent: true});
    }

    newEventDialog = (newDate) => {
        
        this.setState({eventId: 0, newDate: newDate, showEvent: true});
        
    }

    hideEventDialog = () => {
        
        this.setState({showEvent: false});
    }

    getSchedule = () => {
        
        let data = {};

        if (this.props.user.id !== this.state.calendarId) {
            data.staff_id = this.state.calendarId;
        }

        fetch(process.env.REACT_APP_API_URL + '/getschedule', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(resp => {
            if (resp === 'failed') {
                return Promise.reject('Failed to retrieve schedule');
            } else {
                return resp;
            }
        })
        .then(data => {
            if (data === 'nothing scheduled') {
                this.setState({schedule: [], error: 'No scheduled event'});
            } else {
                this.setState({schedule: this.normalizeData(data.appointments), error: ''});
            }
        })
        .catch(err => {
            this.setState({error: err});
        });
    }
    
    normalizeData = (data) => {
        let calendarData = [];
        data.forEach(e => {
            calendarData[e.appointment_id] = {
                id: e.appointment_id,
                type: e.type,
                pending: e.pending, 
                title: e.title,
                start: new Date(e.time_from),
                end: new Date(e.time_to),
                allDay: false,
                note: e.note,
                masked: e.masked,
                resource: null
            };
        });
        return calendarData;
    }

    //All staff
    getStaffList() {
        fetch(process.env.REACT_APP_API_URL+'/getstafflist', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(resp => {
            if (resp === 'failed') {
                return Promise.reject('Failed to retrieve staff list');
            } else {
                return resp;
            }
        })
        .then(data => {
            this.setState({staffList: data.staff});
        })
        .catch(err => {
            this.setState({error: err});
        });
    }

    calendarDropdown() {
        const {id} = this.props.user;

        let options = [];
        this.state.staffList.forEach(e => {
            if (e.user_id !== id) {
                options.push(<option key={e.user_id} value={e.user_id}>{e.name}'s Calendar</option>);
            }
        });

        return (
        <Input type="select" name="select" onChange={this.handleCalendarChange} id="calSelect" >
            <option key={id} value={id}>My Calendar</option>
            {options}
       </Input>
       );
    }

    render() {
        const {error, schedule, showEvent, newDate, eventId, calendarId, staffName} = this.state;
        const {isSignedIn, user} = this.props;

        const userIds = [Number(user.id)];
        
        if (userIds[0] !== calendarId) {
            userIds.push(calendarId);
        }
        
        let errDisplay = '';
        if (error && error.length > 0) {
            errDisplay = <Alert color="danger">
            {error}
            </Alert>;
        }
        
        const calendar = 
                    <div>
                        {showEvent && <Modal>
                            <Event hideEventDialog={this.hideEventDialog} userType={this.props.user.user_type} getSchedule={this.getSchedule} staffName={staffName} userIds={userIds} setError={this.setError} newDate={newDate} event={schedule[eventId]}/>
                        </Modal>}
                        
                        <div className="cal-select">
                        
                            View: {this.calendarDropdown()}
                        
                        </div>
                        <div id="calendarBox" className="calendar-box">
                            {errDisplay} 
                            <Calendar 
                            events={schedule} 
                            showEventDialog={this.showEventDialog} 
                            newEventDialog={this.newEventDialog} 
                            />
                        </div>
                    </div>

        

        let render = calendar;
        
        if (!isSignedIn) {
            render = <Redirect to="/" />;
        }

        return (
        <div>
            {render}
        </div>
        );
    }
}

export default Schedule;