// --- COUNTDOWN TIMER ---
// (Your existing countdown timer code remains here, unchanged)
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Corrected: Diwali in 2025 is on October 21st.
const diwaliDate = new Date('2025-10-21T00:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = diwaliDate - now;

    if (diff <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('timer').innerHTML = "<h2>Happy Diwali!</h2>";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.innerText = days;
    hoursEl.innerText = String(hours).padStart(2, '0');
    minutesEl.innerText = String(minutes).padStart(2, '0');
    secondsEl.innerText = String(seconds).padStart(2, '0');
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();


// --- INTERACTIVE GALLERY LIGHTBOX ---
// (Your existing gallery lightbox code remains here, unchanged)
const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.gallery-img');
const closeBtn = document.querySelector('.close-btn');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
    });
});

function closeModal() {
    modal.style.display = 'none';
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});


// --- NEW: SCROLL REVEAL EFFECT FOR COLLEGE SECTION ---
const collegeSection = document.getElementById('college-section');

function checkScrollReveal() {
    const sectionTop = collegeSection.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;

    // If the top of the section is within 80% of the viewport height
    if (sectionTop < viewportHeight * 0.8) {
        collegeSection.classList.add('is-visible');
    }
}

// Attach the scroll event listener
window.addEventListener('scroll', checkScrollReveal);

// Also check on load, in case the section is already in view
checkScrollReveal();