const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  toggle.innerHTML = document.body.classList.contains('dark-theme') ? '☼' : '◐';
});
toggle.innerHTML = document.body.classList.contains('dark-theme') ? '☼' : '◐';

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressCircle = playPauseBtn?.querySelector('circle.progress');
const radius = 20;
const circumference = 2 * Math.PI * radius;

if (progressCircle) {
  progressCircle.style.strokeDasharray = `${circumference}`;
  progressCircle.style.strokeDashoffset = `${circumference}`;
}

function updateProgress() {
  if (audio && audio.duration && progressCircle) {
    const percent = audio.currentTime / audio.duration;
    progressCircle.style.strokeDashoffset = circumference * (1 - percent);
  }
}

function loadAudioState() {
  const time = sessionStorage.getItem('audio-time');
  const isPlaying = sessionStorage.getItem('audio-playing');
  if (time) audio.currentTime = parseFloat(time);
  if (isPlaying === 'true') audio.play();
}

if (playPauseBtn) {
  playPauseBtn.addEventListener('click', () => {
    if (audio.paused || audio.ended) {
      audio.play();
      playPauseBtn.classList.add('playing');
    } else {
      audio.pause();
      playPauseBtn.classList.remove('playing');
    }
  });
}

audio.addEventListener('timeupdate', () => {
  updateProgress();
  sessionStorage.setItem('audio-time', audio.currentTime);
});
audio.addEventListener('play', () => {
  playPauseBtn?.classList.add('playing');
  sessionStorage.setItem('audio-playing', 'true');
});
audio.addEventListener('pause', () => {
  playPauseBtn?.classList.remove('playing');
  sessionStorage.setItem('audio-playing', 'false');
});

loadAudioState();
