document.addEventListener('DOMContentLoaded', function() {

    const header = document.querySelector("header");
    const menu = document.querySelector('#menu-icon');
    const navList = document.querySelector('.navList');

    // --- TEXT SCRAMBLE ANIMATION FOR NAME ---
    function animateScrambledText(element) {
        const finalString = element.dataset.text;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let currentIteration = 0;
        let interval = null;

        // Clear any existing interval to prevent duplicates
        clearInterval(interval);

        interval = setInterval(() => {
            element.innerText = finalString
                .split("") // Split the final string into an array of letters
                .map((letter, index) => {
                    // If the current iteration has 'unlocked' this letter's index, show the correct letter
                    if (index < currentIteration) {
                        return finalString[index];
                    }
                    // Otherwise, show a random character
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join(""); // Join the array back into a string

            // If we have iterated over the entire string length, stop the animation
            if (currentIteration >= finalString.length) {
                clearInterval(interval);
                element.style.fontFamily = "'Inter', sans-serif"; // Optional: revert to original font
            }

            // Increment the iteration. Each letter is revealed every 3 frames (3 * 30ms = 90ms)
            currentIteration += 1 / 3;
        }, 30); // Run the animation frame every 30ms
    }

    const nameElement = document.getElementById('scramble-name');
    // Start the animation slightly after the page loads for a better effect
    setTimeout(() => animateScrambledText(nameElement), 500);


    // --- PRELOADER AND TYPEWRITER ---
    const preloader = document.getElementById('preloader');
    const loadingTextElement = document.querySelector('.loader-text');
    const textToType = "Initializing portfolio... Accessing assets... Rendering content...";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            loadingTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50); // Adjust typing speed here
        }
    }
    
    // Start the typewriter effect
    typeWriter();

    // Hide preloader once the entire page is fully loaded
    window.addEventListener('load', () => {
        preloader.classList.add('preloader-hidden');
    });

    // --- MOBILE MENU TOGGLE ---
    menu.onclick = () => {
        menu.classList.toggle('open');
        navList.classList.toggle('active');
    }

    // --- COMBINED SCROLL EVENT LISTENER ---
    window.addEventListener("scroll", function() {
        header.classList.toggle("sticky", window.scrollY > 120);
        menu.classList.remove('open');
        navList.classList.remove('active');
    });

    // --- VANILLA JS SCROLL REVEAL (AOS REPLACEMENT) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

});