// --- COUNTDOWN TIMER (CORRECTED CODE) ---

// Step 1: Get the HTML elements where the numbers will be displayed
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Step 2: Set the CORRECT Diwali date (October 20, 2025, at midnight)
const diwaliDate = new Date("October 19, 2025 12:00:00"); // <-- यहाँ तारीख ठीक कर दी गई है

// This variable will hold our timer
let countdownInterval;

// Step 3: The function to update the timer every second
function updateCountdown() {
    const now = new Date();
    const diff = diwaliDate - now;

    // If the countdown is over, stop the timer and show a message
    if (diff <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('timer').innerHTML = "<h2>Happy Diwali!</h2>";
        return;
    }

    // Calculate the time remaining
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Display the numbers in the HTML (with leading zeros for a nice look)
    daysEl.innerText = days;
    hoursEl.innerText = String(hours).padStart(2, '0');
    minutesEl.innerText = String(minutes).padStart(2, '0');
    secondsEl.innerText = String(seconds).padStart(2, '0');
}

// Step 4: Start the countdown timer
// This will call the updateCountdown function every 1000 milliseconds (1 second)
countdownInterval = setInterval(updateCountdown, 1000);

// Run the function once immediately so the timer doesn't wait 1 second to appear
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

// --- Code to control the QR Code Modal (Safe Version) ---

// This function will run only after the entire HTML page has been loaded.
document.addEventListener('DOMContentLoaded', function() {

    // Get all the necessary elements from the HTML page.
    const modal = document.getElementById("qr-modal");
    const btn = document.getElementById("access-btn");
    const span = document.querySelector("#qr-modal .close-btn");

    // This is the crucial part:
    // We check if all three elements were successfully found on the page.
    // If they exist, we add the click functions. If not, the code does nothing and avoids errors.
    if (modal && btn && span) {

        // When the user clicks the "Student Access" button, open the modal.
        btn.onclick = function(event) {
            event.preventDefault(); // Prevents the page from jumping to the top.
            modal.style.display = "flex"; // Show the pop-up.
        }

        // When the user clicks the 'x' icon, close the modal.
        span.onclick = function() {
            modal.style.display = "none"; // Hide the pop-up.
        }

        // If the user clicks anywhere on the dark background outside the modal, close it.
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none"; // Hide the pop-up.
            }
        }
    }
});

// =======================================================
// JAVASCRIPT FOR THE INTERACTIVE DETAILS MODAL
// =======================================================
document.addEventListener('DOMContentLoaded', function() {
    
    const detailsModal = document.getElementById('details-modal');
    // Important: Use a more specific selector for the close button
    const closeBtn = document.querySelector('#details-modal .close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-img');
    const modalDescription = document.getElementById('modal-description');

    // Find all the cards that are meant to be interactive
    const interactiveCards = document.querySelectorAll('.interactive');

    // Add a click listener to each interactive card
    interactiveCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get the data from the clicked card's data-* attributes
            const title = card.getAttribute('data-title');
            const image = card.getAttribute('data-image');
            const description = card.getAttribute('data-description');

            // Set the content in the modal
            modalTitle.textContent = title;
            modalImage.src = image;
            modalDescription.textContent = description;

            // Show the modal
            detailsModal.style.display = 'flex';
        });
    });

    // Function to close the modal
    function closeModal() {
        detailsModal.style.display = 'none';
    }

    // Close the modal when the 'x' is clicked
    if(closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close the modal when clicking outside the content area
    window.addEventListener('click', function(event) {
        if (event.target == detailsModal) {
            closeModal();
        }
    });
});
