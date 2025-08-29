// JavaScript for Admin Panel

document.addEventListener('DOMContentLoaded', function() {

    /* initialize the external events
    -----------------------------------------------------------------*/
    const containerEl = document.getElementById('external-events');
    if (containerEl) {
        new FullCalendar.Draggable(containerEl, {
            itemSelector: '.fc-event',
            eventData: function(eventEl) {
                return {
                    title: eventEl.innerText.trim()
                }
            }
        });
    }

    /* initialize the calendar
    -----------------------------------------------------------------*/
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar
            drop: function(info) {
                // for this mock, we don't need to remove the element after drop
                console.log("Dropped event on calendar:", info.dateStr);
            },
            events: [
                { title: 'Slitter Maintenance', start: new Date() }
            ]
        });

        calendar.render();
    }
});
