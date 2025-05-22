const playlistEl = document.getElementById('playlist');
const player = document.getElementById('player');
let currentIndex = 0;
let tracks = [];

console.log('App JS loaded');

// Fetch and render playlist
fetch('https://musikai.coltonscottt.workers.dev/')
  .then(res => res.json())
  .then(data => {
    tracks = data;
    playlistEl.innerHTML = tracks.map((track, index) =>
      `<li tabindex="0" data-index="${index}">${track.title} - ${track.artist}</li>`
    ).join('');
    updateFocus();
  })
  .catch(err => {
    console.error('Error fetching playlist:', err);
    playlistEl.innerHTML = '<li>Failed to load playlist</li>';
  });

// Focus visual cue
function updateFocus() {
  const items = Array.from(playlistEl.querySelectorAll('li'));
  items.forEach((item, i) => {
    item.style.background = i === currentIndex ? '#444' : 'transparent';
    if (i === currentIndex) item.focus();
  });
}

// Listen for D-pad navigation & play
document.addEventListener('keydown', e => {
  const items = Array.from(playlistEl.querySelectorAll('li'));
  if (!items.length) return;

  if (e.key === 'ArrowDown') {
    currentIndex = (currentIndex + 1) % items.length;
    updateFocus();
    console.log('Moved down to:', currentIndex);
  } else if (e.key === 'ArrowUp') {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateFocus();
    console.log('Moved up to:', currentIndex);
  } else if (e.key === 'Enter') {
    const track = tracks[currentIndex];
    console.log("Playing track:", track.title);

    player.src = track.url;
    player.load(); // Helps force reload on some KaiOS devices

    const playPromise = player.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => console.log("Playback started"))
        .catch(err => console.error("Playback error:", err));
    }
  }
});


/* const playlistEl = document.getElementById('playlist');
const player = document.getElementById('player');
let currentIndex = 0;
let tracks = [];

console.log('App JS loaded');

// Fetch and render playlist
fetch('https://musikai.coltonscottt.workers.dev/')
  .then(res => res.json())
  .then(data => {
    tracks = data;
    playlistEl.innerHTML = tracks.map((track, index) =>
      `<li tabindex="0" data-index="${index}">${track.title} - ${track.artist}</li>`
    ).join('');
    updateFocus();
  })
  .catch(err => {
    console.error('Error fetching playlist:', err);
    playlistEl.innerHTML = '<li>Failed to load playlist</li>';
  });

function playTrack(index) {
  const track = tracks[index];
  console.log('Playing:', track);
  player.src = track.url;
  player.play();
}

function updateFocus() {
  const items = Array.from(playlistEl.querySelectorAll('li'));
  items.forEach((item, i) => {
    if (i === currentIndex) {
      item.focus();
    }
  });
}

// Listen for D-pad navigation & play
document.addEventListener('keydown', e => {
  const items = Array.from(playlistEl.querySelectorAll('li'));
  if (!items.length) return;

  if (e.key === 'ArrowDown') {
    currentIndex = (currentIndex + 1) % items.length;
    updateFocus();
    console.log('Moved down to:', currentIndex);
  } else if (e.key === 'ArrowUp') {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateFocus();
    console.log('Moved up to:', currentIndex);
  } else if (e.key === 'Enter') {
    console.log("Playing track:", tracks[currentIndex].title);
    playTrack(currentIndex);
  }
});

*/