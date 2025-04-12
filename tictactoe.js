document.addEventListener('DOMContentLoaded', () => {
    const gameStatus = document.getElementById('gameStatus');
    const squares = document.querySelectorAll('.square');
    const resetGameBtn = document.getElementById('resetGameBtn');

    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    function handleSquareClick(e) {
        const square = e.target;
        const index = square.dataset.index;

        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        square.textContent = currentPlayer;
        square.classList.add(currentPlayer.toLowerCase());

        if (checkWin()) {
            gameStatus.textContent = `Winner: ${currentPlayer}`;
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            gameStatus.textContent = 'Game Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Next Player: ${currentPlayer}`;
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === currentPlayer;
            });
        });
    }

    function checkDraw() {
        return board.every(square => square !== null);
    }

    function resetGame() {
        board = Array(9).fill(null);
        currentPlayer = 'X';
        gameActive = true;
        gameStatus.textContent = 'Next Player: X';
        
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('x', 'o');
        });
    }

    squares.forEach(square => {
        square.addEventListener('click', handleSquareClick);
    });

    resetGameBtn.addEventListener('click', resetGame);
    
    // Initialize game status
    gameStatus.textContent = 'Next Player: X';
});
