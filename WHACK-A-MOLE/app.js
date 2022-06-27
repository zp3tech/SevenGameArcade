const squares = document.querySelectorAll('.square')
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
let moleSpeed = 350

function startRestart() {
  // reset hits & misses display
  hits = 0
  misses = 0
  hitsDisplay.textContent = 0
  missesDisplay.textContent = 0
  accuDisplay.textContent = null

  // clear center square's text
  squares[4].textContent = null

  // reset timer
  clearInterval(countDownTimerId)
  currentTime = TIME_LENGTH

  // reset mole movement
  clearTimeout(moveMoleTimerId)
  
  // restart timer
  countDownTimerId = setInterval(countDown, 1000)
  timeLeft.textContent = currentTime

  // assign hits/misses click event for each square in grid
  squares.forEach(square => {
    square.addEventListener('mousedown', onHitOrMiss)
  })

  moveMole()
}

function onHitOrMiss(e) {
  if (this.id == hitPosition) {
    hits++
    hitsDisplay.textContent = hits
    hitMarker(e)
  } else {
    misses++
    missesDisplay.textContent = misses
    missMarker(e)
  }
  accuDisplay.textContent = hits / (hits + misses) * 100
}

function hitMarker(e) {
  let marker = document.createElement('span')
  marker.style.top = `${e.pageY}px`
  marker.style.left = `${e.pageX}px`
  document.querySelector('.mole').appendChild(marker)

  setTimeout(() => {
    marker.remove()
  }, 1000);
}

function missMarker(e) {
  let miss = document.createElement('span')
  miss.style.top = `${e.pageY}px`
  miss.style.left = `${e.pageX}px`
  document.querySelector('.grid').appendChild(miss)

  setTimeout(() => {
    miss.remove()
  }, 500);
}

// round timer and removal of click events
function countDown() {
  currentTime--
  timeLeft.textContent = currentTime
  if (currentTime == 0) {
    clearInterval(countDownTimerId)
    clearTimeout(moveMoleTimerId)

    squares.forEach(square => {
      square.removeEventListener('mousedown', onHitOrMiss)
      square.classList.remove('mole')
    })
    squares[4].textContent = "TIME!"
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

// TODO: cursor replacement
// TODO: score tracker
// TODO: have user select speed for mole to move
