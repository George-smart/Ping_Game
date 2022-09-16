/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
const inputScore = document.querySelector('.input-score');
// const timer = document.querySelector('.timer');
const wrapper = document.querySelector('.wrapper');
const startGameButton = document.querySelector('.start_game');
const startBtn = document.querySelector('.start_game_btn');



let scores, roundScore, activePlayer, gamePlaying, lastDice, counter;
document.querySelector('.btn-roll').addEventListener('click', loadDice);
document.querySelector('.btn-hold').addEventListener('click', addGlobalScore)
document.querySelector('.btn-new').addEventListener('click', restartGame)
document.querySelector('.exit-game').addEventListener('click', exitGame)
startBtn.addEventListener('click', startGame)


function init(){
    scores = [0, 0]
    roundScore = 0;
    activePlayer = 0    
    gamePlaying = true
    document.getElementById('score-0').innerText = 0
    document.getElementById('score-1').innerText = 0
    document.getElementById('current-0').innerText = 0
    document.getElementById('current-1').innerText = 0
    document.getElementById('dice-0').style.display = 'none'
    document.getElementById('dice-1').style.display = 'none'

}


function startGame(){

    wrapper.classList.remove('hide')
    startGameButton.classList.add('hide')

    // timer
    timer()

}

function timer(){
    let count = 60
    
    counter = setInterval( ()=>{
        count--
        document.querySelector('.time-text').textContent = `${count} seconds remaining`
        if(count <= 0){
            exitGame()
        }
        
    }, 1000)
    
}

function exitGame(){
    clearInterval(counter)
    wrapper.classList.add('hide')
    startGameButton.classList.remove('hide')   
}

function loadDice(){
    if(gamePlaying){
        // Generate Random number
        document.getElementById('dice-0').style.display = 'block'
        document.getElementById('dice-1').style.display = 'block'
        const diceRandom = Math.floor(Math.random() * 6) + 1    
        const diceRandom2 = Math.floor(Math.random() * 6) + 1

        const dice1 = document.getElementById('dice-0')
        const dice2 = document.getElementById('dice-1')
        dice1.src = `dice-${diceRandom}.png`
        dice2.src = `dice-${diceRandom2}.png`
          
        if(diceRandom !== 1 && diceRandom2 !== 1){
            roundScore += diceRandom + diceRandom2
            document.getElementById(`current-${activePlayer}`).innerText = roundScore;
        } else {
            initialActive()
            nextPlayer()
        }
    }
    

}

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    document.getElementById('dice-0').style.display = 'none'
    document.getElementById('dice-1').style.display = 'none'
    document.querySelector(`.player-0-panel`).classList.toggle('active')
    document.querySelector(`.player-1-panel`).classList.toggle('active')
}

function addGlobalScore(){
    if(gamePlaying){
        scores[activePlayer] += roundScore
        document.getElementById(`score-${activePlayer}`).innerText = scores[activePlayer]
        const value = inputScore.value;
        // Determine winner
        let winningScore;
        if(value){
            winningScore = value
        } else {
            winningScore = 100
        }

        if(scores[activePlayer] >= winningScore){
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner'
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner')
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active')
            gamePlaying = false
            clearInterval(counter)
        } else {
            initialActive()
            nextPlayer()
        }
    }
    

}

function restartGame(){
    init();

    clearInterval(counter)
    timer()
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector(`.player-0-panel`).classList.remove('active')
    document.querySelector(`.player-1-panel`).classList.remove('active')
    document.querySelector(`.player-0-panel`).classList.add('active')

}

function initialActive(){
    roundScore = 0
    document.getElementById(`current-${activePlayer}`).innerText = roundScore
}



init()








//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice + '</em>'