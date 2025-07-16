const albumContainer = document.getElementById('album-container');
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const muteBtn = document.getElementById('mute-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeBar = document.getElementById('volume-bar');
const musicControlsWrapper = document.getElementById('music-controls-wrapper');
let favoriteSongs = JSON.parse(localStorage.getItem("favorites")) || [];


let currentIndex = -1;
let songList = [];
let cardElements = []; // Store references to all cards

const albums = [
  { title: "Ve Haniya Ve Dil Janiya Udaariyaan", singer: "Danny, Avvysra, Sagar", img: "poster1.webp", song: "song1.mp3" },
  { title: "Aankho Ki Gustaakhiyan Title Track", singer: "Vishal, Jubin Nautiyal", img: "poster2.jpg", song: "song2.mp3" },
  { title: "Humsafar (From Saiyaara)", singer: "Sachet Parampara", img: "poster3.jpg", song: "song3.mp3" },
  { title: "Dhun (From Saiyaara)", singer: "Mithoon, Arijit Singh", img: "poster4.jpg", song: "song4.mp3" },
  { title: "Dil Tujhpe Aa Gaya", singer: "Stebin Ben, Payal Dev", img: "poster5.webp", song: "song5.mp3" },
  { title: "Pahuna", singer: "Sushant KC", img: "poster6.webp", song: "song6.mp3" },
  { title: "Ve Kamleya", singer: "Arijit Singh, Shreya Ghoshal", img: "poster7.webp", song: "song7.mp3" },
  { title: "Laal Pari", singer: "Honey Singh, Simar Kaur", img: "poster8.webp", song: "song8.mp3" },
  { title: "Shaky", singer: "Vaishali Samant", img: "poster9.webp", song: "song9.mp3" },
  { title: "Zamaana Lage", singer: "Arijit Singh", img: "poster10.webp", song: "song10.mp3" },
  { title: "Beqarar Yeh Dil", singer: "Asim Azhar, Qirat Haider, Shuja Haider", img: "poster11.jpg", song: "song11.mp3" },
  { title: "Ishq Hai", singer: "Romy, Amarabha", img: "poster12.webp", song: "song12.mp3" },
  { title: "Hua Main x Finding Her", singer: "Kushagra, Saaheal", img: "poster13.webp", song: "song13.mp3" },
  { title: "Raatein Guzaari", singer: "Aditya Rikhari", img: "poster14.webp", song: "song14.mp3" },
  { title: "Main Ishq Likhu", singer: "Faheem Abdullah", img: "poster15.webp", song: "song15.mp3" },
  { title: "Kesariya (From Brahmastra)", singer: "Pritam, Arijit Singh, Amitabh Bhattacharya", img: "poster16.jpg", song: "song16.mp3" },
  { title: "Tera Zikr", singer: "Darshan Raval", img: "poster17.jpg", song: "song17.mp3" },
  { title: "Pasoori", singer: "Ali Sethi, Shae Gill", img: "poster18.jpg", song: "song18.mp3" },
  { title: "Chaleya (From Jawan)", singer: "Arijit Singh, Shilpa Rao", img: "poster19.jpg", song: "song19.mp3" },
  { title: "Hawayein", singer: "Arijit Singh", img: "poster20.jpg", song: "song20.mp3" }
];

albums.forEach((album, index) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardImgWrapper = document.createElement('div');
  cardImgWrapper.classList.add('card-img-wrapper');
  cardImgWrapper.style.position = 'relative'; // so heart button stays in corner

  const albumImg = document.createElement('img');
  albumImg.src = `Poster/${album.img}`;
  albumImg.alt = album.title;
  albumImg.classList.add('album-poster');

  const playBtn = document.createElement('button');
  playBtn.classList.add('card-play-btn');
  playBtn.innerHTML = `<img src="svg/play-circle.svg" alt="Play" />`;
  playBtn.style.opacity = '0';
  playBtn.style.transform = 'translateY(20px)';
  playBtn.style.pointerEvents = 'none';
  playBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  playBtn.style.minWidth = '44px';
  playBtn.style.minHeight = '44px';
  playBtn.style.borderRadius = '50%';

  const heartBtn = document.createElement('button');
  heartBtn.classList.add('heart-btn');
  heartBtn.innerHTML = '🤍';
  Object.assign(heartBtn.style, {
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: 'white',
    zIndex: 10
  });

  const songTitle = `${album.title} — ${album.singer}`;
  if (favoriteSongs.includes(songTitle)) {
    heartBtn.innerHTML = '❤️';
  }

  heartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (favoriteSongs.includes(songTitle)) {
      favoriteSongs = favoriteSongs.filter(song => song !== songTitle);
      heartBtn.innerHTML = '🤍';
    } else {
      favoriteSongs.push(songTitle);
      heartBtn.innerHTML = '❤️';
    }
    localStorage.setItem("favorites", JSON.stringify(favoriteSongs));
    renderFavorites();
  });
  Object.assign(heartBtn.style, {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'rgba(83, 131, 240, 0.4)',
    backdropFilter: 'blur(4px)',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    fontSize: '16px',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  });


  cardImgWrapper.appendChild(albumImg);
  cardImgWrapper.appendChild(playBtn);
  cardImgWrapper.appendChild(heartBtn);

  const songTitleEl = document.createElement('h2');
  songTitleEl.classList.add('song-title');
  songTitleEl.textContent = album.title;

  const singerNameEl = document.createElement('p');
  singerNameEl.classList.add('singer-name');
  singerNameEl.textContent = album.singer;

  card.appendChild(cardImgWrapper);
  card.appendChild(songTitleEl);
  card.appendChild(singerNameEl);
  albumContainer.appendChild(card);

  songList.push(album.song);
  cardElements.push(card);

  const btnImg = playBtn.querySelector('img');

  playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex === index && !audioPlayer.paused) {
      audioPlayer.pause();
    } else {
      cardElements.forEach((c, i) => {
        const b = c.querySelector('.card-play-btn');
        const img = b.querySelector('img');
        if (i !== index) {
          img.src = 'svg/play-circle.svg';
          b.style.opacity = '0';
          b.style.transform = 'translateY(20px)';
          b.style.pointerEvents = 'none';
        }
      });

      currentIndex = index;
      playSong(album.song);
      btnImg.src = 'svg/pause-circle.svg';
      playBtn.style.opacity = '1';
      playBtn.style.transform = 'translateY(0)';
      playBtn.style.pointerEvents = 'auto';
    }
  });

  card.addEventListener('mouseenter', () => {
    const isCurrent = index === currentIndex;
    const isPlaying = !audioPlayer.paused && isCurrent;

    btnImg.src = isPlaying ? 'svg/pause-circle.svg' : 'svg/play-circle.svg';
    playBtn.style.opacity = '1';
    playBtn.style.transform = 'translateY(0)';
    playBtn.style.pointerEvents = 'auto';
  });

  card.addEventListener('mouseleave', () => {
    if (index !== currentIndex || audioPlayer.paused) {
      playBtn.style.opacity = '0';
      playBtn.style.transform = 'translateY(20px)';
      playBtn.style.pointerEvents = 'none';
    }
  });
});

