// Select the video elements and control buttons
const video = document.getElementById('video');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const play2Btn = document.getElementById('play2Btn');
const homeBtn = document.getElementById('homeBtn');
const videoContainer = document.querySelector('.video-container');
let hideButtonsTimeout; // Timer to hide buttons after inactivity

// Function to request fullscreen
function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

// Function to hide control buttons
function hideControlButtons() {
    homeBtn.classList.add('hidden');
    pauseBtn.classList.add('hidden');
    play2Btn.classList.add('hidden');
    playBtn.classList.add('hidden');
}

// Function to show control buttons
function showControlButtons() {
    clearTimeout(hideButtonsTimeout);
    homeBtn.classList.remove('hidden');
    pauseBtn.classList.remove('hidden');

    // Hide buttons after 1.5 seconds of inactivity
    hideButtonsTimeout = setTimeout(hideControlButtons, 1500);
}

// Initial setup: Hide buttons except for play
hideControlButtons();
playBtn.classList.remove('hidden'); // Ensure the play button is visible initially

// Play button click handler
playBtn.addEventListener('click', () => {
    requestFullscreen(videoContainer); // Request fullscreen on play
    video.play();
    hideControlButtons(); // Hide all buttons while playing
});

// Pause button click handler
pauseBtn.addEventListener('click', () => {
    video.pause();
    pauseBtn.classList.add('hidden'); // Hide the pause button
    play2Btn.classList.remove('hidden'); // Show the play2 button
    showControlButtons(); // Ensure home button is visible
});

// Play2 button click handler (for resuming)
play2Btn.addEventListener('click', () => {
    video.play();
    hideControlButtons(); // Hide all buttons when resumed
});

// Ensure buttons are hidden when videos start playing
video.addEventListener('play', hideControlButtons);

// Ensure buttons are shown when videos are paused
video.addEventListener('pause', showControlButtons);

// Show pause button when the user clicks anywhere on the screen
document.addEventListener('click', () => {
    if (!video.paused) {
        showControlButtons();
    }
});

// Prevent clicks on the control buttons from hiding them immediately
homeBtn.addEventListener('click', (event) => event.stopPropagation());
pauseBtn.addEventListener('click', (event) => event.stopPropagation());
play2Btn.addEventListener('click', (event) => event.stopPropagation());

homeBtn.addEventListener('click', () => {
    window.location.href = 'index.html'; // Navigate to index.html
});

function menuOnClick() {
    const overlayNav = document.getElementById('overlayNav');
    overlayNav.classList.toggle('change'); // Toggle the 'change' class to show/hide the menu
    const menuBar = document.getElementById('menu-bar');
    menuBar.classList.toggle('change');
}

