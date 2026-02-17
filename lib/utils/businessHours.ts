export const businessHours = {
    0: { open: "11:30", close: "23:00" }, // Sunday
    1: { open: "11:30", close: "23:00" }, // Monday
    2: { open: "11:30", close: "23:00" }, // Tuesday
    3: { open: "11:30", close: "23:00" }, // Wednesday
    4: { open: "11:30", close: "23:59" }, // Thursday
    5: { open: "15:00", close: "23:00" }, // Friday
    6: { open: "11:30", close: "23:00" }, // Saturday
};

export const SERVICES = ["Delivery", "Takeout", "Dine-in", "In-store pickup"];

export function isStoreOpen(): { isOpen: boolean; nextOpen?: string; message: string } {
    const now = new Date();
    // Convert to BD time if server is elsewhere, but for now assuming local machine time for simplified MVP or client-side check
    // Ideally we use a library like date-fns-tz but native JS is fine for simple checks.

    const day = now.getDay() as keyof typeof businessHours;
    const hours = businessHours[day];

    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [openH, openM] = hours.open.split(":").map(Number);
    const [closeH, closeM] = hours.close.split(":").map(Number);

    const openTime = openH * 60 + openM;
    const closeTime = closeH * 60 + closeM;

    if (currentTime >= openTime && currentTime < closeTime) {
        return { isOpen: true, message: "Open Now" };
    }

    // Logic for "Opens at X" could be added here
    return { isOpen: false, message: `Closed. Opens at ${hours.open}` };
}

export function getFormattedHours() {
    return [
        { day: "Mon-Wed", time: "11:30 AM - 11:00 PM" },
        { day: "Thursday", time: "11:30 AM - 11:59 PM" },
        { day: "Friday", time: "03:00 PM - 11:00 PM" },
        { day: "Sat-Sun", time: "11:30 AM - 11:00 PM" },
    ];
}

export function getNextScheduleChange(): Date {
    const now = new Date();
    const day = now.getDay() as keyof typeof businessHours;
    const hours = businessHours[day];

    const [openH, openM] = hours.open.split(":").map(Number);
    const [closeH, closeM] = hours.close.split(":").map(Number);

    const openTime = new Date(now);
    openTime.setHours(openH, openM, 0, 0);

    const closeTime = new Date(now);
    closeTime.setHours(closeH, closeM, 0, 0);

    if (now < openTime) {
        return openTime; // Will open later today
    } else if (now < closeTime) {
        return closeTime; // Will close later today
    } else {
        // Will open tomorrow
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextDay = tomorrow.getDay() as keyof typeof businessHours;
        const nextHours = businessHours[nextDay];
        const [nextOpenH, nextOpenM] = nextHours.open.split(":").map(Number);
        tomorrow.setHours(nextOpenH, nextOpenM, 0, 0);
        return tomorrow;
    }
}
