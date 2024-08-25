const video = document.getElementById('video');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const play2Btn = document.getElementById('play2Btn');

// Define the time ranges for each "segment" of the video (in seconds)
const segments = [
    { start: 0, end: 30 },  // First 30 seconds
    { start: 30, end: 60 }  // Next 30 seconds
];
let currentSegment = 0;

playBtn.addEventListener('click', playSegment);
pauseBtn.addEventListener('click', pauseVideo);
play2Btn.addEventListener('click', playSegment);

video.addEventListener('timeupdate', checkSegmentEnd);

function playSegment() {
    // Set the video's current time to the start of the current segment
    video.currentTime = segments[currentSegment].start;
    video.play();

    // Update button visibility
    playBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    play2Btn.classList.add('hidden');
}

function pauseVideo() {
    video.pause();

    // Update button visibility
    playBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    play2Btn.classList.remove('hidden');
}

function checkSegmentEnd() {
    // Check if the video has reached the end of the current segment
    if (video.currentTime >= segments[currentSegment].end) {
        video.pause();
        video.currentTime = segments[currentSegment].end; // Ensure video doesn't exceed this segment

        // Update button visibility
        playBtn.classList.add('hidden');
        pauseBtn.classList.add('hidden');
        play2Btn.classList.remove('hidden');

        // Move to the next segment for the next play
        if (currentSegment < segments.length - 1) {
            currentSegment++;
        } else {
            // If the last segment ends, reset to the first segment
            currentSegment = 0;
        }
    }
}



    // Play button logic with fullscreen request
    playBtn.addEventListener('click', () => {
        requestFullscreen(videoContainer); // Request fullscreen mode
        video.play();
        playBtn.classList.add('hidden'); // Hide primary play button
        // The pause button will be shown when clicking anywhere on the screen
        document.addEventListener('click', showPauseBtn);
    });

    play2Btn.addEventListener('click', () => {
        requestFullscreen(videoContainer); // Request fullscreen mode
        video.play();
        play2Btn.classList.add('hidden'); // Hide secondary play button
        // The pause button will be shown when clicking anywhere on the screen
        document.addEventListener('click', showPauseBtn);
    });

    // Pause button logic
    pauseBtn.addEventListener('click', () => {
        if (!video.paused) {
            video.pause();
            play2Btn.classList.remove('hidden'); // Show secondary play button
            pauseBtn.classList.add('hidden'); // Hide pause button
            resetHidePauseTimeout(); // Reset timeout when clicking the pause button
        }
    });

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

    // Function to show the pause button and set a timeout to hide it
    function showPauseBtn(event) {
        if (!video.paused) {
            pauseBtn.classList.remove('hidden'); // Show pause button
            resetHidePauseTimeout(); // Reset the timeout each time the button is shown
        }
    }

    // Reset the timeout to hide the pause button
    function resetHidePauseTimeout() {
        clearTimeout(hidePauseTimeout); // Clear any existing timeout
        hidePauseTimeout = setTimeout(() => {
            pauseBtn.classList.add('hidden'); // Hide the pause button after 5 seconds
        }, 3000); // 3000 milliseconds = 3 seconds
    }

    // Initial setup for hide timeout
    video.addEventListener('play', () => {
        pauseBtn.classList.add('hidden'); // Hide pause button when video starts playing
        resetHidePauseTimeout(); // Start the timeout to hide the pause button
    });

    video.addEventListener('pause', () => {
        pauseBtn.classList.add('hidden'); // Hide pause button when video is paused
        clearTimeout(hidePauseTimeout); // Clear the timeout if the video is paused
    });

function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("overlayNav").classList.toggle("change");
    document.getElementById("menu").classList.toggle("change"); 

    // Move play and pause buttons along with the menu icon
    document.getElementById("playBtn").classList.toggle("change");
    document.getElementById("pauseBtn").classList.toggle("change");
    document.getElementById("play2Btn").classList.toggle("change");
}

function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("overlayNav").classList.toggle("change");
    document.getElementById("menu").classList.toggle("change");

    // Add or remove the 'menu-open' class to handle button movement independently
    document.body.classList.toggle("menu-open");
}


