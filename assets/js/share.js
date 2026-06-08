// assets/js/share.js

/* =====================================
   SHARE SYSTEM
===================================== */

const shareButtons =
    document.querySelectorAll(
        "#shareMenu button"
    );

const siteUrl =
    window.location.href;

const shareText =
    "Galgotias ETE Resource Vault - Semester 4 Important Questions";

/* =====================================
   ANALYTICS HELPER
===================================== */

function trackShare(platform) {

    console.log(
        "Share:",
        platform
    );

    if (typeof gtag !== "undefined") {

        gtag(
            "event",
            "share_click",
            {
                platform: platform
            }
        );

    }

}

/* =====================================
   COPY LINK
===================================== */

async function copyLink() {

    try {

        await navigator.clipboard.writeText(
            siteUrl
        );

        alert(
            "Portal link copied successfully."
        );

        trackShare("copy_link");

    } catch (error) {

        console.error(error);

        alert(
            "Unable to copy link."
        );

    }

}

/* =====================================
   WHATSAPP
===================================== */

function shareWhatsApp() {

    trackShare("whatsapp");

    const url =
        `https://wa.me/?text=${encodeURIComponent(
            shareText + "\n" + siteUrl
        )}`;

    window.open(
        url,
        "_blank"
    );

}

/* =====================================
   TELEGRAM
===================================== */

function shareTelegram() {

    trackShare("telegram");

    const url =
        `https://t.me/share/url?url=${encodeURIComponent(
            siteUrl
        )}&text=${encodeURIComponent(
            shareText
        )}`;

    window.open(
        url,
        "_blank"
    );

}

/* =====================================
   INSTAGRAM
===================================== */

function shareInstagram() {

    trackShare("instagram");

    alert(
        "Instagram direct website sharing is limited. Link copied to clipboard. Paste it in your Story, DM, or Notes."
    );

    copyLink();

}

/* =====================================
   WEB SHARE API
===================================== */

async function nativeShare() {

    if (!navigator.share) return;

    try {

        await navigator.share({

            title:
                "Galgotias ETE Resource Vault",

            text:
                shareText,

            url:
                siteUrl

        });

    } catch (error) {

        console.log(error);

    }

}

/* =====================================
   BUTTON HANDLERS
===================================== */

shareButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            const type =
                btn.dataset.share;

            switch (type) {

                case "whatsapp":
                    shareWhatsApp();
                    break;

                case "telegram":
                    shareTelegram();
                    break;

                case "instagram":
                    shareInstagram();
                    break;

                case "copy":
                    copyLink();
                    break;

            }

        }
    );

});

/* =====================================
   MOBILE QUICK SHARE
===================================== */

const shareBtn =
    document.getElementById(
        "shareBtn"
    );

if (
    navigator.share &&
    window.innerWidth < 768
) {

    shareBtn.addEventListener(
        "dblclick",
        nativeShare
    );

}