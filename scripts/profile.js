document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("website-list");

    const heroName = document.getElementById("hero-name");

    const heroTitle = document.getElementById("hero-title");

    const heroDescription = document.getElementById("hero-description");

    if (!container) return;

    try {

        const response = await fetch("data/profile.json");

        if (!response.ok) {

            throw new Error("Failed to load profile.json");

        }

        const profile = await response.json();

        /* =========================================
           Hero
        ========================================= */

        if (heroName) {

            heroName.textContent = "";

            let index = 0;

            function type() {

                if (index < profile.name.length) {

                    heroName.textContent += profile.name.charAt(index);

                    index++;

                    setTimeout(type, 120);

                }

            }

            type();

        }

        if (heroTitle) {

            heroTitle.textContent = profile.title;

        }

        if (heroDescription) {

            heroDescription.textContent = profile.description;

        }

        /* =========================================
           Website Cards
        ========================================= */

        container.innerHTML = "";

        profile.websites.forEach(site => {

            const card = document.createElement("a");

            card.className = "card";

            card.href = site.url;

            card.target = "_blank";

            card.rel = "noopener noreferrer";

            card.innerHTML = `

                <h3>${site.name}</h3>

                <p>${site.description}</p>

                <span class="website-link">

                    Visit Website

                </span>

                <div class="website-status">

                    Online

                </div>

            `;

            container.appendChild(card);

        });

    }

    catch (error) {

        console.error(error);

        container.innerHTML = `

            <div class="card">

                <h3>

                    Error

                </h3>

                <p>

                    Failed to load website data.

                </p>

            </div>

        `;

    }

});