function playSong(songFile) {
  cardElements.forEach((card, i) => {
    card.classList.remove('playing');
    const btn = card.querySelector('.card-play-btn');
    const btnImg = btn.querySelector('img');

    // Hide play button
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
    btn.style.transform = 'translateY(20px)';
    btn.style.transition = 'opacity 0.3s ease, transform 0.3s ease'; // ✅ add transition
    btnImg.src = 'svg/play-circle.svg';
  });

  if (currentIndex !== -1) {
    const currentCard = cardElements[currentIndex];
    currentCard.classList.add('playing');

    const playBtn = currentCard.querySelector('.card-play-btn');
    const btnImg = playBtn.querySelector('img');

    playBtn.style.opacity = '1';
    playBtn.style.pointerEvents = 'auto';
    playBtn.style.transform = 'translateY(0)';
    playBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease'; // ✅ keep transition

    btnImg.style.opacity = '1';
    btnImg.style.display = 'inline-block';
    btnImg.style.visibility = 'visible';
    btnImg.src = 'svg/pause-circle.svg';

    const currentSongName = document.getElementById('current-song-name');
    currentSongName.textContent = `${albums[currentIndex].title} — ${albums[currentIndex].singer}`;
  }

  audioPlayer.src = `music/${songFile}`;
  audioPlayer.muted = false;
  audioPlayer.play();

  musicControlsWrapper.classList.remove('hidden');
}



playPauseBtn.addEventListener('click', () => {
  if (!audioPlayer.src) return;
  audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
});

