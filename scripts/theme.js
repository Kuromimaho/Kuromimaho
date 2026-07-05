document.addEventListener("DOMContentLoaded", () => {

    const toggleButton = document.getElementById("theme-toggle");

    if (!toggleButton) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {

        document.documentElement.setAttribute(

            "data-theme",

            savedTheme

        );

        updateButton(savedTheme);

    }

    toggleButton.addEventListener("click", () => {

        const currentTheme = document.documentElement.getAttribute(

            "data-theme"

        );

        const newTheme = currentTheme === "light"

            ? "dark"

            : "light";

        if (newTheme === "dark") {

            document.documentElement.removeAttribute("data-theme");

        }

        else {

            document.documentElement.setAttribute(

                "data-theme",

                "light"

            );

        }

        localStorage.setItem("theme", newTheme);

        updateButton(newTheme);

    });

    function updateButton(theme) {

        toggleButton.textContent =

            theme === "light"

                ? "☀️"

                : "🌙";

    }

});