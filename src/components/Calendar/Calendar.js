import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './Calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment);

const eventPropGetter = (event) => {
  //style here to override "selected" date styling
  let style;

  if (event.masked) {
    style = {
      backgroundColor: "#b0b5b0",
      color: "black"
    }
  } else {
    style = event.pending ? 
    {
      backgroundColor: "#e5ff00",
      color: "black"
    }
    :
    {
      backgroundColor: "#00ff22",
      color: "black"
    }
  }

  return {style: style};
}

const Calendar = ({events, showEventDialog, newEventDialog}) => (

    <BigCalendar
      localizer={localizer}
      events={events}
      selectable={true}
      views={['month', 'day', 'agenda']}
      onSelectEvent={(e)=>{
        if (e.masked !== true) {
          showEventDialog(e.id);
        }
      }}
      onSelectSlot={(slotInfo)=>newEventDialog(slotInfo.slots[0])}
      startAccessor="start"
      endAccessor="end"
      eventPropGetter={eventPropGetter}
    />
  
);

export default Calendar;