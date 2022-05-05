document.addEventListener('DOMContentLoaded', () => {
    const boardWidth = 7
    const boardHeight = 6

    // create grid div
    const masterGrid = document.createElement('div')
    masterGrid.classList.add('master-grid')
    document.body.appendChild(masterGrid)

    // creates divs within grid
    for (let i = 0; i < (boardWidth * boardHeight); i++) {
        const newDiv = document.createElement('div')
        newDiv.classList.add('col-' + (i % boardWidth))
        masterGrid.appendChild(newDiv)
    }

    const squares = document.querySelectorAll('.master-grid div')
    const displayWinner = document.querySelector('#winner')
    const displayCurrentPlayer = document.querySelector('#current-player')

    let currentPlayer = 1
    let prevPlayer = 1

    displayCurrentPlayer.innerHTML = currentPlayer + ' (red)'

    let counter

    // checks for vertical wins
    function checkVertical(index, playerString) {
        if (index + boardWidth > (boardWidth*boardHeight -1)) {   // in bottom row
            return counter
        } else if (squares[index + boardWidth].classList.contains(playerString)) {
            counter++
            checkVertical(index + boardWidth, playerString)
        } else {
            return counter
        }
    }

    // checks horizontal wins
    function checkHorizontal(index, playerString) {
        // start checking for wins on far left column
        index -= index % boardWidth
        for (let i = 0; i < boardWidth; i++) {
            
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
        checkWin(pNum)

        // checks for left/right wins
        counter = 1
        checkHorizontal(index, playerString)
        checkWin(pNum)
        
        // checks for diagonal wins
        // counter = 1 
        // checkDiagonal(index, playerString)
        // checkWin(pNum)

    }

    function checkWin(pNum) {
        if (counter == 4) {
            color = ' (red)'
            if (pNum == 2) color = ' (black)'
            displayWinner.textContent = 'Player ' + pNum + color
            // TODO: end/stop the game
        }
    }

    for (let i = 0; i < squares.length; i++) {

        // highlights col mouse pointer is over
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
                        displayCurrentPlayer.innerHTML = currentPlayer + ' (black)'
                        break
                    case 2:
                        sqInCol[j].classList.add('player-two')
                        sqInCol[j].classList.add('token')
                        sqInCol[j].classList.remove('highlighted-col')
                        currentPlayer = 1
                        displayCurrentPlayer.innerHTML = currentPlayer + ' (red)'
                        break
                }
                break
            }

            // gets index of token just placed
            for (let k =0; k < squares.length; k++) {
                if (squares[k].classList.contains('token')) {
                    index = k
                    squares[k].classList.remove('token')
                }
            }
            checkBoard(index, prevPlayer)
        }
    }
})


