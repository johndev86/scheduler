import React from 'react';
import { Alert } from 'reactstrap';
import moment from 'moment';

class Schedule extends React.Component {
    constructor() {
        super();
        
        this.state = {
            from: moment().subtract(1, 'M'),
            to: moment(),
            schedule: {},
            error: ''
        }
    }

    componentDidMount() {
        const {from, to} = this.state;
        this.setState({schedule: this.getSchedule(from, to)});
    }

    handleFromChange = (event) => {
        this.setState({from: event.target.value});
    }

    handleToChange = (event) => {
        this.setState({to: event.target.value});
    }

    getSchedule = (from, to) => {
        fetch(process.env.REACT_APP_API_URL + '/schedule', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            from: from,
            to: to
        })
        .then(response => response.json())
        .then(resp => {
            if (resp === 'failed') {
                return Promise.reject('Failed to retrieve schedule');
            }
        })
        .then(data => {
            this.setState({schedule: data});
        })
        .catch(err => {
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

        return (
        <div>
            {errDisplay}
            {this.state.Schedule}
        </div>
        );
    }
}

export default Schedule;