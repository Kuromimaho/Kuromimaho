document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll(".header nav a");

    const sections = document.querySelectorAll("section[id]");

    /* =========================================
       Active Navigation
    ========================================= */

    function updateActiveLink() {

        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {

            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") === `#${id}`
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    }

    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink);

    /* =========================================
       Scroll Reveal
    ========================================= */

    const reveals = document.querySelectorAll(

        ".card, .section-header, .live-card"

    );

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    reveals.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

    /* =========================================
       Smooth Anchor Scroll
    ========================================= */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (!href.startsWith("#")) return;

            event.preventDefault();

            const target = document.querySelector(href);

            if (!target) return;

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

});