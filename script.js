/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full_screen');
let windowWidth = window.width;

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
}
function updateButton() {
  const icon = this.paused ?  '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
  //console.log('Update the button');
}
function skip() {
  console.log(this.dataset);
  console.log(this.dataset.skip);
  console.log(video.currentTime);
  video.currentTime += Number(this.dataset.skip);
}
function handleRangeUpdate() {
  // console.log(this.name);
  // console.log(video.volume);
  // console.log(video.playbackRate);
  // console.log(this.value);
  video[this.name] = this.value;
  // if (this.name === 'volume') {
  //   video.volume = this.value;
  // } else {
  //   video.playbackRate = this.value;
  // }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
function handleFull() {
  if (fullscreen === false) {
    fullscreen = true;
  } else {
    fullscreen = false;
  }
  if (fullscreen) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  //  player.classList.add('full__screen');
  // player.style.position = 'fixed';
  // player.style.right = '0';
  // player.style.bottom = '0';
  // player.style.minWidth = '100%';
  // player.style.minHeight = '100%';
  // player.style.width = 'auto';
  // player.style.height = 'auto';
} else {
  //player.classList.remove('full__screen');
  // player.style.position = '';
  // player.style.right = '';
  // player.style.bottom = '';
  // player.style.minWidth = '';
  // player.style.minHeight = '';
  // player.style.width = '';
  // player.style.height = '';
}
  //player.style.zIndex = '-100';

  // player.style.width = '100%';
  // player.style.height = '100%';
  // player.style.position = 'absolute';
  // player.style.left = '0';
  // player.style.top = '0';
  // player.style.right = '0';
  // player.style.bottom = '0';
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

let fullscreen = false;
fullScreen.addEventListener('click', handleFull);
