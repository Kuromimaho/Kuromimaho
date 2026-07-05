document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("loading");

    const loader = document.getElementById("loader");

    if (!loader) {

        document.body.classList.remove("loading");

        return;

    }

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

            document.body.classList.remove("loading");

        }, 600);

    });

});