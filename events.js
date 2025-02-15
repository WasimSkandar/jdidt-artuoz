document.addEventListener('DOMContentLoaded', () => {
    // Sample events data - In production, this would come from an API
    const events = [
        {
            id: 1,
            title: 'مهرجان الربيع السنوي',
            date: '2024-03-15',
            time: '16:00',
            location: 'الحديقة المركزية',
            description: 'انضموا إلينا في مهرجان الربيع السنوي مع العديد من الأنشطة والفعاليات العائلية'
        },
        {
            id: 2,
            title: 'ورشة عمل للأطفال',
            date: '2024-03-20',
            time: '10:00',
            location: 'المركز الثقافي',
            description: 'ورشة عمل فنية للأطفال من عمر 6-12 سنة'
        },
        {
            id: 3,
            title: 'لقاء مجتمعي',
            date: '2024-03-25',
            time: '18:30',
            location: 'قاعة الاجتماعات',
            description: 'لقاء مفتوح لمناقشة احتياجات المجتمع والمشاريع المستقبلية'
        }
    ];

    let currentDate = new Date();
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const eventsList = document.querySelector('.events-list');

    // Initialize calendar and events
    updateCalendar();
    displayUpcomingEvents();

    // Add month navigation
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Update month display
        const monthName = new Date(year, month, 1).toLocaleString('ar-SY', { month: 'long', year: 'numeric' });
        currentMonthElement.textContent = monthName;

        // Clear calendar
        calendarGrid.innerHTML = '';

        // Add day headers
        const weekDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        weekDays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add blank cells for days before start of month
        for (let i = 0; i < firstDay; i++) {
            const blankDay = document.createElement('div');
            blankDay.className = 'calendar-day empty';
            calendarGrid.appendChild(blankDay);
        }

        // Add days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = events.filter(event => event.date === dateStr);
            
            if (dayEvents.length > 0) {
                dayCell.classList.add('has-events');
                dayCell.setAttribute('data-events', dayEvents.length);
            }
            
            dayCell.textContent = day;
            calendarGrid.appendChild(dayCell);
        }
    }

    function displayUpcomingEvents() {
        // Clear events list
        eventsList.innerHTML = '';
        
        // Sort events by date
        const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Display only upcoming events
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcomingEvents = sortedEvents.filter(event => new Date(event.date) >= today);
        
        upcomingEvents.forEach(event => {
            const eventCard = createEventCard(event);
            eventsList.appendChild(eventCard);
        });
    }

    function createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'event-card';
        
        card.innerHTML = `
            <div class="event-date">
                <span class="day">${new Date(event.date).getDate()}</span>
                <span class="month">${new Date(event.date).toLocaleString('ar-SY', { month: 'short' })}</span>
            </div>
            <div class="event-details">
                <h4>${event.title}</h4>
                <p class="event-time"><i class="fas fa-clock"></i> ${event.time}</p>
                <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                <p class="event-description">${event.description}</p>
                <button class="btn btn-primary">سجل الآن</button>
            </div>
        `;
        
        return card;
    }
});
