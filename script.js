/* ==========================================
   1. THEME LOGIC (READ & WRITE)
   ========================================== */
function initTheme() {
    // READ: Get saved theme or default to dark
    const savedTheme = localStorage.getItem('carZoneTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const htmlTag = document.documentElement;
    const currentTheme = htmlTag.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // UI Update
    htmlTag.setAttribute('data-theme', newTheme);
    
    // WRITE: Persist selection
    localStorage.setItem('carZoneTheme', newTheme);
}

// Run immediately to prevent "flash" of wrong theme
initTheme();

/* ==========================================
   2. FORM HANDLING (VALIDATION & NO REFRESH)
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {

    // --- A. LOGIN FORM / ENTER CLUB ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // STOP REFRESH
            
            const user = document.getElementById('loginUser').value;
            const pass = document.getElementById('loginPass').value;
            const status = document.getElementById('loginStatus');

            // Custom Validation
            if (user.length < 4 || pass.length < 6) {
                status.innerText = "Error: Invalid Username/Password.";
                status.style.color = "#ffaa00";
            } else {
                // WRITE: Save session
                localStorage.setItem('activeUser', user);
                
                status.innerText = "Sent Successfully! Welcome to the club.";
                status.style.color = "#00ff00";
                
                setTimeout(() => { window.location.href = "index.html"; }, 1500);
            }
        });
    }

    // --- B. CONTACT US FORM ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // STOP REFRESH
            
            const name = document.getElementById('contactName')?.value;
            const email = document.getElementById('contactEmail')?.value;
            const status = document.getElementById('contactStatus');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Custom Validation
            if (!name || name.trim().length < 2) {
                status.innerText = "Please enter a valid name.";
                status.style.color = "#ffaa00";
            } else if (!emailRegex.test(email)) {
                status.innerText = "Invalid email format.";
                status.style.color = "#ffaa00";
            } else {
                // WRITE: Record contact attempt
                localStorage.setItem('lastContact', name);
                
                status.innerText = "Sent Successfully! We'll be in touch.";
                status.style.color = "#00ff00";
                contactForm.reset();
            }
        });
    }

    // --- C. DRIVE TEST FORM ---
    const driveForm = document.getElementById('testdriveForm');
    if (driveForm) {
        driveForm.addEventListener('submit', (e) => {
            e.preventDefault(); // STOP REFRESH
            
            const model = driveForm.querySelector('input[placeholder="Car Model"]').value;
            const status = document.getElementById('tdStatusMessage');

            if (model.trim() === "") {
                status.innerText = "Please specify a car model.";
                status.style.color = "#ffaa00";
            } else {
                // WRITE: Save booking
                localStorage.setItem('bookedCar', model);
                
                status.innerText = "Sent Successfully! Booking confirmed.";
                status.style.color = "#00ff00";
                driveForm.reset();
            }
        });
    }
});