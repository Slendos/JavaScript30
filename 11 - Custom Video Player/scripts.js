const playButton = document.querySelector(".toggle");
const video = document.querySelector(".viewer");
const volumeSlider = document.querySelector('input[name="volume"]');
const speedSlider = document.querySelector('input[name="playbackRate"]');
const skippingButton = document.querySelectorAll('.skip__button');
const fillingProgress = document.querySelector('.progress__filled');
const progressSlider = document.querySelector(".progress");

fillingProgress.style.flexBasis = "0%";

console.log(volumeSlider);
let running = false;

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// play and stop video
function playVideo()
{
    if(running == true)
    {
        video.pause();
        running = false;
        playButton.innerHTML = "❚❚";
    }
    else 
    {
        video.play();
        running = true;
        playButton.innerHTML = "►";
    }  
}

function skipTime()
{
    let skippingValue = parseInt(this.dataset.skip);
    video.currentTime = videoTime + skippingValue;
}

// changing volume with slider
function changeVolume()
{
    const volumeValue = this.value;
    video.volume = volumeValue;
}

// changing speed with slider
function changeSpeed()
{
    const speedValue = this.value;
    video.playbackRate = speedValue;
}

// filling slider
function changeProgress()
{
    const videoLength = video.duration;
    const videoCurrentTime = video.currentTime;
    let progress = map_range(videoCurrentTime, 0, videoLength, 0, 100);
    fillingProgress.style.flexBasis = `${progress}%`;
}

// move time after clicking on slider
function moveProgress(e)
{
    posX = e.clientX;
    let position = map_range(posX, 375, 1008, 0, 100);
    const videoLength = video.duration;
    let timeVideo = map_range(position, 0, 100, 0, videoLength);
    video.currentTime = timeVideo;
}

playButton.addEventListener("click", playVideo);
skippingButton.forEach(button => button.addEventListener("click", skipTime));

volumeSlider.addEventListener("change", changeVolume);
volumeSlider.addEventListener("mousemove", changeVolume);
speedSlider.addEventListener("change", changeSpeed);
speedSlider.addEventListener("mousemove", changeSpeed);
progressSlider.addEventListener('click', moveProgress);

video.addEventListener('timeupdate', changeProgress);
video.addEventListener('click', playVideo);

