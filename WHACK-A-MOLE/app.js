const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const hitsDisplay = document.querySelector('#hits')
const missesDisplay = document.querySelector('#misses')
const accuDisplay = document.querySelector('#accuracy')
const restartButton = document.querySelector('#restart-btn')

const TIME_LENGTH = 10

restartButton.addEventListener('click', startRestart)
timeLeft.textContent = TIME_LENGTH

let currentTime = TIME_LENGTH
let hits = 0
let misses = 0
let hitPosition
let moveMoleTimerId = null
let countDownTimerId = null
// TODO: have user select speed for mole to move, 
let moleSpeed = 350


function startRestart() {
  // reset timer
  clearInterval(countDownTimerId)
  currentTime = TIME_LENGTH

  // restart timer
  countDownTimerId = setInterval(countDown, 1000)
  timeLeft.textContent = currentTime

  // assign hits/misses for each square in grid
  squares.forEach(square => {
    square.addEventListener('mousedown', respondToClick)
  })

  moveMole()
}

function respondToClick() {
  if (this.id == hitPosition) {
    hits++
    hitsDisplay.textContent = hits  
  } else {
    misses++
    missesDisplay.textContent = misses
  }
  accuDisplay.textContent = hits / (hits + misses) * 100
}

// round timer
function countDown() {
  currentTime--
  timeLeft.textContent = currentTime
  if (currentTime == 0) {
    clearInterval(countDownTimerId)
    clearTimeout(moveMoleTimerId)

    squares.forEach(square => {
      square.removeEventListener('mousedown', respondToClick)
    })
  }
}

// move mole randomly around grid
function moveMole() {
  squares.forEach(square => {
    square.classList.remove('mole')
  })
  let randomSquare = squares[Math.floor(Math.random() * 9)]
  randomSquare.classList.add('mole')
  hitPosition = randomSquare.id

  //set random delay to stutter mole movement, no more than half of moleSpeed
  let delay = Math.floor(Math.random() * (moleSpeed / 2))
  moveMoleTimerId = setTimeout(moveMole, (delay + moleSpeed))
}

// TODO: hitmarker animation on hit