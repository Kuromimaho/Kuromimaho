document.addEventListener("DOMContentLoaded", () => {

    const clockElement = document.getElementById("live-clock");

    const dateElement = document.getElementById("live-date");

    if (!clockElement || !dateElement) return;

    function updateClock() {

        const now = new Date();

        const time = now.toLocaleTimeString("en-US", {

            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false

        });

        const date = now.toLocaleDateString("en-US", {

            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"

        });

        clockElement.textContent = time;

        dateElement.textContent = date;

    }

    updateClock();

    setInterval(updateClock, 1000);

});
