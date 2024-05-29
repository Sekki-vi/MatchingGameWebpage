var images = new Array();

// Add images with different file types
images.push(new Image('assets/img1.webp'));
images.push(new Image('assets/img2.webp'));
images.push(new Image('assets/img3.webp'));
images.push(new Image('assets/img4.jpeg'));
images.push(new Image('assets/img5.jpeg'));
images.push(new Image('assets/img6.jpeg'));
images.push(new Image('assets/img7.png'));
images.push(new Image('assets/img8.jpeg'));

// Duplicate the array to create pairs
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
        card.style.backgroundImage = `url('${images[i].src}')`;
        card.addEventListener("click", handleCardClick);
        gameContainer.appendChild(card);
    }
}
function startGame(difficulty) {
    chosenCards = [];
    clearInterval(timer);
    isFlipped = false;
  
    gameContainer.innerHTML = "";
    createGameBoard();
  
    setTimeout(() => {
      flipAllCards();
      setTimeout(() => {
        flipAllCards();
        startTimer(difficulty);
      }, 1000);
    }, 1000);
  }
  
  function startTimer(seconds) {
    timer = setInterval(() => {
      clearInterval(timer);
      flipAllCards();
      setTimeout(() => {
        flipAllCards();
        isFlipped = false;
      }, 1000);
    }, seconds * 1000);
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

      //cards[index1].removeEventListener("click", handleCardClick);
      //cards[index2].removeEventListener("click", handleCardClick);
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
  
  function flipAllCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.toggle("hidden");
    });
  }
  
  // Adjust difficulty level as needed
  startGame(8);