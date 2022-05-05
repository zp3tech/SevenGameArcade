document.addEventListener('DOMContentLoaded', () => {
    const boardWidth = 7
    const boardHeight = 6
    
    // create grid div
    const masterGrid = document.createElement('div')
    masterGrid.classList.add('master-grid')
    document.body.appendChild(masterGrid)

    // creates divs within grid
    for (let i = 0; i < (boardWidth*boardHeight); i++) {
        const newDiv = document.createElement('div')
        masterGrid.appendChild(newDiv)
    }

    const squares = document.querySelectorAll('.master-grid div')
    const result = document.querySelector('#result')
    const displayCurrentPlayer = document.querySelector('#current-player')
    
    

    let currentPlayer = 1

    displayCurrentPlayer.innerHTML = currentPlayer

    // create column classes in grid
    for (let i =0; i <squares.length; i++) {
        let colNum = i % 7
        squares[i].classList.add('col-' + colNum)
    }

    // TODO: check for wins
    function checkBoard() {
        var playersTokens = document.querySelectorAll('.taken')



    }

    for (let i = 0; i < squares.length; i++) {
        squares[i].onclick = () => {
            // go to lowest square in column
            if (squares[i + 7].classList.contains('taken')) {
                if (currentPlayer == 1) {
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-one')
                    currentPlayer = 2
                    displayCurrentPlayer.innerHTML = currentPlayer
                } else if (currentPlayer == 2) {
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-two')
                    currentPlayer = 1
                    displayCurrentPlayer.innerHTML = currentPlayer
                }
            } else alert('cannot play here')
        
            checkBoard()    // check for win
        }
    }


})


