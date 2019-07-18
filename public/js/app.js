console.log('Client side js file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })

// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => { // e stands for event
    e.preventDefault()
    const location = 'http://localhost:3000/weather?address=' + search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
            messageOne.textContent = 'Oops... Something went wrong'
            messageTwo.textContent = ''
        } else {
            console.log(data)
            messageOne.textContent = data.place
            messageTwo.textContent = data.forecastData
        }
    })
})
})