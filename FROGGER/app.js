const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

const width = 9
const height = 9

let currentIndex = 76 // starting block div index


function moveFrog(e) {
  squares[currentIndex].classList.remove('frog')
  e.prevent
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

// if 'keyup' happens, then do moveFrog function
document.addEventListener('keydown', moveFrog)


// init car image divs
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

carsInit()

// yellow car has class c1
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

// black car has class c1
function moveCarRight(carRight) {
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

// yellow car
const leftAnimationTime = 2000
setInterval(moveCarLeft, leftAnimationTime) 

// black car
const rightAnimationTime = 500
setInterval(moveCarRight, rightAnimationTime)  


// LOG MOVEMENTS
function moveLogLeft(logLeft) {
  logsLeft.forEach(logLeft => {
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

function moveLogRight(logRight) {
  logsRight.forEach(logRight => {
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

// timer for moving logs
setInterval(moveLogLeft, 420)
setInterval(moveLogRight, 690)



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

