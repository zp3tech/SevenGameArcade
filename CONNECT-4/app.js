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

    displayCurrentPlayer.innerHTML = currentPlayer

    // Check for wins
    function checkBoard() {
        var playerOnesTokens = document.querySelectorAll('.player-one')
        var playerTwosTokens = document.querySelectorAll('.player-two')

        // check if p1 won
        for (let i = 0; i < playerOnesTokens.length; i++) {
            
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

            for (let j = (boardHeight - 1); j >= 0; j--) {
                if (sqInCol[j].classList.contains('player-one')) continue
                if (sqInCol[j].classList.contains('player-two')) continue

                switch (currentPlayer) {
                    case 1:
                        sqInCol[j].classList.add('player-one')
                        sqInCol[j].classList.remove('highlighted-col')
                        currentPlayer = 2
                        displayCurrentPlayer.innerHTML = currentPlayer
                        break
                    case 2:
                        sqInCol[j].classList.add('player-two')
                        sqInCol[j].classList.remove('highlighted-col')
                        currentPlayer = 1
                        displayCurrentPlayer.innerHTML = currentPlayer
                        break
                }
                break
            }
            checkBoard()
        }
    }
})


