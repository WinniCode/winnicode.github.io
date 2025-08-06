document.addEventListener("DOMContentLoaded", () => {
  const videoElement = document.getElementById("crt-video");

  // Dynamically build video paths from 1.mp4 to 46.mp4
  const videoPaths = Array.from({ length: 46 }, (_, i) => `assets/c/${i + 1}.mp4`);

  // Fisher-Yates shuffle
  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  let playlist = shuffle(videoPaths);
  let currentIndex = 0;
  let shortVideoTimeout = null;

  function playNextVideo() {
    videoElement.classList.remove("fade-in");
    videoElement.classList.add("fade-out");

    // Clear previous onended and timeout
    videoElement.onended = null;
    if (shortVideoTimeout) {
      clearTimeout(shortVideoTimeout);
      shortVideoTimeout = null;
    }

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % playlist.length;
      if (currentIndex === 0) {
        playlist = shuffle(videoPaths);
      }

      const nextSrc = playlist[currentIndex];
      videoElement.src = nextSrc;

      // Wait for metadata to check duration
      videoElement.onloadedmetadata = () => {
        const duration = videoElement.duration;

        if (duration < 2) {
          // If very short, loop it and break after 5 sec
          videoElement.loop = true;
          shortVideoTimeout = setTimeout(() => {
            videoElement.loop = false;
            playNextVideo();
          }, 5000);
        } else {
          // Normal video behavior
          videoElement.loop = false;
          videoElement.onended = playNextVideo;
        }

        videoElement.classList.remove("fade-out");
        videoElement.classList.add("fade-in");
        videoElement.play();
      };
    }, 500); // Delay for transition
  }

  // Start
  videoElement.src = playlist[currentIndex];
  videoElement.classList.add("fade-in");

  videoElement.onloadedmetadata = () => {
    const duration = videoElement.duration;

    if (duration < 2) {
      videoElement.loop = true;
      shortVideoTimeout = setTimeout(() => {
        videoElement.loop = false;
        playNextVideo();
      }, 5000);
    } else {
      videoElement.loop = false;
      videoElement.onended = playNextVideo;
    }

    videoElement.play();
  };
});
