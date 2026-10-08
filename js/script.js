// =====================================================
// ELEMENTS
// =====================================================

const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");

const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("backgroundMusic");

const surpriseBtn = document.getElementById("surpriseBtn");
const loveModal = document.getElementById("loveModal");
const closeModal = document.getElementById("closeModal");

const particlesContainer =
    document.getElementById("particles");


// =====================================================
// INTRO
// =====================================================

enterBtn.addEventListener("click", () => {

    intro.classList.add("hidden");

    document.body.classList.remove("locked");

    // Try to start music after user interaction
    music.play()
        .then(() => {
            musicBtn.classList.add("active");
        })
        .catch(() => {
            console.log("Music autoplay blocked.");
        });

});


// =====================================================
// MUSIC
// =====================================================

musicBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicBtn.classList.add("active");

    } else {

        music.pause();

        musicBtn.classList.remove("active");

    }

});


// =====================================================
// SMOOTH SCROLL
// =====================================================

function scrollToSection(id) {

    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth"
    });

}


// =====================================================
// PARTICLES
// =====================================================

function createParticles() {

    const amount = window.innerWidth < 768
        ? 20
        : 35;

    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("div");

        particle.classList.add("particle");

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.animationDuration =
            `${8 + Math.random() * 15}s`;

        particle.style.animationDelay =
            `${Math.random() * 10}s`;

        particle.style.opacity =
            `${0.15 + Math.random() * 0.5}`;

        particle.style.transform =
            `scale(${0.5 + Math.random()})`;

        particlesContainer.appendChild(
            particle
        );

    }

}

createParticles();


// =====================================================
// SURPRISE MODAL
// =====================================================

surpriseBtn.addEventListener("click", () => {

    loveModal.classList.add("active");

    document.body.classList.add("locked");

    createHeartExplosion();

});


// =====================================================
// CLOSE MODAL
// =====================================================

closeModal.addEventListener("click", () => {

    loveModal.classList.remove("active");

    document.body.classList.remove("locked");

});


loveModal.addEventListener("click", (event) => {

    if (
        event.target ===
        loveModal.querySelector(".modal__background")
    ) {

        loveModal.classList.remove("active");

        document.body.classList.remove("locked");

    }

});


// =====================================================
// HEART EXPLOSION
// =====================================================

function createHeartExplosion() {

    const hearts = [
        "♥",
        "♡",
        "❤",
        "💕",
        "💗",
        "✨"
    ];

    for (let i = 0; i < 35; i++) {

        const heart =
            document.createElement("div");

        heart.innerHTML =
            hearts[
                Math.floor(
                    Math.random() * hearts.length
                )
            ];

        heart.style.position = "fixed";

        heart.style.left = "50%";
        heart.style.top = "50%";

        heart.style.zIndex = "2000";

        heart.style.pointerEvents = "none";

        heart.style.fontSize =
            `${12 + Math.random() * 20}px`;

        heart.style.color = "#ff5c8a";

        document.body.appendChild(heart);

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 350;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        heart.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(1.2)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    1200 + Math.random() * 1000,

                easing:
                    "cubic-bezier(.17,.67,.32,1.3)"
            }
        );

        setTimeout(() => {

            heart.remove();

        }, 2500);

    }

}


// =====================================================
// GIFT CLICK
// =====================================================

const gift = document.getElementById("gift");

gift.addEventListener("click", () => {

    createHeartExplosion();

});


// =====================================================
// ESCAPE KEY
// =====================================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        loveModal.classList.remove("active");

        document.body.classList.remove("locked");

    }

});


// =====================================================
// IMAGE FALLBACK
// =====================================================

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        img.style.background =
            "linear-gradient(135deg,#24151e,#120b10)";

        img.style.objectFit = "cover";

    });

});


// =====================================================
// SCROLL REVEAL
// =====================================================

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


document
    .querySelectorAll(
        ".birthday__card, .letter__paper, .memory-card, .reason"
    )
    .forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity .8s ease, transform .8s ease";

        observer.observe(element);

    });