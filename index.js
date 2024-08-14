window.onload = () => {
    const videoContainer = document.querySelector('.video-container');
    const video = document.getElementById("video");
    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const play2Btn = document.getElementById("play2Btn");

    let hidePauseTimeout;

    // Function to split video file into smaller parts
    function splitVideo(file, chunkSize) {
        const fileSize = file.size;
        let start = 0;
        let index = 0;

        while (start < fileSize) {
            const chunk = file.slice(start, start + chunkSize);
            const chunkFileName = `video_part_${index}.mp4`;

            // Example of creating a download link for each chunk
            const link = document.createElement('a');
            link.href = URL.createObjectURL(chunk);
            link.download = chunkFileName;
            link.innerText = `Download ${chunkFileName}`;
            document.body.appendChild(link);
            document.body.appendChild(document.createElement('br'));

            start += chunkSize;
            index++;
        }
    }

    // Split the video when the page loads
    document.getElementById('video').addEventListener('loadeddata', () => {
        const videoFile = video.querySelector('source').src;

        // Fetch the video as a Blob object
        fetch(videoFile)
            .then(response => response.blob())
            .then(blob => {
                // Split the video into 100MB parts
                const chunkSize = 100 * 1024 * 1024;
                splitVideo(blob, chunkSize);
            });
    });

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
};
