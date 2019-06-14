import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import DateTime from 'react-datetime';
import './Event.css';

class Event extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id: 0,
            title: '',
            type: 'other',
            start: new Date(),
            end: new Date(),
            pending: true,
            note: ''
        }
    }

    componentDidMount() {
        const {event, newDate} = this.props;
        if (event) {
            this.setState({
                id: event.id,
                title: event.title,
                type: event.type,
                start: event.start,
                end: event.end,
                pending: event.pending,
                note: event.note
            });
        } else {
            this.setState({
                start: newDate,
                end: newDate
            });
        }
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value});
    }

    handleNoteChange = (event) => {
        this.setState({note: event.target.value});
    }

    handleTypeChange = (event) => {
        this.setState({type: event.target.value});
    }

    handleStartChange = (datetime) => {
        this.setState({start: datetime});
    }

    handleEndChange = (datetime) => {
        this.setState({end: datetime});
    }

    handlePendingChange = (pending) => {
        this.setState({pending: pending});
    }

    onSaveEvent = (event) => {
        event.preventDefault();
        const {title, type, start, end, pending, note, id} = this.state;
        let data = {
            title: title,
            appointment_type: type,
            time_from: start,
            time_to: end,
            pending: pending,
            note: note,
            user_ids: this.props.userIds,
        }

        if (id > 0) {
            data.appointment_id = id;
        }
        
        fetch(process.env.REACT_APP_API_URL+'/setappointment', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(resp => {
            this.props.hideEventDialog();
            if (resp !== 'success') {
                this.props.setError('Failed to create/update event: ', resp);
            } else {
                this.props.getSchedule();
            }
        });
    }

    render() {
        
        const {title, type, start, end, note, pending} = this.state;
        console.log('from', start, 'to', end);
        const statusColor = pending ? "event-pending" : "event-confirmed";

        return (
            <div className={"event-modal " + statusColor}>
                {this.props.event ? 
                <h3>Edit Event - {title}</h3> :
                <h3>New Event</h3>
                }
                
                <Form onSubmit={this.onSaveEvent}>
                    <FormGroup row>
                        <Label for="titleInput" sm={1}>Title: </Label>
                        <Col sm={11}>
                            <Input type="text" required name="titleInput" id="titleInput" value={title} onChange={this.handleTitleChange}  />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="startInput" sm={1}>Start: </Label>
                        <Col sm={5}>
                        <DateTime name="startInput" id="startInput" value={start} onChange={this.handleStartChange} />
                        </Col><br></br>
                        <Label for="endInput" sm={1}>End: </Label>
                        <Col sm={5}>
                        <DateTime name="endInput" id="endInput" value={end} onChange={this.handleEndChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="eventType" sm={3}>Event Type: </Label>
                        <Col sm={7}>
                        <Input type="select" name="eventType" id="eventType" value={type} onChange={this.handleTypeChange}>
                            <option value="intro">Intro</option>
                            <option value="training">Training</option>
                            <option value="other">Other</option>
                        </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="noteInput" sm={1}>Note: </Label>
                        <Col sm={11}>
                        <Input type="textarea" name="noteInput" id="noteInput" value={note} onChange={this.handleNoteChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup tag="fieldset" row>
                        <legend className="col-form-label col-sm-2">Status: </legend>
                        <Col sm={10} className="radio-group">
                            <FormGroup check>
                            <Label check>
                                <Input type="radio" name="pending" checked={pending} onChange={() => this.handlePendingChange(true)}/>{' '}
                                Pending
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                            <Label check>
                                <Input type="radio" name="pending" checked={!pending} onChange={() => this.handlePendingChange(false)}/>{' '}
                                Confirmed
                            </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <Button>Submit</Button>{' '}
                    <Button onClick={this.props.hideEventDialog}>Cancel</Button>{' '}
                    <Button color="Danger">Delete</Button>
                </Form>
            </div>
        )
    }
}

export default Event;