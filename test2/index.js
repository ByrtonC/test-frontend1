let bookingData = [
    {
        id: 1,
        roomId: "A101",
        startTime: "2019-09-28 13:00:00",
        endTime: "2019-09-28 14:00:00",
        title: "Lunch with Petr",
    },
    {
        id: 2,
        roomId: "A101",
        startTime: "2019-09-28 14:00:00",
        endTime: "2019-09-28 15:00:00",
        title: "Sales Weekly Meeting",
    },
    {
        id: 3,
        roomId: "A101",
        startTime: "2019-09-28 16:00:00",
        endTime: "2019-09-28 18:00:00",
        title: "Anastasia Website Warroom",
    },
    {
        id: 4,
        roomId: "A101",
        startTime: "2019-09-29 13:00:00",
        endTime: "2019-09-29 14:00:00",
        title: "One-on-One Session",
    },
    {
        id: 5,
        roomId: "A101",
        startTime: "2019-09-29 16:00:00",
        endTime: "2019-09-29 18:00:00",
        title: "UGC Sprint Planning",
    },
    {
        id: 6,
        roomId: "A102",
        startTime: "2019-09-30 09:00:00",
        endTime: "2019-10-04 18:00:00",
        title: "5-Day Design Sprint Workshop",
    },
    {
        id: 7,
        roomId: "Auditorium",
        startTime: "2019-09-19 09:00:00",
        endTime: "2019-09-23 19:00:00",
        title: "Thai Tech Innovation 2019",
    },
    {
        id: 8,
        roomId: "A101",
        startTime: "2019-09-28 10:00:00",
        endTime: "2019-09-28 13:00:00",
        title: "Raimonland project",
    },
    {
        id: 9,
        roomId: "A102",
        startTime: "2019-09-30 18:00:00",
        endTime: "2019-09-30 20:00:00",
        title: "Management Meetinng",
    },
    {
        id: 10,
        roomId: "A101",
        startTime: "2019-10-04 14:00:00",
        endTime: "2019-10-06 11:00:00",
        title: "3-day workshop Corgi costume",
    },
];

const checkAvailability = (roomId, startTime, endTime) => {
    const st = new Date(startTime).getTime();
    const et = new Date(endTime).getTime();
    if (et < st) return false;

    if (
        bookingData.some(
            (booking) =>
                new Date(booking.startTime).getTime() <= st &&
                new Date(booking.endTime).getTime() >= st &&
                booking.roomId === roomId
        )
    )
        return false;
    if (
        bookingData.some(
            (booking) =>
                new Date(booking.startTime).getTime() >= st &&
                new Date(booking.startTime).getTime() <= et &&
                booking.roomId === roomId
        )
    )
        return false;

    return true;
};

function getStartEndBooking(weekNo) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    let startDate = null;
    let endDate = null;

    for (
        let day = firstDayOfMonth;
        day <= lastDayOfMonth;
        day.setDate(day.getDate() + 1)
    ) {
        const weekNumber = Math.ceil(day.getDate() / 7);

        if (weekNumber === weekNo) {
            if (!startDate) {
                startDate = new Date(day); // Store the first date
            }
            endDate = new Date(day); // Update the last date
        }
    }

    return { startDate, endDate };
}

const getBookingsForWeek = (roomId, weekNo) => {
    const { startDate, endDate } = getStartEndBooking(weekNo);
    const st = new Date(startDate).getTime();
    const et = new Date(endDate).getTime();

    return bookingData.filter((booking) => {
        if (
            new Date(booking.startTime).getTime() <= st &&
            new Date(booking.endTime).getTime() >= st &&
            booking.roomId === roomId
        )
            return true;
        if (
            new Date(booking.startTime).getTime() >= st &&
            new Date(booking.startTime).getTime() <= et &&
            booking.roomId === roomId
        )
            return true;

        return false;
    });
};
