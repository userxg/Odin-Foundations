window.addEventListener('keydown', (e) => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

    if (!audio) return;
    
    if (audio.paused) {
        audio.play();
        console.log(key);
        key.classList.toggle('playing');
    } else {
        audio.pause();
        key.classList.toggle('playing');
    }
    console.log(audio);

    
    if (key.classList.contains('playing')) {
        
    }
});