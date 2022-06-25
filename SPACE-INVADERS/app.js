const grid = document.querySelector('.grid')
const resultsDisplay = document.body.insertBefore(document.createElement('h3'), grid)
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []

// fills grid div with squares
for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

squares[currentShooterIndex].classList.add('shooter')
function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')

  switch (e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
      break
    case 'ArrowRight':
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
      break
  }
  squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader')
    }
  }
}
draw()

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader')
  }
}

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
  remove()
  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1
      direction = -1
      goingRight = false
    }
  }
  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }
  draw()

  // checks if aliens hit shooter or make it past shooter
  for (let i = currentShooterIndex; i < squares.length; i++) {
    if (squares[i].classList.contains('invader')) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
    }
  }

  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = 'YOU WIN'
    clearInterval(invadersId)
  }

}
invadersId = setInterval(moveInvaders, 500)

function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex
  switch (e.key) {
    case ' ':
      laserId = setInterval(moveLaser, 100)
  }

  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')

    if (currentLaserIndex > width) {
      currentLaserIndex -= width
      squares[currentLaserIndex].classList.add('laser')
    }

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 1000)
      clearInterval(laserId)

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
      aliensRemoved.push(alienRemoved)

    }
  }


}

document.addEventListener('keydown', shoot)