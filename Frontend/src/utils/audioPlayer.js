let currentAudio = null;

export const controlAudio = (previewUrl) => {
  // Stop the current audio if it's playing
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Start new audio
  if (previewUrl) {
    currentAudio = new Audio(previewUrl);
    currentAudio.play().catch((err) => {
      console.error("Audio play error:", err);
    });
  }
};
