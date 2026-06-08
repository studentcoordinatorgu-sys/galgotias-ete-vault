// assets/js/app.js

/* =====================================
   SESSION MANAGEMENT
===================================== */

const dashboard = document.getElementById("dashboard");
const vaultScreen = document.getElementById("vaultScreen");
const loaderScreen = document.getElementById("loaderScreen");

const SESSION_KEY = "gu_ete_vault_unlocked";

/* =====================================
   RESTORE SESSION
===================================== */

window.addEventListener("load", () => {

    const isUnlocked =
        sessionStorage.getItem(SESSION_KEY);

    if (isUnlocked === "true") {

        vaultScreen.classList.add("hidden");
        loaderScreen.classList.add("hidden");

        dashboard.classList.remove("hidden");
    }

});

/* =====================================
   SAVE SESSION AFTER UNLOCK
===================================== */

function saveVaultSession() {

    sessionStorage.setItem(
        SESSION_KEY,
        "true"
    );

}

/* =====================================
   WATCH DASHBOARD VISIBILITY
===================================== */

const dashboardObserver =
    new MutationObserver(() => {

        const visible =
            !dashboard.classList.contains("hidden");

        if (visible) {

            saveVaultSession();

            animateCards();

        }

    });

dashboardObserver.observe(
    dashboard,
    {
        attributes: true,
        attributeFilter: ["class"]
    }
);

/* =====================================
   CARD ANIMATION
===================================== */

function animateCards() {

    const cards =
        document.querySelectorAll(
            ".semester-card, .subject-card"
        );

    cards.forEach((card, index) => {

        card.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translateY(25px)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateY(0px)"
                }
            ],
            {
                duration: 500,
                delay: index * 70,
                fill: "forwards"
            }
        );

    });

}

/* =====================================
   SHARE MENU TOGGLE
===================================== */

const shareBtn =
    document.getElementById("shareBtn");

const shareMenu =
    document.getElementById("shareMenu");

if (shareBtn) {

    shareBtn.addEventListener(
        "click",
        () => {

            shareMenu.classList.toggle(
                "hidden"
            );

        }
    );

}

/* =====================================
   CLOSE SHARE MENU ON OUTSIDE CLICK
===================================== */

document.addEventListener(
    "click",
    (event) => {

        if (
            !shareMenu.contains(event.target) &&
            event.target !== shareBtn
        ) {

            shareMenu.classList.add(
                "hidden"
            );

        }

    }
);

/* =====================================
   DOWNLOAD BUTTON EFFECT
===================================== */

const downloadButtons =
    document.querySelectorAll(
        ".download-btn"
    );

downloadButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            btn.innerText =
                "Downloading...";

            setTimeout(() => {

                btn.innerText =
                    "Download PDF";

            }, 2500);

        }
    );

});

/* =====================================
   REQUEST FORM SUCCESS
===================================== */

const requestForm =
    document.querySelector("form");

if (requestForm) {

    requestForm.addEventListener(
        "submit",
        () => {

            const submitBtn =
                requestForm.querySelector(
                    "button"
                );

            submitBtn.innerText =
                "Sending Request...";

        }
    );

}

/* =====================================
   ACTIVE SUBJECT HOVER EFFECT
===================================== */

const subjectCards =
    document.querySelectorAll(
        ".subject-card"
    );

subjectCards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.transform =
                "translateY(-6px)";
        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "translateY(0px)";
        }
    );

});

/* =====================================
   CURRENT YEAR FOOTER AUTO UPDATE
===================================== */

const footerText =
    document.querySelector("footer p");

if (footerText) {

    footerText.innerHTML =
        `© ${new Date().getFullYear()} Krishna CR. All Rights Reserved.`;

}

/* =====================================
   ANALYTICS PAGE VIEW
===================================== */

if (typeof gtag !== "undefined") {

    gtag(
        "event",
        "page_view",
        {
            page_title:
                "Galgotias ETE Resource Vault"
        }
    );

}

/* =====================================
   RESOURCE VAULT STATUS
===================================== */

console.log(
    "Galgotias ETE Resource Vault Loaded"
);

/* =====================================
   FUTURE EXPANSION PLACEHOLDER
===================================== */

window.GU_VAULT = {

    version: "1.0",

    semester: "4",

    activeSubjects: [
        "Machine Learning",
        "Java Programming",
        "Mobile Application Development",
        "Natural Language Processing"
    ]

};