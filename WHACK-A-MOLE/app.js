const TIME_LENGTH = 10

const squares = document.querySelectorAll('.square')
const timeLeft = document.querySelector('#time-left')
const hitsDisplay = document.querySelector('#hits')
const missesDisplay = document.querySelector('#misses')
const accuDisplay = document.querySelector('#accuracy')
const restartButton = document.querySelector('#restart-btn')
const speedForm = document.getElementById('speed-selector')
const scoreboard = document.querySelector('.scoreboard')

restartButton.addEventListener('click', startRestart)
timeLeft.textContent = TIME_LENGTH

let currentTime = TIME_LENGTH
let hits = 0
let misses = 0
let hitPosition
let moveMoleTimerId = null
let countDownTimerId = null
let moleSpeed = 1000

// scoreboard updater
function sbUpdate() {
  var newScore = document.createElement("div")
  newScore.textContent = hits + " hits (" + (hits / (hits + misses) * 100).toFixed(2) + "%)"

  if (scoreboard.childElementCount == 0) {
    newScore.id = "high-score"
    // scoreboard.appendChild(newScore)
    // return
  } else {
    // get current high-score number of hits
    var currHighScore = document.getElementById("high-score").textContent
    hitsHS = currHighScore.substring(0, currHighScore.indexOf(" "))
    accuHS = currHighScore.substring(currHighScore.indexOf("(") + 1, currHighScore.indexOf("%"))

    // check if new high-score
    if (hits > hitsHS || (hits == hitsHS && (hits / (hits + misses) * 100).toFixed(2) > accuHS)) {
      document.getElementById("high-score").id = null
      newScore.id = "high-score"
    }
  }
  scoreboard.insertBefore(newScore, scoreboard.children[0])
}

// user selects radio button to change speed of mole movements
function setSpeed(inputValue) {
  moleSpeed = inputValue
}

function startRestart() {
  // disables speed selections
  for (let i = 0; i < speedForm.elements.length; i++) {
    speedForm.elements[i].disabled = true
  }

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
  document.querySelector('.grid').appendChild(marker)

  setTimeout(() => {
    marker.remove()
  }, 1000);
}

function missMarker(e) {
  let miss = document.createElement('span')
  miss.className = 'missed'
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

  // at end of round
  if (currentTime == 0) {
    clearInterval(countDownTimerId)
    clearTimeout(moveMoleTimerId)

    // stop click listeners on squares
    squares.forEach(square => {
      square.removeEventListener('mousedown', onHitOrMiss)
      square.classList.remove('mole')
    })
    squares[4].textContent = "TIME!"

    // re-enables speed selector
    for (let i = 0; i < speedForm.elements.length; i++) {
      speedForm.elements[i].disabled = false
    }

    // update scoreboard
    sbUpdate()
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

  //set random delay to stutter mole movement by up to 500ms
  let delay = Math.floor(Math.random() * 500)
  moveMoleTimerId = setTimeout(moveMole, (delay + moleSpeed))
}
