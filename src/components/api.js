export const getEventsData = async () => {
  try {
    const userToken = 'UrlO57bGhMq7QoEavKNlXD6UT1NQxB18x0axPu5V';

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const headers = {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    };

    const response = await fetch("https://api.predicthq.com/v1/events", {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      console.error("Error:", response.status, response.statusText);
      return;
    }
    const eventsData = await response.json();
    const events = eventsData.results;
    const allEvents = eventsData.count;

    // Filter events occurring in the current month
    const eventsThisMonth = events.filter(event => {
      const eventStartDate = new Date(event.start);
      const eventMonth = eventStartDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const eventYear = eventStartDate.getFullYear();
      return eventMonth === currentMonth && eventYear === currentYear;
    });

    // Count the number of events occurring this month
    const eventsCountThisMonth = eventsThisMonth.length;

    console.log(eventsData, 'events data');
    console.log(events, 'events');
    console.log(allEvents, 'total events count from API');
    console.log(eventsThisMonth, 'events this month');
    console.log("Number of events this month:", eventsCountThisMonth);

    return {
      eventsData,
      events,
      allEvents
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};