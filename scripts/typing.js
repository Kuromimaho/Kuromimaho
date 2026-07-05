document.addEventListener("DOMContentLoaded", () => {

    const element = document.getElementById("hero-name");

    if (!element) return;

    setTimeout(() => {

        const text = element.textContent.trim();

        element.textContent = "";

        let index = 0;

        function type() {

            if (index < text.length) {

                element.textContent += text.charAt(index);

                index++;

                setTimeout(type, 120);

            }

        }

        type();

    }, 200);

});
