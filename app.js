const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15

let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
  }

const squares = Array.from(document.querySelectorAll('.grid div'))


const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw(){
    for(let i = 0; i<alienInvaders.length;i++){
        if(!aliensRemoved.includes(i)){
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

squares[currentShooterIndex].classList.add('shooter')



function moveShooter(e){
      squares[currentShooterIndex].classList.remove('shooter')
     switch(e.key){ 
      case 'ArrowLeft':
          if(currentShooterIndex % width !== 0) currentShooterIndex -= 1
       // index 195 to 209 in current shooter index row
       // if(195 % 15 => (0) == 0) so left side wouldn't move .. 
       // in b/w (196-209 % 15 !== 0) so left side the current shooter index will move..
          break
      case 'ArrowRight':
          if(currentShooterIndex % width < width - 1) currentShooterIndex += 1
       // if(209 % 15 => (14) < 15 - 1) so right side wouldn't move .. 
       // in b/w (195-208 % 15 < 15 - 1) so left side the current shooter index will move..
          break   
      }
      squares[currentShooterIndex].classList.add('shooter')
}
  
document.addEventListener('keydown', moveShooter)
console.log(alienInvaders.length);
alienInvaders[0]

function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0
//console.log(alienInvaders[0]);
//alirnInvaders[0] = 0,15,30,45...210 % 15 === 0, 
//alirnInvaders[0] = 1-5,20-16,31-35,50-46...211-215 % !=== 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
//console.log(alienInvaders[29]);
//alirnInvaders[29] = 44,59,74,89...194 % 15 === 14,
//alirnInvaders[29] = 39-43,54-58,69-73,84-88...189-193 % !=== 0 
    remove()
    //console.log(alienInvaders[0]);
    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += width + 1
         //console.log(alienInvaders[0]);
          direction = -1
          goingRight = false
        }
      }

  /*if both invaders goingRight and rightEdge true,loop starts in alien invaders, 
  alienInvaders[0] will be at 5th square index.so alienInvaders[0] + = width+1 => 
  will be 5+= 15+1 => 21 and placed to 20th square index in next line . 
  starts moving left side because direction -1*/

      if(leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += width - 1
          console.log(alienInvaders[0]);
          direction = 1
          goingRight = true
        }
      }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
      }
    
      draw()

      if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(invadersId)
      }
    
      for (let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i] > (squares.length)) {
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

console.log(alienInvaders[0]);
console.log(alienInvaders[alienInvaders.length - 1]);

function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
    
    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser')
      currentLaserIndex -= width
      squares[currentLaserIndex].classList.add('laser')
  
      if (squares[currentLaserIndex].classList.contains('invader')) {
        squares[currentLaserIndex].classList.remove('laser')
        squares[currentLaserIndex].classList.remove('invader')
        squares[currentLaserIndex].classList.add('boom')
  
        setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
        clearInterval(laserId)

        const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
        aliensRemoved.push(alienRemoved)
        results++
        resultsDisplay.innerHTML = results
        console.log(alienRemoved)
  
  
      }
    }  

    switch(e.key) {
        case 'ArrowUp':
          laserId = setInterval(moveLaser, 100)
      }
    }
    
    document.addEventListener('keydown', shoot)