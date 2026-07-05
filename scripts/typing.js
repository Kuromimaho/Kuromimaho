document.addEventListener("DOMContentLoaded", () => {

    const element = document.getElementById("hero-name");

    if (!element) return;

    const text = element.textContent.trim();

    let index = 0;

    function type() {

        if (index === 0) {

            element.textContent = "";

        }

        if (index < text.length) {

            element.textContent += text.charAt(index);

            index++;

            setTimeout(type, 120);

        }

    }

    type();

});