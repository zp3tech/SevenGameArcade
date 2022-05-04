const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

// grid dimensions
const width = 9
const height = 9

// yellow car goes left, black car goes right
const leftAnimationTime = 2000
const rightAnimationTime = 500

// Location of Frog (76 is starting block div index)
const startBlock = 17
let currentIndex = startBlock

// set time length for game
const timeLength = 69
let currentTime = timeLength
timeLeftDisplay.textContent = currentTime

startPauseButton.addEventListener('click', () => {
  if (startPauseButton.textContent == "New Game!" || startPauseButton.textContent === "Resume") {
    startGame()
    startPauseButton.textContent = "Pause"
  } else if (startPauseButton.textContent === "Pause") {
    stopGame()
    startPauseButton.textContent = "Resume"
  } else {
    // resets initial game conditions 
    currentTime = timeLength
    timeLeftDisplay.textContent = currentTime
    currentIndex = startBlock
    squares[currentIndex].classList.add('frog')
    startGame()
    startPauseButton.textContent = "Pause"
  }
})


function startGame() {
  carsInit()
  squares[currentIndex].classList.add('frog')
  winOrLoseTimerId = setInterval(winOrLose, 50)
  document.addEventListener('keydown', moveFrog)
  gameTimerId = setInterval(timer, 1000)
  carLeftMover = setInterval(moveCarLeft, leftAnimationTime)
  carRightMover = setInterval(moveCarRight, rightAnimationTime)
  leftLogMover = setInterval(moveLogLeft, 420)
  rightLogMover = setInterval(moveLogRight, 690)
}

// stop listening to user input and stop car and log movers
function stopGame() {
  document.removeEventListener('keydown', moveFrog)
  clearInterval(winOrLoseTimerId)
  clearInterval(carLeftMover)
  clearInterval(carRightMover)
  clearInterval(leftLogMover)
  clearInterval(rightLogMover)
  clearInterval(gameTimerId)
}

function timer() {
  currentTime--
  timeLeftDisplay.textContent = currentTime
}

function winOrLose() {
  var currSquare = squares[currentIndex]

  // lose conditions
  if (
    currSquare.classList.contains('c1') ||
    currSquare.classList.contains('l4') ||
    currSquare.classList.contains('l5') ||
    currentTime === 0
  ) {
    currSquare.classList.remove('frog')
    var image = document.createElement('img')
    image.setAttribute('src', 'images/skull-nobg.png')
    image.className = 'dead'
    currSquare.appendChild(image)
    stopGame()
    startPauseButton.textContent = "You died!"
  }

  // win conditions
  if (currSquare.classList.contains('ending-block')) {
    startPauseButton.textContent = "You won!"
    currSquare.classList.remove('frog')
    stopGame()
  }
}

function moveFrog(e) {
  squares[currentIndex].classList.remove('frog')
  // console.log(e)
  // console.log(e.key)
  switch (e.key) {
    case 'ArrowLeft':
      // if frog in far left column break and don't move left
      if (currentIndex % width == 0) break
      currentIndex -= 1
      break
    case 'ArrowRight':
      // alternate method: only move right if not in far right column
      if (currentIndex % width !== (width - 1)) currentIndex += 1
      break
    case 'ArrowUp':
      // if frog is in top row, don't move up
      if (currentIndex < width) break
      currentIndex -= width
      break
    case 'ArrowDown':
      // if frog in bottom row, don't move down
      if (currentIndex >= (width * height - width)) break
      currentIndex += width
      break
  }

  squares[currentIndex].classList.add('frog')
}

// insert car image divs
function carsInit() {
  carsLeft.forEach(car => {
    var image = document.createElement('img')
    image.setAttribute('src', 'images/carNoBG-2.png')
    image.width = '20px'
    image.height = '20px'
    car.appendChild(image)
  })

  carsRight.forEach(car => {
    var image = document.createElement('img')
    image.setAttribute('src', 'images/carNoBg-1.png')
    image.width = '20px'
    image.height = '20px'
    car.appendChild(image)
  })
}

function moveCarLeft() {
  carsLeft.forEach(carLeft => {
    switch (true) {
      case carLeft.classList.contains('c1'):
        carLeft.classList.remove('c1')
        carLeft.classList.add('c2')
        break
      case carLeft.classList.contains('c2'):
        carLeft.classList.remove('c2')
        carLeft.classList.add('c3')
        break
      case carLeft.classList.contains('c3'):
        carLeft.classList.remove('c3')
        carLeft.classList.add('c1')
        break
    }
  })
}

function moveCarRight() {
  carsRight.forEach(carRight => {
    switch (true) {
      case carRight.classList.contains('c1'):
        carRight.classList.remove('c1')
        carRight.classList.add('c3')
        break
      case carRight.classList.contains('c2'):
        carRight.classList.remove('c2')
        carRight.classList.add('c1')
        break
      case carRight.classList.contains('c3'):
        carRight.classList.remove('c3')
        carRight.classList.add('c2')
        break
    }
  })
}

function moveLogLeft() {
  logsLeft.forEach(logLeft => {

    if (logLeft.classList.contains('frog')) {
      if (currentIndex % width !== 0) {
        logLeft.classList.remove('frog')
        currentIndex--
        squares[currentIndex].classList.add('frog')
      }
    }

    switch (true) {
      case logLeft.classList.contains('l1'):
        logLeft.classList.remove('l1')
        logLeft.classList.add('l2')
        break
      case logLeft.classList.contains('l2'):
        logLeft.classList.remove('l2')
        logLeft.classList.add('l3')
        break
      case logLeft.classList.contains('l3'):
        logLeft.classList.remove('l3')
        logLeft.classList.add('l4')
        break
      case logLeft.classList.contains('l4'):
        logLeft.classList.remove('l4')
        logLeft.classList.add('l5')
        break
      case logLeft.classList.contains('l5'):
        logLeft.classList.remove('l5')
        logLeft.classList.add('l1')
        break
    }
  })
}

function moveLogRight() {

  // since forEach loops "to the right" thru grid, need bool value for if frog already moved
  let frogHasBeenMoved = false

  logsRight.forEach(logRight => {

    if (logRight.classList.contains('frog') && currentIndex % width !== (width - 1) && !frogHasBeenMoved) {
      frogHasBeenMoved = true
      logRight.classList.remove('frog')
      currentIndex++
      squares[currentIndex].classList.add('frog')
    }

    switch (true) {
      case logRight.classList.contains('l1'):
        logRight.classList.remove('l1')
        logRight.classList.add('l5')
        break
      case logRight.classList.contains('l2'):
        logRight.classList.remove('l2')
        logRight.classList.add('l1')
        break
      case logRight.classList.contains('l3'):
        logRight.classList.remove('l3')
        logRight.classList.add('l2')
        break
      case logRight.classList.contains('l4'):
        logRight.classList.remove('l4')
        logRight.classList.add('l3')
        break
      case logRight.classList.contains('l5'):
        logRight.classList.remove('l5')
        logRight.classList.add('l4')
        break
    }
  })
}



// Disables default "scrolling" behavior for arrow keys.
window.addEventListener('keydown', (e) => {
  if (e.target.localName != 'input') {   // if you need to filter <input> elements
    switch (e.keyCode) {
      case 37: // left
      case 39: // right
        e.preventDefault();
        break;
      case 38: // up
      case 40: // down
        e.preventDefault();
        break;
      default:
        break;
    }
  }
}, {
  capture: true,   // this disables arrow key scrolling in modern Chrome
  passive: false   // this is optional, my code works without it
});

