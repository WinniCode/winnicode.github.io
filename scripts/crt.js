document.addEventListener("DOMContentLoaded", () => {
  const videoElement = document.getElementById("crt-video");

  // Dynamically build video paths from 1.mp4 to 23.mp4
  const videoPaths = Array.from({ length: 44 }, (_, i) => `assets/c/${i + 1}.mp4`);

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

  function playNextVideo() {
    videoElement.classList.remove("fade-in");
    videoElement.classList.add("fade-out");

    videoElement.onended = null;

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % playlist.length;
      if (currentIndex === 0) {
        playlist = shuffle(videoPaths);
      }

      videoElement.src = playlist[currentIndex];
      videoElement.load();
      videoElement.play();

      videoElement.classList.remove("fade-out");
      videoElement.classList.add("fade-in");

      videoElement.onended = playNextVideo;
    }, 500); // Transition delay
  }

  // Start
  videoElement.src = playlist[currentIndex];
  videoElement.classList.add("fade-in");
  videoElement.onended = playNextVideo;
  videoElement.play();
});