audioPlayer.addEventListener('play', () => {
  playIcon.src = 'svg/pause.svg';

  const currentCard = cardElements[currentIndex];
  if (currentCard) {
    const btn = currentCard.querySelector('.card-play-btn');
    const btnImg = btn.querySelector('img');
    btnImg.src = 'svg/pause-circle.svg';


    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
    btn.style.transform = 'translateY(0)';
  }
});


audioPlayer.addEventListener('pause', () => {
  playIcon.src = 'svg/play.svg';

  const currentCard = cardElements[currentIndex];
  if (currentCard) {
    const btn = currentCard.querySelector('.card-play-btn');
    const btnImg = btn.querySelector('img');

    btnImg.src = 'svg/play-circle.svg';
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
    btn.style.transform = 'translateY(20px)';
  }
});



nextBtn.addEventListener('click', () => {
  if (currentIndex < songList.length - 1) {
    currentIndex++;
    playSong(albums[currentIndex].song);
  }
});


prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    playSong(songList[currentIndex]);
  }
});

volumeBar.addEventListener('input', () => {
  const volumeValue = parseFloat(volumeBar.value);
  audioPlayer.volume = volumeValue;
  audioPlayer.muted = false;
  volumeIcon.src = volumeValue === 0 ? 'svg/mute.svg' : 'svg/volume.svg';
});

muteBtn.addEventListener('click', () => {
  audioPlayer.muted = !audioPlayer.muted;
  volumeIcon.src = (audioPlayer.muted || audioPlayer.volume === 0) ? 'svg/mute.svg' : 'svg/volume.svg';
});

audioPlayer.addEventListener('timeupdate', () => {
  const current = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  if (duration) {
    progressBar.value = (current / duration) * 100;
    currentTimeEl.textContent = formatTime(current);
    durationEl.textContent = formatTime(duration);
  }
});

progressBar.addEventListener('input', () => {
  if (audioPlayer.duration) {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
  }
});

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

