var infected = []
var currentTurn = 1
var turnsTaken = []

const buildHouses = () => {
  let container = document.getElementById('container')

  for (i = 0; i < 100; i++) {
    container.innerHTML += '<div class="house" id=' + (i + 1) + '></div>'
  }
}

const resetSimulation = () => {
  let ul = document.getElementById('rank')
  let average = document.getElementById('average')
  while (ul.firstChild) ul.removeChild(ul.firstChild)
  average.parentNode.removeChild(average)
  turnsTaken = []
}

buildHouses()

const invade = () => {
  console.log(turnsTaken.length)
  if (turnsTaken.length < 10) {
    infected = [generateRandom()]
    let rounds = 0
    var intervalId = setInterval(function () {
      if (infected.length === 100) {
        turnsTaken.push(rounds)
        resetInvasion()
        clearInterval(intervalId)
      }
      infected.forEach((element) => {
        item = generateRandom()
        var myDivObj = document.getElementById(item)
        myDivObj.classList.add('infected')
        infected.indexOf(item) === -1 && infected.push(item)
      })
      rounds++
    }, 50)
  } else {
    resetSimulation()
    invade()
  }
}

const generateRandom = () => {
  return Math.floor(Math.random() * 100) + 1
}

const resetInvasion = () => {
  infected = []
  let clear = document.getElementsByClassName('house')

  while (clear.length > 0) clear[0].parentNode.removeChild(clear[0])

  buildHouses()
  if (currentTurn < 10) {
    currentTurn++
    addTurnToList()

    invade()
  } else {
    currentTurn++
    addTurnToList()
    addAvarage(turnsTaken)

    currentTurn = 1
  }
}

const addTurnToList = () => {
  let li = document.createElement('li')
  let ol = document.getElementById('rank')
  li.appendChild(document.createTextNode(turnsTaken[currentTurn - 2]))
  ol.appendChild(li)
}

const addAvarage = (numbers) => {
  let average = numbers.reduce((a, b) => a + b) / numbers.length
  let container = document.getElementById('smaller')
  container.innerHTML += '<p id=average>' + 'average: ' + average + '</p>'
}
