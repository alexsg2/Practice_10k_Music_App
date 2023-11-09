/*
 * Helper functions for basic functionality such as time conversion, date range...
 */

export function convertToHoursAndMinutes(hours: number): [number, number]
{
    const hoursInt = Math.floor(hours);
    const minutes = Math.round((hours - hoursInt) * 60);
    return [hoursInt, minutes];
}

export function convertToHours(time: number): number
{
    const hours = time / 60;
    return Number(hours.toFixed(2));
}


export function totalDurationInHoursAndMinutes(allHours: number[]): [number, number]
{
    let hour = 0;
    let minute = 0;
    
    for (let i = 0; i < allHours.length; i++) {
        const [hours, minutes] = convertToHoursAndMinutes(allHours[i]);
        hour += hours;
        minute += minutes;
    }
    if (minute >= 60) {
        hour += Math.floor(minute / 60);
        minute = minute % 60;
    }
    
    return [hour, minute];
}


export function getDailyDateRanges(): [Date, Date]
{
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setUTCHours(23, 59, 59, 999);
    return [start, end];
}


export function getWeeklyDateRanges(): [Date, Date]
{
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(today);
    end.setDate(today.getDate() + (6 - today.getDay()));
    end.setUTCHours(23, 59, 59, 999);
    return [start, end];
}

export function getMonthlyDateRanges(): [Date, Date]
{
    const today = new Date();
    const start= new Date(today);
    start.setDate(1);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(today);
    end.setMonth(end.getMonth() + 1, 1);
    end.setDate(end.getDate() - 1);
    end.setUTCHours(23, 59, 59, 999);
    return [start, end];
}

export function getMonthlyDateRangeFromDate(date: Date): [Date, Date]
{
    const start= new Date(date);
    start.setDate(1);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setMonth(end.getMonth() + 1, 1);
    end.setDate(end.getDate() - 1);
    end.setUTCHours(23, 59, 59, 999);
    return [start, end];
}

export function formatWeeklyDateRange(start: Date, end: Date): string
{
    const options = { month: 'short' as const, day: 'numeric' as const };
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    
    const newStart = new Date(start);
    newStart.setDate(start.getDate() + 1);

    const formattedStartDate = dateFormatter.format(newStart);
    const formattedEndDate = dateFormatter.format(end);
    return `${formattedStartDate} - ${formattedEndDate}`;
}

export function getOverallDateRanges(): [Date, Date]
{
    const start = new Date(2023, 9, 29);
    start.setUTCHours(0, 0, 0, 0);  // arbitrary date set to Oct 29, 2023 at 00h:00min:00s
    const end = new Date();
    end.setUTCHours(23, 59, 59, 999);
    return [start, end];
}