audioPlayer.addEventListener('ended', () => {
  if (currentIndex < songList.length - 1) {
    currentIndex++;
    playSong(songList[currentIndex]);
  } else {
    audioPlayer.src = '';
    musicControlsWrapper.classList.add('hidden');
    cardElements.forEach(card => {
      card.classList.remove('playing');
      const btnImg = card.querySelector('.card-play-btn img');
      if (btnImg) btnImg.src = 'svg/play-circle.svg';
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  createLoginForm();
  createSignupForm();
  setTimeout(handleFormToggles, 300);
});

function createLoginForm() {
  const loginOverlay = document.createElement('div');
  loginOverlay.id = 'login-form';
  Object.assign(loginOverlay.style, {
    position: 'fixed',
    top: '0',
    right: '-100%',
    width: '420px',
    height: '100%',
    backgroundColor: '#1b1a3a',
    padding: '32px 24px',
    boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.5)',
    color: '#fff',
    zIndex: '1500',
    transition: 'right 0.4s ease',
  });

  const container = document.createElement('div');
  Object.assign(container.style, {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    fontFamily: 'Rubik, sans-serif',
    color: '#fff',
  });

  const closeBtn = document.createElement('p');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = 'font-size:20px;cursor:pointer;text-align:right;color:#ccc;margin-bottom:10px;';
  closeBtn.onclick = () => loginOverlay.style.right = '-100%';

  const heading = document.createElement('h2');
  heading.textContent = 'Login to Vibify';
  heading.style.textAlign = 'center';
  heading.style.color = '#1db954';

  const emailInput = document.createElement('input');
  emailInput.placeholder = 'Username or Email';
  styleInput(emailInput);

  const passwordWrapper = document.createElement('div');
  passwordWrapper.style.position = 'relative';
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'login-password';
  passwordInput.placeholder = 'Password';
  styleInput(passwordInput);
  passwordInput.style.width = '100%';

  const eye = document.createElement('span');
  eye.textContent = '👁️';
  eye.style.cssText = `
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  color: #ccc;
`;

  eye.onclick = () => togglePassword('login-password', eye);

  passwordWrapper.appendChild(passwordInput);
  passwordWrapper.appendChild(eye);

  const loginBtn = document.createElement('button');
  loginBtn.textContent = 'Log In';
  loginBtn.style.cssText = `
    background-color: #1db954; color: white; padding: 12px; border: none;
    border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer;
  `;
  loginBtn.onmouseover = () => loginBtn.style.backgroundColor = '#17a44b';
  loginBtn.onmouseout = () => loginBtn.style.backgroundColor = '#1db954';

  const signupPrompt = document.createElement('div');
  signupPrompt.style.cssText = 'margin-top:12px;font-size:14px;display:flex;gap:6px;justify-content:center;color:#ccc;';
  const span = document.createElement('span');
  span.textContent = "Don't have an account?";
  const signupRedirect = document.createElement('button');
  signupRedirect.textContent = 'Sign Up';
  signupRedirect.id = 'open-signup';
  signupRedirect.style.cssText = `
    background:none;border:none;color:#1db954;font-weight:500;cursor:pointer;
    font-size:14px;text-decoration:underline;
  `;
  signupRedirect.onmouseover = () => signupRedirect.style.color = '#1ed760';
  signupRedirect.onmouseout = () => signupRedirect.style.color = '#1db954';

  signupPrompt.appendChild(span);
  signupPrompt.appendChild(signupRedirect);

  container.append(closeBtn, heading, emailInput, passwordWrapper, loginBtn, signupPrompt);
  loginOverlay.appendChild(container);
  document.body.appendChild(loginOverlay);
}

function createSignupForm() {
  const signupOverlay = document.createElement('div');
  signupOverlay.id = 'signup-form';
  Object.assign(signupOverlay.style, {
    position: 'fixed',
    top: '0',
    right: '-100%',
    width: '500px',
    height: '100%',
    backgroundColor: '#1b1a3a',
    padding: '32px 24px',
    boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.5)',
    color: '#fff',
    zIndex: '1500',
    transition: 'right 0.4s ease',
    overflowY: 'auto',
  });

  const container = document.createElement('div');
  Object.assign(container.style, {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    fontFamily: 'Rubik, sans-serif',
    color: '#fff',
  });

  const closeBtn = document.createElement('p');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = 'font-size:20px;cursor:pointer;text-align:right;color:#ccc;margin-bottom:10px;';
  closeBtn.onclick = () => signupOverlay.style.right = '-100%';

  const heading = document.createElement('h2');
  heading.textContent = 'Create an Account';
  heading.style.cssText = 'font-size:28px;margin-bottom:10px;color:#1db954;text-align:center';

  const fullName = createInput('text', 'Full Name');
  const email = createInput('email', 'Email Address');
  const username = createInput('text', 'Username');

  const passwordWrapper = createPasswordField('signup-password', 'Password');
  const confirmWrapper = createPasswordField('confirm-password', 'Confirm Password');
  const matchMsg = document.createElement('div');
  matchMsg.id = 'password-match-msg';
  matchMsg.style.cssText = 'font-size:13px;margin-top:-10px;margin-bottom:5px;font-weight:500';

  confirmWrapper.querySelector('input').addEventListener('input', () => {
    const p1 = passwordWrapper.querySelector('input').value;
    const p2 = confirmWrapper.querySelector('input').value;
    if (!p2) {
      matchMsg.textContent = '';
    } else if (p1 === p2) {
      matchMsg.textContent = 'Password Match';
      matchMsg.style.color = '#1db954';
    } else {
      matchMsg.textContent = 'Password Not Match';
      matchMsg.style.color = '#f55';
    }
  });

  const dobLabel = createLabel('Date of Birth');
  const dobInput = createInput('date', '');
  dobInput.id = 'dob';

  const genderLabel = createLabel('Gender');
  const genderSelect = createSelect('gender', ['Select Gender', 'Male', 'Female', 'Other']);

  const countryLabel = createLabel('Country');
  const countrySelect = createSelect('country', ['Select Country', 'India', 'United States', 'United Kingdom', 'Canada', 'Australia']);

  const signupBtn = document.createElement('button');
  signupBtn.textContent = 'Sign Up';
  signupBtn.style.cssText = `
    background-color: #1db954; color: white; padding: 12px; border: none;
    border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer;
  `;
  signupBtn.onmouseover = () => signupBtn.style.backgroundColor = '#17a44b';
  signupBtn.onmouseout = () => signupBtn.style.backgroundColor = '#1db954';

  const loginPrompt = document.createElement('div');
  loginPrompt.style.cssText = 'margin-top:12px;font-size:14px;display:flex;gap:6px;justify-content:center;color:#ccc;';
  const span = document.createElement('span');
  span.textContent = 'Already have an account?';
  const loginRedirect = document.createElement('button');
  loginRedirect.textContent = 'Login';
  loginRedirect.id = 'back-to-login';
  loginRedirect.style.cssText = `
    background:none;border:none;color:#1db954;font-weight:500;cursor:pointer;
    font-size:14px;text-decoration:underline;
  `;
  loginRedirect.onmouseover = () => loginRedirect.style.color = '#1ed760';
  loginRedirect.onmouseout = () => loginRedirect.style.color = '#1db954';

  loginPrompt.append(span, loginRedirect);

  container.append(
    closeBtn,
    heading,
    fullName,
    email,
    username,
    passwordWrapper,
    confirmWrapper,
    matchMsg,
    dobLabel,
    dobInput,
    genderLabel,
    genderSelect,
    countryLabel,
    countrySelect,
    signupBtn,
    loginPrompt
  );

  signupOverlay.appendChild(container);
  document.body.appendChild(signupOverlay);
}

function handleFormToggles() {
  const loginOverlay = document.getElementById('login-form');
  const signupOverlay = document.getElementById('signup-form');

  document.getElementById('login-toggle')?.addEventListener('click', (e) => {
    e.preventDefault();
    loginOverlay.style.right = '0';
    signupOverlay.style.right = '-100%';
  });

  document.querySelector('.signup-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    signupOverlay.style.right = '0';
    loginOverlay.style.right = '-100%';
  });

  document.getElementById('open-signup')?.addEventListener('click', () => {
    loginOverlay.style.right = '-100%';
    signupOverlay.style.right = '0';
  });

  document.getElementById('back-to-login')?.addEventListener('click', () => {
    signupOverlay.style.right = '-100%';
    loginOverlay.style.right = '0';
  });
}


