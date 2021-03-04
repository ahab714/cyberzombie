var infected = []
var currentTurn = 1
var turnsTaken = []

const buildHouses = () => {
  container = document.getElementById('container')

  for (i = 0; i < 100; i++) {
    container.innerHTML += '<div class="house" id=' + (i + 1) + '></div>'
  }
}

buildHouses()

const invade = () => {
  infected = [generateRandom()]
  rounds = 0
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
  }, 100)
}

const generateRandom = () => {
  return Math.floor(Math.random() * 100) + 1
}

const resetInvasion = () => {
  infected = []
  let clear = document.getElementsByClassName('house')

  while (clear.length > 0) {
    clear[0].parentNode.removeChild(clear[0])
  }

  const calculateAvarage = (numbers) => {
    return numbers.reduce((a, b) => a + b) / numbers.length
  }

  buildHouses()
  if (currentTurn < 10) {
    currentTurn++
    document.getElementById('output').innerHTML = 'total turns: ' + turnsTaken
    invade()
  } else {
    document.getElementById('output').innerHTML =
      'total turns: ' + turnsTaken + ' average: ' + calculateAvarage(turnsTaken)
    currentTurn = 1
  }
}
