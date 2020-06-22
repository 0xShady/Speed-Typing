const API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('text')
const quoteInputElement = document.getElementById('textInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let state = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
    //   characterSpan.classList.remove('correct')
    //   characterSpan.classList.remove('incorrect')
      state = false
    } else if (character === characterSpan.innerText) {
    //   characterSpan.classList.add('correct')
    //   characterSpan.classList.remove('incorrect')
    } else {
    //   characterSpan.classList.remove('correct')
    //   characterSpan.classList.add('incorrect')
      state = false
    }
  })

  if (state) NextQuote()
})

function getQuote() {
  return fetch(API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function NextQuote() {
  const quote = await getQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
  startTimer()
}

let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

NextQuote()