function styleInput(input) {
  Object.assign(input.style, {
    padding: '10px 14px',
    border: '1px solid #333',
    borderRadius: '6px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
  });
  input.onfocus = () => input.style.border = '1px solid #1db954';
  input.onblur = () => input.style.border = '1px solid #333';
}

function togglePassword(fieldId, iconEl) {
  const input = document.getElementById(fieldId);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  iconEl.textContent = isPassword ? '🙈' : '👁️';
}

function createInput(type, placeholder) {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  styleInput(input);
  return input;
}

function createLabel(text) {
  const label = document.createElement('label');
  label.textContent = text;
  label.style.cssText = 'font-size:14px;margin-top:5px;color:#bbb;';
  return label;
}

function createSelect(id, options) {
  const select = document.createElement('select');
  select.id = id;
  styleInput(select);
  options.forEach((opt, i) => {
    const option = document.createElement('option');
    option.textContent = opt;
    option.value = i === 0 ? '' : opt.toLowerCase();
    option.style.backgroundColor = '#222';
    option.style.color = 'white';
    select.appendChild(option);
  });
  return select;
}

function createPasswordField(id, placeholder) {
  const wrapper = document.createElement('div');
  wrapper.style.position = 'relative';
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';

  const input = document.createElement('input');
  input.type = 'password';
  input.id = id;
  input.placeholder = placeholder;
  styleInput(input);
  input.style.width = '100%';

  const toggle = document.createElement('span');
  toggle.textContent = '👁️';
  toggle.style.cssText = 'position:absolute;right:12px;cursor:pointer;font-size:18px;user-select:none;color:#ccc;';
  toggle.onclick = () => togglePassword(id, toggle);

  wrapper.append(input, toggle);
  return wrapper;
}




function applyResponsiveStyles() {
  const screenWidth = window.innerWidth;

  // Album container responsive grid
  albumContainer.style.display = 'grid';
  albumContainer.style.gap = '16px';
  if (screenWidth < 500) {
    albumContainer.style.gridTemplateColumns = '1fr';
  } else if (screenWidth < 768) {
    albumContainer.style.gridTemplateColumns = '1fr 1fr';
  } else if (screenWidth < 1024) {
    albumContainer.style.gridTemplateColumns = '1fr 1fr 1fr';
  } else {
    albumContainer.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';
  }

  // Music controls wrapper responsive layout
  musicControlsWrapper.style.flexWrap = screenWidth < 600 ? 'wrap' : 'nowrap';
  musicControlsWrapper.style.justifyContent = 'center';
  musicControlsWrapper.style.alignItems = 'center';
  musicControlsWrapper.style.gap = '12px';

  // Login/Signup forms full width on mobile
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  if (loginForm) loginForm.style.width = screenWidth < 600 ? '100%' : '420px';
  if (signupForm) signupForm.style.width = screenWidth < 600 ? '100%' : '500px';
}

// Initial apply
window.addEventListener('DOMContentLoaded', applyResponsiveStyles);
// Re-apply on resize
window.addEventListener('resize', applyResponsiveStyles);
