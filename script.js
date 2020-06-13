const musicContainer = document.getElementById('music-container')

const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')


const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const title = document.getElementById('title')
const cover = document.getElementById('cover')

// Song titles

const songs = [{
    name: '9ALBI PRIVE',
    audio: 'music/9ALBI_PRIVE.mp3',
    cover: 'images/9ALBI_PRIVE.jpg'
},
{
    name: 'REPRESSION',
    audio: 'music/REPRESSION.mp3',
    cover: 'images/REPRESSION.jpg'
},
{
    name: 'UNA PASSIONE',
    audio: 'music/UNA_PASSIONE.mp3',
    cover: 'images/UNA_PASSIONE.jpg'
}]

// Keep track of song
let songIndex = 2

// Initially load song details into DOM
loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
    title.innerText = song.name
    audio.src = song.audio
    cover.src = song.cover
}

// Play song
function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    audio.pause()
}

// Previous song
function prevSong() {
    if (Number.isInteger(songIndex))
        songIndex = songIndex <= 0 ? songs.length - 1 : songIndex - 1
    else
        songIndex = songs.length - 1;


    loadSong(songs[songIndex])

    playSong()
}

// Next song
function nextSong() {
    if (Number.isInteger(songIndex))
        songIndex = songIndex >= songs.length - 1 ? 0 : songIndex + 1
    else
        songIndex = songs.length + 1;


    loadSong(songs[songIndex])

    playSong()
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX;
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) pauseSong()
    else playSong()
})


// Change song

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)


// Time song Update event
audio.addEventListener('timeupdate', updateProgress)

// Click on progress bar
progressContainer.addEventListener('click', setProgress)


// Song end
audio.addEventListener('ended', nextSong)