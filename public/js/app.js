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
    const location = '/weather?address=' + search.value
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
            messageTwo.textContent = data.forecastData.summary
            var sm = new Date(data.forecastData.data[0].x * 1000)
            console.log(sm.toString())
            console.log(data.forecastData.data)
            var ctx = document.getElementById('myChart');
            const labels = data.forecastData.data.map((t) => t.label)
            console.log(labels)
            var myLineChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [{
                        backgroundColor: 'rgba(232, 213, 213, 0.5)',
                        data: data.forecastData.data,
                        label: 'Temperature by hours'
                    }]
                },
                options: {}
            });
        }
    })
})
})