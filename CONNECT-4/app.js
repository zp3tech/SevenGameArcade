document.addEventListener('DOMContentLoaded', () => {
    const boardWidth = 7
    const boardHeight = 6
    const winsDisplay = document.querySelector('#wins-display')
    const newGameDiv = document.querySelector('#new-game')
    const redWins = document.querySelector('#red-wins')
    const blackWins = document.querySelector('#black-wins')

    // create grid div
    const masterGrid = document.createElement('div')
    masterGrid.classList.add('master-grid')
    document.body.insertBefore(masterGrid, winsDisplay)
    
    // creates divs within grid
    for (let i = 0; i < (boardWidth * boardHeight); i++) {
        const newDiv = document.createElement('div')
        newDiv.classList.add('col-' + (i % boardWidth))
        masterGrid.appendChild(newDiv)
    }
    
    const squares = document.querySelectorAll('.master-grid div')

    let startingPlayer = 1
    let currentPlayer = startingPlayer
    
    let pOneWins = 0
    let pTwoWins = 0

    let counter

    // Only needs to check "down" the column
    function checkVertical(index, playerString) {
        if (index + boardWidth > (boardWidth * boardHeight - 1)) {   // in bottom row
            return counter
        } else if (squares[index + boardWidth].classList.contains(playerString)) {
            counter++
            checkVertical(index + boardWidth, playerString)
        } else {
            return counter
        }
    }

    function checkHorizontal(index, playerString) {
        let numPositionsToLeft = index % boardWidth
        let numPositionsToRight = boardWidth - numPositionsToLeft - 1

        // check to left
        for (let i = 1; i <= numPositionsToLeft; i++) {
            if (squares[index - i].classList.contains(playerString)) counter++
            else break
        }

        // check to right
        for (let j = 1; j <= numPositionsToRight; j++) {
            if (squares[index + j].classList.contains(playerString)) counter++
            else break
        }
    }

    function checkDiagonal(index, playerString) {
        let numPositionsToLeft = index % boardWidth
        let numPositionsToRight = boardWidth - numPositionsToLeft - 1

        // check up+left & down+right
        for (let i = 1; i <= numPositionsToLeft; i++) {     // loop stops iterating at left col
            let upLeftIndexCheck = index - i - boardWidth * i
            // if in top row, break
            if (upLeftIndexCheck < 0) break
            if (squares[upLeftIndexCheck].classList.contains(playerString)) counter++
            else break
        }
        for (let j = 1; j <= numPositionsToRight; j++) {    // loop stops iterating at right col
            let downRightIndexCheck = index + j + boardWidth * j
            // if in bottom row, break
            if (downRightIndexCheck > (boardWidth * boardHeight - 1)) break
            if (squares[downRightIndexCheck].classList.contains(playerString)) counter++
            else break
        }

        // if player won, return; else reset counter to 1 to check other diagonal direction
        if (counter >= 4) return
        else counter = 1 

        // check down+left & up+right
        for (let k = 1; k <= numPositionsToLeft; k++) {     // loop stops iterating at left col
            let downLeftIndexCheck = index - k + boardWidth * k
            // if in bottom row, break
            if (downLeftIndexCheck > (boardWidth * boardHeight - 1)) break
            if (squares[downLeftIndexCheck].classList.contains(playerString)) counter++
            else break
        }
        for (let l = 1; l <= numPositionsToRight; l++) {     // loop stops iterating at right col
            let upRightIndexCheck = index + l - boardWidth * l
            // if in top row, break
            if (upRightIndexCheck < 0) break
            if (squares[upRightIndexCheck].classList.contains(playerString)) counter++
            else break
        }
    }

    // runs all directions to check for win
    function checkBoard(index, pNum) {
        let playerString = ''
        if (pNum == 1) {
            playerString = 'player-one'
        } else if (pNum == 2) {
            playerString = 'player-two'
        }

        counter = 1
        checkVertical(index, playerString)
        displayTheWinner(pNum)

        // checks for left/right wins
        counter = 1
        checkHorizontal(index, playerString)
        displayTheWinner(pNum)

        // checks for diagonal wins
        counter = 1
        checkDiagonal(index, playerString)
        displayTheWinner(pNum)

    }

    function displayTheWinner(pNum) {
        if (counter === 4) {
            if (pNum === 1) {
                pOneWins++
                color = ' (red)'
            } else if (pNum === 2) {
                pTwoWins++
                color = ' (black)'
            }

            // update wins displays
            document.querySelector('#turn-display').innerHTML = 'Player ' + pNum + color + ' wins!'
            redWins.innerHTML = pOneWins
            blackWins.innerHTML = pTwoWins            

            // add button to reset game
            restartButton = document.createElement('button')
            restartButton.setAttribute('id', 'restart-btn')
            restartButton.textContent = 'New Game?'
            restartButton.onclick = resetBoard
            newGameDiv.appendChild(restartButton)
            
            // remove onclick events to "stop" gameplay
            squares.forEach(square => {
                square.onclick = null
            })
        }
    }

    function resetBoard() {
        newGameDiv.innerHTML = null  // removes restartButton
        squares.forEach(square => {
            square.classList.remove('player-one')
            square.classList.remove('player-two')
        })
        
        // switch starting player
        if (startingPlayer === 1) startingPlayer = 2
        else if (startingPlayer === 2) startingPlayer = 1
        gameSetup()
    }

    // run initial game setup on DOMContentLoaded
    gameSetup()
    
    // contains listeners for col highlight and assignments of onclick logic for each square
    function gameSetup() {
        // updates displays to show startingPlayer has first move
        document.querySelector('#turn-display').innerHTML = 'Your turn: Player <span id="current-player"></span>'
        const currentPlayerDisplay = document.querySelector('#current-player')
        currentPlayer = startingPlayer
        if (currentPlayer === 1) {
            currentPlayerDisplay.innerHTML = currentPlayer + ' (red)'
            document.querySelector('#starting-player').textContent = 'Red'
        } else if (currentPlayer === 2) {
            currentPlayerDisplay.innerHTML = currentPlayer + ' (black)'
            document.querySelector('#starting-player').textContent = 'Black'
        }

        for (let i = 0; i < squares.length; i++) {
            // adds or removes highlight on col the mouse pointer is over
            squares[i].addEventListener('mouseover', () => {
                colNum = squares[i].classList[0]
                sqInCol = document.querySelectorAll('.' + colNum)
                sqInCol.forEach(box => {
                    if (box.classList.contains('player-one')) return
                    if (box.classList.contains('player-two')) return
                    box.classList.add('highlighted-col')
                });
            })
            squares[i].addEventListener('mouseout', () => {
                sqInCol.forEach(box => {
                    box.classList.remove('highlighted-col')
                })
            })
    
            squares[i].onclick = () => {
                colNum = squares[i].classList[0]
                sqInCol = document.querySelectorAll('.' + colNum)
                prevPlayer = currentPlayer
    
                for (let j = (boardHeight - 1); j >= 0; j--) {
                    if (sqInCol[j].classList.contains('player-one')) continue
                    if (sqInCol[j].classList.contains('player-two')) continue
    
                    switch (currentPlayer) {
                        case 1:
                            sqInCol[j].classList.add('player-one')
                            sqInCol[j].classList.add('token')
                            sqInCol[j].classList.remove('highlighted-col')
                            currentPlayer = 2
                            currentPlayerDisplay.innerHTML = currentPlayer + ' (black)'
                            break
                        case 2:
                            sqInCol[j].classList.add('player-two')
                            sqInCol[j].classList.add('token')
                            sqInCol[j].classList.remove('highlighted-col')
                            currentPlayer = 1
                            currentPlayerDisplay.innerHTML = currentPlayer + ' (red)'
                            break
                    }

                    // if column full, disable onclick for that column
                    if (sqInCol[0].classList.contains('player-one') || sqInCol[0].classList.contains('player-two')) {
                        sqInCol.forEach(square => {
                            square.onclick = null
                        });
                    }

                    break
                }
    
                // gets index of token just placed
                for (let k = 0; k < squares.length; k++) {
                    if (squares[k].classList.contains('token')) {
                        index = k
                        squares[k].classList.remove('token')
                    }
                }
                checkBoard(index, prevPlayer)
            }
        }
    }
})


