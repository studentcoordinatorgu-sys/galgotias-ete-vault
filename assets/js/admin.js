// assets/js/admin.js

/* =====================================
   HIDDEN ADMIN MODE
===================================== */

const vaultLogo =
    document.getElementById(
        "vaultLogo"
    );

const adminPopup =
    document.getElementById(
        "adminPopup"
    );

const closeAdmin =
    document.getElementById(
        "closeAdmin"
    );

let clickCount = 0;
let clickTimer;

/* =====================================
   5 CLICK TRIGGER
===================================== */

vaultLogo.addEventListener(
    "click",
    () => {

        clickCount++;

        clearTimeout(
            clickTimer
        );

        clickTimer =
            setTimeout(() => {

                clickCount = 0;

            }, 2000);

        if (clickCount >= 5) {

            clickCount = 0;

            openAdminMode();

        }

    }
);

/* =====================================
   OPEN ADMIN
===================================== */

function openAdminMode() {

    adminPopup.classList.remove(
        "hidden"
    );

    console.log(
        "Admin Mode Activated"
    );

    if (typeof gtag !== "undefined") {

        gtag(
            "event",
            "admin_mode_opened"
        );

    }

}

/* =====================================
   CLOSE ADMIN
===================================== */

closeAdmin.addEventListener(
    "click",
    () => {

        adminPopup.classList.add(
            "hidden"
        );

    }
);

/* =====================================
   CLOSE OUTSIDE
===================================== */

adminPopup.addEventListener(
    "click",
    (e) => {

        if (
            e.target === adminPopup
        ) {

            adminPopup.classList.add(
                "hidden"
            );

        }

    }
);

/* =====================================
   DEV INFO
===================================== */

console.log(
    "Hidden Admin Mode Ready"
);