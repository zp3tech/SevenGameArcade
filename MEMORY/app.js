const cardArray = [
  {
    name: 'fries',
    img: 'images/fries.png',
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png',
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png',
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.png',
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png',
  },
  {
    name: 'pizza',
    img: 'images/pizza.png',
  },
  {
    name: 'fries',
    img: 'images/fries.png',
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png',
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png',
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.png',
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png',
  },
  {
    name: 'pizza',
    img: 'images/pizza.png',
  },
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img')
    card.setAttribute('src', 'images/blank.png')
    card.setAttribute('data-id', i)
    card.addEventListener('click', flipCard)
    gridDisplay.appendChild(card)
  }
}

createBoard()

function checkMatch() {
  const cards = document.querySelectorAll('#grid img')
  const cardOne = cardsChosenIds[0]
  const cardTwo = cardsChosenIds[1]

  if (cardOne == cardTwo) {
    alert('You clicked the same image')
    cards[cardOne].setAttribute('src', 'images/blank.png')
    cards[cardTwo].setAttribute('src', 'images/blank.png')
  } else if (cardsChosen[0] == cardsChosen[1]) {
    alert('You found a match!')
    cards[cardOne].setAttribute('src', 'images/white.png')
    cards[cardTwo].setAttribute('src', 'images/white.png')
    cards[cardOne].removeEventListener('click', flipCard)
    cards[cardTwo].removeEventListener('click', flipCard)
    cardsWon.push(cardsChosen)
  } else {
    cards[cardOne].setAttribute('src', 'images/blank.png')
    cards[cardTwo].setAttribute('src', 'images/blank.png')
  }
  resultDisplay.textContent = cardsWon.length

  cardsChosen = []
  cardsChosenIds = []

  if (cardsWon.length == cardArray.length / 2) { 
    resultDisplay.textContent = 'Congrats, you found them all!'
  }
}

function flipCard() {
  const cardId = this.getAttribute('data-id')
  cardsChosen.push(cardArray[cardId].name)
  cardsChosenIds.push(cardId)
   
  this.setAttribute('src', cardArray[cardId].img)

  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500)
  }
}