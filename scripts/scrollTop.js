document.addEventListener("DOMContentLoaded", () => {

    const button = document.createElement("button");

    button.id = "scroll-top";

    button.innerHTML = "↑";

    button.setAttribute(

        "aria-label",

        "Scroll to top"

    );

    Object.assign(button.style, {

        position: "fixed",

        right: "24px",

        bottom: "24px",

        width: "52px",

        height: "52px",

        border: "none",

        borderRadius: "50%",

        background: "var(--primary)",

        color: "#ffffff",

        fontSize: "1.4rem",

        cursor: "pointer",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        boxShadow: "var(--shadow)",

        opacity: "0",

        visibility: "hidden",

        transform: "translateY(20px)",

        transition: "all .3s ease",

        zIndex: "999"

    });

    document.body.appendChild(button);

    function updateButton() {

        if (window.scrollY > 300) {

            button.style.opacity = "1";

            button.style.visibility = "visible";

            button.style.transform = "translateY(0)";

        }

        else {

            button.style.opacity = "0";

            button.style.visibility = "hidden";

            button.style.transform = "translateY(20px)";

        }

    }

    window.addEventListener(

        "scroll",

        updateButton

    );

    updateButton();

    button.addEventListener(

        "click",

        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

    );

});