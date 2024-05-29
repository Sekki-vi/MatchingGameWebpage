var images = new Array();

images[0] = new Image();
images[0].src = 'assets/img1.webp';

images[1] = new Image();
images[1].src = 'assets/img2.webp';

images[2] = new Image();
images[2].src = 'assets/img3.webp';

images[3] = new Image();
images[3].src = 'assets/img4.jpeg';

images[4] = new Image();
images[4].src = 'assets/img5.jpeg';

images[5] = new Image();
images[5].src = 'assets/img6.jpeg';

images[6] = new Image();
images[6].src = 'assets/img7.png';

images[7] = new Image();
images[7].src = 'assets/img8.jpeg';

images[8] = new Image();
images[8].src = 'assets/img9.jpeg';

images[9] = new Image();
images[9].src = 'assets/img10.jpeg';

images = images.concat([...images]);

const gameContainer = document.getElementById("game-container");
let chosenCards = [];
let timer;
let isFlipped = false;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createGameBoard() {
    shuffleArray(images);

    for (let i = 0; i < images.length; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.index = i;
        card.addEventListener("click", handleCardClick);
        gameContainer.appendChild(card);
    }
}

const initialTime = 150;
let remainingTime = initialTime;
let matchedPairs = 0;
const totalPairs = images.length / 2;

function updateTimerDisplay() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `Time: ${remainingTime}s`;
}

function startTimer() {
  updateTimerDisplay();

  timer = setInterval(() => {
      remainingTime--;

      if (remainingTime <= 0) {
          clearInterval(timer);
          alert("Game Over! Time's up!");
      }

      updateTimerDisplay();
  }, 1000);
}

function startGame() {
    clearInterval(timer);
    remainingTime = initialTime;
    gameContainer.innerHTML = "";
    createGameBoard();
    startTimer();
  }
  
  
  function handleCardClick(event) {
    if (isFlipped) return;
    const selectedCard = event.target;
    const index = selectedCard.dataset.index;
  
    if (!chosenCards.includes(index)) {
      chosenCards.push(index);
      selectedCard.style.backgroundImage = `url('${images[index].src}')`;
    }
  
    if (chosenCards.length === 2) {
      checkMatch();
    }
  }
  
  function checkMatch() {
    const [index1, index2] = chosenCards;
    const cards = document.querySelectorAll(".card");
  
    if (images[index1] === images[index2]) {
      chosenCards = [];
      matchedPairs++;

      if (matchedPairs === totalPairs) {
        clearInterval(timer);
        alert("All matches found! You win!");
      }

    } else {
      isFlipped = true;
      setTimeout(() => {
        cards[index1].style.backgroundImage = `url('assets/backcard.png')`;
        cards[index2].style.backgroundImage = `url('assets/backcard.png')`;
        chosenCards = [];
        isFlipped = false;
      }, 1000);
    }
  }

  startGame();