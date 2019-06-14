import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './Calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment);

const eventPropGetter = (event) => {
  return {className: event.pending ? "cal-pending " : "cal-confirmed "};
}

const Calendar = ({events, showEventDialog, newEventDialog}) => (

    <BigCalendar
      localizer={localizer}
      events={events}
      selectable={true}
      views={['month', 'day', 'agenda']}
      onSelectEvent={(e)=>showEventDialog(e.id)}
      onSelectSlot={(slotInfo)=>newEventDialog(slotInfo.slots[0])}
      startAccessor="start"
      endAccessor="end"
      eventPropGetter={eventPropGetter}
    />
  
);

export default Calendar;