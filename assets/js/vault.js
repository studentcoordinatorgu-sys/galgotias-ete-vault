// assets/js/vault.js

const pinBoxes = document.querySelectorAll(".pin-box");

const unlockBtn = document.getElementById("unlockBtn");

const vaultMessage = document.getElementById("vaultMessage");

const vaultScreen = document.getElementById("vaultScreen");

const loaderScreen = document.getElementById("loaderScreen");

const dashboard = document.getElementById("dashboard");

/* ========================= */
/* CONFIG */
/* ========================= */

const VAULT_CODE = "1507";

/* ========================= */
/* AUTO FOCUS */
/* ========================= */

pinBoxes.forEach((box, index) => {

    box.addEventListener("input", () => {

        box.value = box.value.replace(/\D/g, "");

        if (
            box.value &&
            index < pinBoxes.length - 1
        ) {
            pinBoxes[index + 1].focus();
        }

    });

    box.addEventListener("keydown", (e) => {

        if (
            e.key === "Backspace" &&
            !box.value &&
            index > 0
        ) {
            pinBoxes[index - 1].focus();
        }

    });

});

/* ========================= */
/* GET PIN */
/* ========================= */

function getPinValue() {

    return Array.from(pinBoxes)
        .map(box => box.value)
        .join("");

}

/* ========================= */
/* ERROR */
/* ========================= */

function showError(message) {

    vaultMessage.textContent = message;

    vaultMessage.style.color = "#ef4444";

    document.querySelector(".vault-card")
        .animate(
            [
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(-6px)" },
                { transform: "translateX(6px)" },
                { transform: "translateX(0px)" }
            ],
            {
                duration: 400
            }
        );

}

/* ========================= */
/* SUCCESS */
/* ========================= */

function showSuccess(message) {

    vaultMessage.textContent = message;

    vaultMessage.style.color = "#22c55e";

}

/* ========================= */
/* UNLOCK */
/* ========================= */

function unlockVault() {

    const enteredCode = getPinValue();

    if (enteredCode.length !== 4) {

        showError(
            "Please enter all 4 digits"
        );

        return;
    }

    if (enteredCode !== VAULT_CODE) {

        showError(
            "Access Denied • Invalid Vault Key"
        );

        return;
    }

    showSuccess(
        "Access Granted"
    );

    setTimeout(() => {

        vaultScreen.classList.add("hidden");

        loaderScreen.classList.remove("hidden");

        setTimeout(() => {

            loaderScreen.classList.add("hidden");

            dashboard.classList.remove("hidden");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 2600);

    }, 800);

}

/* ========================= */
/* BUTTON */
/* ========================= */

unlockBtn.addEventListener(
    "click",
    unlockVault
);

/* ========================= */
/* ENTER KEY */
/* ========================= */

document.addEventListener(
    "keydown",
    (e) => {

        if (
            e.key === "Enter" &&
            !vaultScreen.classList.contains("hidden")
        ) {
            unlockVault();
        }

    }
);

/* ========================= */
/* AUTO UNLOCK WHEN FILLED */
/* ========================= */

pinBoxes.forEach(box => {

    box.addEventListener("input", () => {

        const currentPin =
            getPinValue();

        if (currentPin.length === 4) {

            setTimeout(() => {

                unlockVault();

            }, 250);

        }

    });

});

/* ========================= */
/* CLEAR PIN ON WRONG */
/* ========================= */

function clearPinBoxes() {

    pinBoxes.forEach(box => {
        box.value = "";
    });

    pinBoxes[0].focus();

}

unlockBtn.addEventListener(
    "click",
    () => {

        const pin = getPinValue();

        if (
            pin.length === 4 &&
            pin !== VAULT_CODE
        ) {

            setTimeout(() => {

                clearPinBoxes();

            }, 900);

        }

    }
);

/* ========================= */
/* INITIAL FOCUS */
/* ========================= */

window.addEventListener(
    "load",
    () => {

        pinBoxes[0].focus();

    }
);

/* ========================= */
/* DOWNLOAD ANALYTICS HOOK */
/* future analytics.js use */
/* ========================= */

document
    .querySelectorAll(".download-btn")
    .forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                const subject =
                    btn.parentElement
                        .querySelector("h3")
                        .innerText;

                console.log(
                    "Download:",
                    subject
                );

                if (typeof gtag !== "undefined") {

                    gtag(
                        "event",
                        "pdf_download",
                        {
                            subject: subject
                        }
                    );

                }

            }
        );

    });