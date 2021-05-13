document.getElementById('roll').addEventListener('click', rollDice);
document.getElementById('hold').addEventListener('click', holdScore);
document.getElementById('new').addEventListener('click', newGame);

let diceSound = new sound('dice-sound.mp3');
let winning = new sound('wining.mp3');
let scores, currentScores, activeGame;
let activePlayer = 0

newGame();

function rollDice() {
    if (!activeGame) return
    document.getElementById('rolldice-0').style.display = 'inline-block';
    let image = document.getElementById('rolldice-0');
    image.classList.add('imageSpin');
    diceSound.play();
    setTimeout(() => {
        let diceNumer = Math.floor(Math.random() * 6) + 1;
        let scr = 'dice-' + diceNumer + '.png';
        image.src = scr
        image.classList.remove('imageSpin')
        handleScore(diceNumer);
        diceSound.stop();
    }, 500)
}

function handleScore(score) {
    if (score === 1) {
        nextplayer();
    } else {
        currentScores += score
        document.getElementById('current-score-' + activePlayer).textContent = currentScores;
    }
    console.log({ currentScores, activePlayer })
}

function nextplayer() {
    currentScores = 0
    document.getElementById('current-score-0').textContent = 0
    document.getElementById('current-score-1').textContent = 0
    activePlayer = !activePlayer * 1
    document.getElementById('player-0').classList.toggle('active');
    document.getElementById('player-1').classList.toggle('active');
    document.getElementById('rolldice-0').style.display = 'none';
}

function holdScore() {
    if (!activeGame) return;
    scores[activePlayer] += currentScores;
    currentScores = 0;
    document.getElementById('current-score-' + activePlayer).textContent = currentScores;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    let winscore = document.getElementById('winscore').value;
    if (!winscore) { alert('Please Enter any Target Score'); return }
    if (scores[activePlayer] >= winscore) {
        activeGame = false;
        winning.play()
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.getElementById('name-' + activePlayer).classList.add('blink');
        return
    }
    nextplayer();
}

function newGame() {
    scores = [0, 0];
    currentScores = 0;
	activePlayer = 0;
    activeGame = true;
    winning.stop()
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.getElementById('player-0').classList.remove('active');
    document.getElementById('player-1').classList.remove('active');
    document.getElementById('player-0').classList.add('active');
    document.getElementById('name-0').classList.remove('blink');
    document.getElementById('name-1').classList.remove('blink');
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-score-0').textContent = currentScores;
    document.getElementById('current-score-1').textContent = currentScores;
    document.getElementById('rolldice-0').style.display = 'none';
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
        this.sound.currentTime = 0
    }
}

